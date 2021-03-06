"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var db = require("../databaseHandler");
var cors = require("cors");
var submitViewsRouter = express.Router();
submitViewsRouter.get('/post', function (req, res, next) {
    res.render('createPost');
    return;
});
submitViewsRouter.post('/post', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var request, author, result, postId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                request = req.body;
                author = req.body.username;
                if (!req.body.username) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.posts.createPost(request.title, request.topic, request.post, author)];
            case 2:
                result = _a.sent();
                postId = result[0].id;
                res.redirect(303, "/post/" + postId);
                console.log(result);
                return [2 /*return*/];
            case 3:
                err_1 = _a.sent();
                next(err_1);
                return [2 /*return*/];
            case 4:
                res.sendStatus(401);
                return [2 /*return*/];
        }
    });
}); });
submitViewsRouter.post('/comment', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.username) {
                    res.redirect(303, '/auth/log-in');
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, db.comments.createComment(req.body.username, req.body.comment, Number(req.body.postID))];
            case 2:
                _a.sent();
                res.sendStatus(201);
                return [2 /*return*/];
            case 3:
                err_2 = _a.sent();
                next(err_2);
                return [2 /*return*/];
            case 4: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
submitViewsRouter["delete"]('/comment/:commentID', cors(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commentAuthor, userAuthorization, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.comments.getCommentAuthorByCommentId(Number(req.params.commentID))];
            case 1:
                commentAuthor = _a.sent();
                userAuthorization = commentAuthor[0].user_name === req.body.username;
                if (!userAuthorization) {
                    res.sendStatus(401);
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, db.comments.deleteComment(Number(req.params.commentID))];
            case 3:
                _a.sent();
                res.sendStatus(204);
                return [2 /*return*/];
            case 4:
                err_3 = _a.sent();
                next(err_3);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
submitViewsRouter.put('/comment/:commentID', cors(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var commentAuthor, userAuthorization, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.comments.getCommentAuthorByCommentId(Number(req.params.commentID))];
            case 1:
                commentAuthor = _a.sent();
                userAuthorization = commentAuthor[0].user_name === req.body.username;
                if (!userAuthorization) {
                    res.sendStatus(401);
                    return [2 /*return*/];
                }
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4 /*yield*/, db.comments.editComment(Number(req.params.commentID), req.body.commentbody)];
            case 3:
                _a.sent();
                res.sendStatus(200);
                return [2 /*return*/];
            case 4:
                err_4 = _a.sent();
                next(err_4);
                return [2 /*return*/];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports["default"] = submitViewsRouter;
