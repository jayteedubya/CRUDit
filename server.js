"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var apiCommentsRouter_1 = require("./routes/apiCommentsRouter");
var apiPostsRouter_1 = require("./routes/apiPostsRouter");
var apiUsersRouter_1 = require("./routes/apiUsersRouter");
var viewsRouter_1 = require("./routes/viewsRouter");
var app = express();
var PORT = process.env.PORT || 4001;
app.set('view engine', 'ejs');
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use('/api/comments', apiCommentsRouter_1["default"]);
app.use('/api/users', apiUsersRouter_1["default"]);
app.use('/api/posts', apiPostsRouter_1["default"]);
app.use('/', viewsRouter_1["default"]);
console.log(__dirname);
app.listen(PORT, function () { return console.log("listening on port: " + PORT); });
