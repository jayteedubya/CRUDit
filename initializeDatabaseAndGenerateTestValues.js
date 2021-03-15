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
//imports
var db = require("./databaseHandler");
//global instances
var posts = db.posts;
var comments = db.comments;
var users = db.users;
var initiate = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, users.initialize()];
            case 1:
                _a.sent();
                return [4 /*yield*/, posts.initialize()];
            case 2:
                _a.sent();
                return [4 /*yield*/, comments.initialize()];
            case 3:
                _a.sent(); //make sure the tables are initialized in this order, as the table reference each other.
                return [2 /*return*/];
        }
    });
}); };
//create test values
var getRandomString = function () {
    var result = Math.random().toString(36).substring(2, 16);
    return result;
};
var errHandler = function (err) { return console.warn(err); };
var resultHandler = function (res) { return console.log(res); };
var createRandomUsers = function () {
    for (var i = 0; i < 10; i++) {
        users.createUser(getRandomString(), getRandomString(), getRandomString());
    }
    return;
};
var createRandomPosts = function () {
    for (var i = 0; i < 10; i++) {
        posts.createPost(getRandomString(), getRandomString(), getRandomString(), 1);
    }
};
var createRandomComments = function () {
    for (var i = 0; i < 10; i++) {
        comments.createComment(1, getRandomString(), 1);
    }
};
//initiate();
//createRandomUsers();
/*users.changePassword(1, getRandomString());
users.changeUserName(2, getRandomString());
users.changeEmail(3, getRandomString());
users.deleteUser(5);
users.getPasswordByUserId(1).then(resultHandler).catch(errHandler);
users.getUserFullInfo(1).then(resultHandler).catch(errHandler);
users.getUserPublicInfo(2).then(resultHandler).catch(errHandler);
users.getUserIdFromUserName('tvaetz15j0e').then(resultHandler).catch(errHandler);
ALL PASSED*/
//createRandomPosts();
/*posts.getAllByTopic('xdptbwtf09d').then(res => console.log(res.rows))
posts.getAllOrderedByDate().then(res => console.log(res.rows));
posts.getAllOrderedByRank().then(res => console.log(res.rows));
posts.editPost('hunkle grunkle and cherry team', 1).then(res => console.log(res.rows));
posts.deletePost(3).then(res => console.log(res.rows));
users.getAllPostsByUser(1).then(res => console.log(res.rows));
ALL PASSED*/
//createRandomComments();
/*comments.deleteComment(2);
comments.editComment(3, getRandomString());
comments.getAllCommentsByUser(1).then(res => console.log(res.rows));
*/
//comments.getCommentsByPostId(1).then(res => console.log(res.rows));
//comments.addChildComment(1, 3).then(resultHandler).catch(errHandler);
//comments.getCommentsByPostId(1).then(resultHandler).catch(errHandler);
//ALL PASSED
posts.getPostById(1).then(resultHandler)["catch"](errHandler);
exports["default"] = { initiate: initiate, getRandomString: getRandomString };
