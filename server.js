"use strict";
exports.__esModule = true;
var express = require("express");
var apiCommentsRouter_1 = require("./routes/apiCommentsRouter");
var app = express();
var PORT = process.env.PORT || 4001;
app.use('/api/comments', apiCommentsRouter_1["default"]);
app.listen(PORT, function () { return console.log("listening on port: " + PORT); });
