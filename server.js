"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");
var session = require("express-session");
var postViewsRouter_1 = require("./routes/postViewsRouter");
var userViewsRouter_1 = require("./routes/userViewsRouter");
var submitViewsRouter_1 = require("./routes/submitViewsRouter");
var authRouter_1 = require("./routes/authRouter");
var app = express();
var PORT = process.env.PORT || 4001;
var upload = multer({ dest: '/' });
app.set('view engine', 'ejs');
app.use(function (req, res, next) {
    console.log(req.method);
    console.log(req.session.id); //requests are being recieved
    next();
});
app.use(upload.none());
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); //not a cors issue
app.use(session({ secret: process.env.SECRET, cookie: { secure: true }, proxy: true })); //make sure proxy is set to true of using https;
app.use('/', postViewsRouter_1["default"]); //the request never makes it to the router. but why?
app.use('/user', userViewsRouter_1["default"]);
app.use('/submit', submitViewsRouter_1["default"]);
app.use('/auth', authRouter_1["default"]);
app.listen(PORT, function () { return console.log("listening on port " + PORT); });
