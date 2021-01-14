const express = require("express");
const app = express();
const fs = require("fs");
const compression = require("compression");
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:7070" }); // heroku link if online
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
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
    secret:
        process.env.SESSION_SECRET ||
        require("./__server-utilities/secrets.json").sessionSecret,
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
// ------------------------------------------------------- ACTIVITIES
app.post("/api/add-activity", async (req, res) => {
    console.log(req.body, req.session.userId);

    const { activity, date, begin_time, end_time, notes } = req.body;
    let dreams = req.body.dreams != "" ? req.body.dreams : null;
    let quality = req.body.quality != "" ? req.body.quality : null;

    let begin_date = begin_time != "" ? `${date} ${begin_time}:00` : null;
    let end_date = end_time != "" ? `${date} ${end_time}:00` : null;

    try {
        const { rows } = await db.insertActivity(
            req.session.userId,
            activity,
            begin_date,
            end_date,
            dreams,
            quality,
            notes
        );
        // console.log("üüüüüüüü", rows);
        const date = rows[0].begin_date;

        // console.log("..........", date.getDay());
        // console.log("..........", date.getDate());

        if (req.body.interval == "currentWeek" && date.getDate() < 19) {
            return res.json({});
        } else if (req.body.interval == "lastWeek" && date.getDate() < 12) {
            return res.json({});
        } else {
            return res.json(rows[0]);
        }
    } catch (error) {
        console.log(error);
        res.json({});
    }
});

app.get("/api/activity-data", async (req, res) => {
    console.log("----req.query ", req.query);
    const { activity, begin, end, interval } = req.query;
    // when there is no match it returns an empty array []
    try {
        const { rows } = await db.getActivityData(
            activity,
            req.session.userId,
            begin,
            end,
            interval
        );
        // console.log(rows);
        fs.writeFileSync(
            __dirname + "/month.json",
            JSON.stringify(rows, null, 4)
        );
        res.json({ activityData: rows });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});
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
                        userName: first,
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
                                userName: first,
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
app.listen(process.env.PORT || 7070, function () {
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
