import * as express from 'express';
import * as db from '../databaseHandler';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByDate();
    res.render('homepage', {posts: posts.rows});
    return;
});

viewsRouter.get('/ranked', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByRank();
    res.render('homepage', {posts: posts.rows});
    return;
});

viewsRouter.get('/topic/:topic', async (req, res, next) => {
    const posts = await db.posts.getAllByTopic(req.params.topic);
    res.render('homepage', {posts: posts.rows});
    return;
});

viewsRouter.get('/users/:user_name', async (req, res, next) => {
    const posts = await db.users.getAllPostsByUser(req.params.user_name);
    const comments = await db.users.getAllCommentsByUser(req.params.user_name);
    const userPublic = await db.users.getUserPublicInfo(req.params.user_name);
    const userData = {
        posts: posts.rows,
        comments: comments.rows,
        upvoted: userPublic.rows[0].upvoted,
        downvoted: userPublic.rows[0].downvoted
    }
    res.render('userPage', {user: userData});
    return;
});

export default viewsRouter;