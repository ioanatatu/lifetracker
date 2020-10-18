const aws = require("aws-sdk");
const fs = require("fs");

let secrets;

if (process.env.NODE_ENV == "producton") {
    secrets = process.env;
} else {
    secrets = require("../secrets.json");
    // console.log(secrets.AWS_KEY);
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    console.log("printing in multer", req.file);
    if (!req.file) {
        console.log("multer did not work");
        return res.sendStatus(500);
    }
    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read", // Access Control List
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then((result) => {
            // it worked!!!
            // once the file is at aws, you don't need it in the
            console.log("__multer result.rows", result.rows);
            next(); // WHY doesn the next line gets executed?
            fs.unlink(path, () => {}); // noop function = does not do anything
        })
        .catch((err) => {
            // uh oh
            console.log(err);
            res.sendStatus(500);
        });
};
