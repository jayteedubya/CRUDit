//imports
import db from './databaseHandler';
//global instances
const posts = new db.Posts();
const comments = new db.Comments();
const users = new db.Users();

const initiate = async () => { 
    await users.initialize();
    await posts.initialize();
    await comments.initialize();   //make sure the tables are initialized in this order, as the table reference each other.
}
//create test values
const getRandomString = () => {
    const result = Math.random().toString(36).substring(2,16);
    return result;
}
const errHandler = err => console.warn(err);
const resultHandler = res => console.log(res);

const createRandomUsers = () => {
    for (let i: number = 0; i < 10; i++) {
        users.createUser(getRandomString(), getRandomString(), getRandomString());
    }
    return;
}

const createRandomPosts = () => {
    for (let i: number = 0; i < 10; i ++) {
        posts.createPost(getRandomString(), getRandomString(), getRandomString(), 1);
    }
}

const createRandomComments = () => {
    for (let i: number = 0; i < 10; i ++) {
        comments.createComment(1, getRandomString(), 1);
    }
}

/*createRandomUsers();
users.changePassword(1, getRandomString());
users.changeUserName(2, getRandomString());
users.changeEmail(3, getRandomString());
users.deleteUser(5);
users.getPasswordByUserId(1).then(resultHandler).catch(errHandler);
users.getUserFullInfo(1).then(resultHandler).catch(errHandler);
users.getUserPublicInfo(2).then(resultHandler).catch(errHandler);
users.getUserIdFromUserName('tvaetz15j0e').then(resultHandler).catch(errHandler);
ALL PASSED*/

/*createRandomPosts();
posts.getAllByTopic('xdptbwtf09d').then(res => console.log(res.rows))
posts.getAllOrderedByDate().then(res => console.log(res.rows));
posts.getAllOrderedByRank().then(res => console.log(res.rows));
posts.editPost('hunkle grunkle and cherry team', 1).then(res => console.log(res.rows));
posts.deletePost(3).then(res => console.log(res.rows));
users.getAllPostsByUser(1).then(res => console.log(res.rows));
ALL PASSED*/

/*createRandomComments();
comments.deleteComment(2);
comments.editComment(3, getRandomString());
comments.getAllCommentsByUser(1).then(res => console.log(res.rows));
comments.getCommmentsByPostId(1).then(res => console.log(res.rows));
ALL PASSED*/

export default {initiate, getRandomString};


