"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var session = require("express-session");
var util = require("./utilityMiddleware");
var postViewsRouter_1 = require("./routes/postViewsRouter");
var userViewsRouter_1 = require("./routes/userViewsRouter");
var submitViewsRouter_1 = require("./routes/submitViewsRouter");
var authRouter_1 = require("./routes/authRouter");
var app = express();
var PORT = process.env.PORT || 4001;
//third party middleware
app.set('view engine', 'ejs');
app.use('/style', express.static(__dirname + '/views'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use(bodyParser.json());
app.use(cors({ origin: 'https://crudit.herokuapp.com' }));
app.use(session({ secret: process.env.SECRET, cookie: { secure: true }, proxy: true, resave: true, saveUninitialized: true })); //make sure proxy is set to true if using https;
//my middleware
app.use(util.attachUsernameToRequest);
app.use(function (req, res, next) {
    console.log("initial request body", req.body);
    next();
});
//routes
app.use('/', postViewsRouter_1["default"]);
app.use('/user', userViewsRouter_1["default"]);
app.use('/submit', submitViewsRouter_1["default"]);
app.use('/auth', authRouter_1["default"]);
//final error handling
app.use(util.generalErrorHandler);
app.listen(PORT, function () { return console.log("listening on port " + PORT); });
