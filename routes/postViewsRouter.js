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
var postViewsRouter = express.Router();
postViewsRouter.get('/', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.posts.getAllOrderedByDate()];
            case 1:
                posts = _a.sent();
                res.render('homepage', { posts: posts });
                return [2 /*return*/];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
postViewsRouter.get('/topic/:topic', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db.posts.getAllByTopic(req.params.topic)];
            case 1:
                posts = _a.sent();
                res.render('homepage', { posts: posts });
                return [2 /*return*/];
            case 2:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
postViewsRouter.get('/post/:postId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var postId, userFromSession, post, postObject, comments, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                postId = Number(req.params.postId);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4 /*yield*/, db.users.getUserFromSession(req.session.id)];
            case 2:
                userFromSession = _a.sent();
                return [4 /*yield*/, db.posts.getPostById(postId)];
            case 3:
                post = _a.sent();
                postObject = post[0];
                return [4 /*yield*/, db.comments.getCommentsByPostId(postId)];
            case 4:
                comments = _a.sent();
                postObject.comments = comments;
                postObject.userLoggedIn = !!userFromSession[0];
                res.render('textPost', { post: postObject });
                return [2 /*return*/];
            case 5:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
postViewsRouter.post('/post/:postId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db.users.getUserFromSession(req.session.id)];
            case 1:
                user = _a.sent();
                if (!user[0]) return [3 /*break*/, 3];
                return [4 /*yield*/, db.comments.createComment(user[0].user_name, req.body.comment, Number(req.params.postId))];
            case 2:
                _a.sent();
                res.redirect('back');
                _a.label = 3;
            case 3:
                res.status(302).redirect('/auth/log-in');
                return [3 /*break*/, 5];
            case 4:
                err_4 = _a.sent();
                console.warn(err_4);
                res.redirect('/');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//@ts-ignore
postViewsRouter.options('/post/:postId', cors());
//@ts-ignore
postViewsRouter["delete"]('/post/:postId', cors(), function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db.users.getUserFromSession(req.session.id)];
            case 1:
                user = _a.sent();
                user = user[0].user_name;
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, db.posts.deletePost(Number(req.params.postId))];
            case 2:
                _a.sent();
                res.redirect('back');
                return [2 /*return*/];
            case 3:
                res.redirect('/auth/log-in');
                return [2 /*return*/];
            case 4:
                err_5 = _a.sent();
                console.log(err_5);
                res.redirect('back');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
postViewsRouter.put('/post/:postId', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, db.users.getUserFromSession(req.session.id)];
            case 1:
                user = _a.sent();
                user = user[0].user_name;
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, db.posts.editPost(req.body.postbody, Number(req.params.postId))];
            case 2:
                _a.sent();
                res.redirect('back');
                _a.label = 3;
            case 3:
                res.redirect('/auth/log-in');
                return [3 /*break*/, 5];
            case 4:
                err_6 = _a.sent();
                console.log(err_6);
                res.redirect('back');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
postViewsRouter.use(function (err, req, res, next) {
    console.error(err);
    res.status(404).redirect('/');
});
exports["default"] = postViewsRouter;
