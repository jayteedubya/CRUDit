//imports
import db from './databaseHandler';
//global instances
const posts = new db.Posts();
const comments = new db.Comments();
const users = new db.Users();
//initialize tables
posts.initialize();
comments.initialize();
users.initialize();
//create test values
const getRandomString = () => {
    const result = Math.random().toString(36).substring(2,16);
    return result;
}
const errHandler = err => console.warn(err);
const resultHandler = res => console.log(res);

const createRandomUsers = () => {
    for (let i: number; i < 10; i++) {
        const result = users.createUser(getRandomString(), getRandomString(), getRandomString());
        result.then(resultHandler).catch(errHandler);
    }
    return;
}
//createRandomUsers();

