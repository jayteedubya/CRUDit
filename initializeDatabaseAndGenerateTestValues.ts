//imports
import * as db from './databaseHandler';
//global instances
const posts = db.posts
const comments = db.comments
const users = db.users;

const sleep = async (duration: number) => {
    await setTimeout(() => console.log('done'), duration);
    return;
}

const initiate = async () => { 
    await users.initialize();
    await posts.initialize();
    await comments.initialize();
    await users.createUser('jayteedubya', 'jimbob@bobnet.com', 'womprats!');
    await users.createUser('TheCluster', 'salt@sea.net', 'shite2222');
    await posts.createPost('stuff', 'things', getRandomString(),'jayteedubya');
    await comments.createComment('jayteedubya', 'fake and gay', 1);   //make sure the tables are initialized in this order, as the table reference each other.
}
//create test values
const getRandomString = () => {
    const result = Math.random().toString(36).substring(2,16);
    return result;
}

const getRandomInt = (upperLimit: number) => {
    const result = Math.floor(Math.random() * upperLimit);
    return result;
}
const errHandler = err => console.warn(err);

const resultHandler = res => console.log(res);


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

initiate();



