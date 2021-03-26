"use strict";
exports.__esModule = true;
var express = require("express");
var authRouter = express.Router();
authRouter.get('/log-in', function (req, res, next) {
    res.render('logInPage.ejs');
    return;
});
//authRouter.post()
exports["default"] = authRouter;
