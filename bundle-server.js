const express = require("express");
const app = express();

app.use(require("./build.js"));

app.listen(7071);
