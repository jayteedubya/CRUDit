"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");
var https = require("https");
var fs = require("fs");
var postViewsRouter_1 = require("./routes/postViewsRouter");
var userViewsRouter_1 = require("./routes/userViewsRouter");
var submitViewsRouter_1 = require("./routes/submitViewsRouter");
var app = express();
var PORT = process.env.PORT || 4001;
var upload = multer({ dest: '/' });
app.set('view engine', 'ejs');
app.use(upload.none());
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', postViewsRouter_1["default"]);
app.use('/user', userViewsRouter_1["default"]);
app.use('/submit', submitViewsRouter_1["default"]);
var server = https.createServer({
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.cert')
}, app);
server.listen(PORT, function () { return console.log("listening on port: " + PORT); });
