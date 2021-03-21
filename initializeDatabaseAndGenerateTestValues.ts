//imports
import * as db from './databaseHandler';
//global instances
const posts = db.posts
const comments = db.comments
const users = db.users;

const initiate = async () => { 
    await users.initialize();
    await posts.initialize();
    await comments.initialize();
    await users.createUser('jayteedubya', 'squirrels@nonsense.com', 'womprats!');
    await users.createUser('TheCluster', 'salty@sea.net', 'shite2222');
    await users.createUser('BirdPerson', 'raven@BiquadFilterNode.net', 'duck-sicker')
    await posts.createPost('stuff', 'things', getRandomString(),'jayteedubya');
    await comments.createComment('jayteedubya', 'this a comment, currently only available by direct SQL query.', 1);   //make sure the tables are initialized in this order, as the table reference each other.
}
//create test values



initiate();



