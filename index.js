const express = require("express");
const app = express();
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:7070" }); // heroku link if online
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const path = require("path");
const csurf = require("csurf");
const uidSafe = require("uid-safe");
const db = require("./__server-utilities/db");
const { compare, hash } = require("./__server-utilities/bc");
// const s3 = require("./__server-utilities/s3"); // for uploading images on S3
// const multer = require("multer");
// const cryptoRandomString = require("crypto-random-string");
// const ses = require("./__server-utilities/ses"); // for sending an email to the assigned spiced address

app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());
app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken());
    next();
});
/*
 */
checkIfInProductionMode();
/*
 *
 *
 *
 *
 *
 *
 *
 * routing
 */
// ------------------------------------------------------- REGISTER - LOGIN - LOGOUT
app.post("/register", (req, res) => {
    const { first, last, email, password } = req.body;

    hash(password)
        .then((hashedPass) => {
            db.addUser(first, last, email, hashedPass)
                .then((result) => {
                    req.session.userId = result.rows[0].id;
                    req.session.firstname = first;
                    res.json({
                        success: true,
                    });
                })
                .catch((e) => {
                    console.log("error coder in hash(pass)", e.code);
                    if (e.code == "23505")
                        console.log("--> email already exists");
                    return res.json({
                        success: false,
                    });
                });
        })
        .catch((e) => {
            console.log(e);
        });
});
app.post("/login", (req, res) => {
    console.log("__/login:", req.body);
    console.log("/login route has been hit on the server");
    const { email, password } = req.body;

    db.getUser(email)
        .then((result) => {
            console.log(
                "--> result.rows in db.getUser in post /login",
                result.rows
            );

            if (result.rows[0]) {
                const { id, first, last, pass } = result.rows[0];

                compare(password, pass)
                    .then((result) => {
                        console.log("=======> compared passwords:", result);

                        if (result) {
                            req.session.userId = id;
                            req.session.firstname = first;
                            res.json({
                                success: true,
                            });
                        } else {
                            res.json({
                                success: false,
                                message: "passwords did not match",
                            });
                        }
                    })
                    .catch((e) => {
                        res.json({
                            success: false,
                            "error-code": e.code,
                        });
                    });
            } else {
                res.json({
                    success: false,
                    message:
                        "sth went wrong in result.rows from the db request",
                });
            }
        })
        .catch((e) => {
            console.log(e);
            res.json({
                success: false,
                "error-code": e.code,
            });
        });
});
app.get("/logout", (req, res) => {
    res.clearCookie("sid", "I have to write a secret here");
    req.session = null;
    res.redirect("/welcome");
});
// ------------------------------------------------------- WELCOME - checks if user is logged in
app.get("/welcome", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.get("*", function (req, res) {
    console.log("* > session.userId", req.session.userId);
    !req.session.userId
        ? res.redirect("/welcome")
        : res.sendFile(__dirname + "/index.html");
});
app.listen(7070, function () {
    console.log("> ✅  is listening");
});
/*
 *
 *
 *
 *
 *
 *
 *
 * helper functions
 */
function checkIfInProductionMode() {
    if (process.env.NODE_ENV != "production") {
        app.use(
            "/bundle.js",
            require("http-proxy-middleware")({
                target: "http://localhost:7071/",
            })
        );
    } else {
        // if we are in production we send this file which will be put together by
        app.use("/bundle.js", (req, res) =>
            res.sendFile(`${__dirname}/bundle.js`)
        );
    }
}
