"use strict";
exports.__esModule = true;
var express = require("express");
var submitViewsRouter = express.Router();
submitViewsRouter.get('/post', function (req, res, next) {
    res.render('createPost');
    return;
});
submitViewsRouter.post('/post', function (req, res, next) {
    console.log(req.body);
    res.sendStatus(200);
});
exports["default"] = submitViewsRouter;
