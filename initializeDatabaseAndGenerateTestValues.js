"use strict";
exports.__esModule = true;
//imports
var databaseHandler_1 = require("./databaseHandler");
//global instances
var posts = new databaseHandler_1["default"].Posts();
var comments = new databaseHandler_1["default"].Comments();
var users = new databaseHandler_1["default"].Users();
//initialize tables
posts.initialize();
comments.initialize();
users.initialize();
//create test values
var getRandomString = function () {
    var result = Math.random().toString(36).substring(2, 16);
    return result;
};
var errHandler = function (err) { return console.warn(err); };
var resultHandler = function (res) { return console.log(res); };
var createRandomUsers = function () {
    for (var i = void 0; i < 10; i++) {
        var result = users.createUser(getRandomString(), getRandomString(), getRandomString());
        result.then(resultHandler)["catch"](errHandler);
    }
    return;
};
//createRandomUsers();
