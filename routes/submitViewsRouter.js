"use strict";
exports.__esModule = true;
var express = require("express");
var submitViewsRouter = express.Router();
submitViewsRouter.get('/post', function (req, res, next) {
    res.render('createPost');
    return;
});
exports["default"] = submitViewsRouter;
