"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.comments = exports.users = exports.posts = void 0;
var pg = require("pg");
var Table = /** @class */ (function () {
    function Table() {
    }
    Table.prototype.getNewClient = function () {
        return new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
    };
    Table.prototype.makeQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var client, queryResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        client = this.getNewClient();
                        return [4 /*yield*/, client.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, client.query(query)];
                    case 2:
                        queryResult = _a.sent();
                        client.end();
                        if (queryResult.rows.length > 0) {
                            return [2 /*return*/, queryResult.rows];
                        }
                        throw new Error('Empty result Set');
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Table;
}());
var Posts = /** @class */ (function (_super) {
    __extends(Posts, _super);
    function Posts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Posts.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startQuery = "CREATE TABLE posts (\
        id SERIAL PRIMARY KEY,\
        title VARCHAR(100) NOT NULL,\
        topic VARCHAR(30),\
        upvotes INTEGER DEFAULT 0,\
        time_stamp TIMESTAMP NOT NULL DEFAULT NOW(),\
        body VARCHAR(5000),\
        user_name VARCHAR(40) REFERENCES users(user_name));";
                        return [4 /*yield*/, this.makeQuery(startQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Posts.prototype.getAllOrderedByDate = function () {
        var query = 'SELECT *\
        FROM posts\
        ORDER BY time_stamp DESC;';
        return this.makeQuery(query);
    };
    Posts.prototype.getAllOrderedByRank = function () {
        var query = 'SELECT *\
        FROM posts\
        ORDER BY upvotes DESC;';
        return this.makeQuery(query);
    };
    Posts.prototype.getAllByTopic = function (topic) {
        var query = "SELECT *        FROM posts        WHERE topic = '" + topic + "';";
        return this.makeQuery(query);
    };
    Posts.prototype.getPostById = function (post_id) {
        console.log(post_id);
        var query = "SELECT *        FROM posts        WHERE id = " + post_id + ";";
        return this.makeQuery(query);
    };
    Posts.prototype.createPost = function (title, topic, body, user_name) {
        var query = "INSERT INTO posts (title, topic, body, user_name)        VALUES ('" + title + "', '" + topic + "', '" + body + "', '" + user_name + "')        RETURNING id;";
        return this.makeQuery(query);
    };
    Posts.prototype.editPost = function (body, post_id) {
        var query = "UPDATE posts        SET body = '" + body + "'        WHERE id = " + post_id + ";";
        return this.makeQuery(query);
    };
    Posts.prototype.deletePost = function (post_id) {
        var query = "DELETE FROM posts        WHERE id = " + post_id + ";";
        return this.makeQuery(query);
    };
    Posts.prototype.upvote = function (post_id) {
        var query = "UPDATE posts        SET upvotes = upvotes + 1\n        WHERE id = " + post_id;
        return this.makeQuery(query);
    };
    Posts.prototype.downvote = function (post_id) {
        var query = "UPDATE posts        SET upvotes = upvotes - 1\n        WHERE id = " + post_id;
        return this.makeQuery(query);
    };
    return Posts;
}(Table));
var Comments = /** @class */ (function (_super) {
    __extends(Comments, _super);
    function Comments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Comments.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startQuery = "CREATE TABLE comments (\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) REFERENCES users(user_name),\
        body VARCHAR(1000),\
        time_stamp DATE NOT NULL DEFAULT NOW(),\
        post_id INTEGER REFERENCES posts(id),\
        children INTEGER[] NOT NULL DEFAULT '{}');";
                        return [4 /*yield*/, this.makeQuery(startQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Comments.prototype.createComment = function (user_name, body, post_id) {
        var query = "INSERT INTO comments (user_name, body, post_id)        VALUES ('" + user_name + "', '" + body + "', " + post_id + ");";
        return this.makeQuery(query);
    };
    Comments.prototype.editComment = function (id, body) {
        var query = "UPDATE comments        SET body = '" + body + "'        WHERE id = " + id + ";";
        return this.makeQuery(query);
    };
    Comments.prototype.deleteComment = function (id) {
        var query = "DELETE FROM posts        WHERE id = " + id + ";";
        return this.makeQuery(query);
    };
    Comments.prototype.getCommentsByPostId = function (post_id) {
        var query = "SELECT *        FROM comments        WHERE post_id = " + post_id + ";";
        return this.makeQuery(query);
    };
    Comments.prototype.addChildComment = function (parent_id, child_id) {
        var query = "UPDATE comments        SET children = array_append(children, " + child_id + ")        WHERE id = " + parent_id + ";";
        return this.makeQuery(query);
    };
    return Comments;
}(Table));
var Users = /** @class */ (function (_super) {
    __extends(Users, _super);
    function Users() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Users.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startQuery;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startQuery = "CREATE TABLE users(\
        id SERIAL PRIMARY KEY,\
        user_name VARCHAR(40) UNIQUE NOT NULL,\
        email VARCHAR(120),\
        upvoted INTEGER[] NOT NULL DEFAULT '{}',\
        downvoted INTEGER[] NOT NULL DEFAULT '{}',\
        password TEXT);";
                        return [4 /*yield*/, this.makeQuery(startQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Users.prototype.getUserPublicInfo = function (user_name) {
        var query = "SELECT user_name, upvoted, downvoted        FROM users        WHERE user_name = '" + user_name + "';";
        return this.makeQuery(query);
    };
    Users.prototype.getUserIdFromUserName = function (user_name) {
        var query = "SELECT id        FROM users        WHERE user_name = '" + user_name + "';";
        return this.makeQuery(query);
    };
    Users.prototype.getPasswordByUserId = function (user_id) {
        var query = "SELECT password        FROM users        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.getUserFullInfo = function (user_id) {
        var query = "SELECT *        FROM users        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.createUser = function (user_name, email, password) {
        var query = "INSERT INTO users (user_name, email, password)        VALUES ('" + user_name + "', '" + email + "', '" + password + "');";
        return this.makeQuery(query);
    };
    Users.prototype.changePassword = function (user_id, newPassword) {
        var query = "UPDATE users        SET password = '" + newPassword + "'        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.changeEmail = function (user_id, newEmail) {
        var query = "UPDATE users        SET email = '" + newEmail + "'        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.changeUserName = function (user_id, newUserName) {
        var query = "UPDATE users        SET user_name = '" + newUserName + "'        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.deleteUser = function (user_id) {
        var query = "DELETE FROM users        WHERE id = " + user_id + ";";
        return this.makeQuery(query);
    };
    Users.prototype.getAllCommentsByUser = function (user_name) {
        var query = "SELECT *        FROM comments        WHERE user_name = '" + user_name + "'        ORDER BY time_stamp;";
        return this.makeQuery(query);
    };
    Users.prototype.getAllPostsByUser = function (user_name) {
        var query = "SELECT *        FROM posts        WHERE user_name = '" + user_name + "';";
        return this.makeQuery(query);
    };
    return Users;
}(Table));
exports.posts = new Posts();
exports.users = new Users();
exports.comments = new Comments();
