import * as express from 'express';
import * as db from '../databaseHandler';

const postViewsRouter = express.Router();

postViewsRouter.get('/', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByDate();
    res.render('homepage', {posts: posts.rows});
    return;
});

postViewsRouter.get('/ranked', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByRank();
    res.render('homepage', {posts: posts.rows});
    return;
});

postViewsRouter.get('/topic/:topic', async (req, res, next) => {
    const posts = await db.posts.getAllByTopic(req.params.topic);
    res.render('homepage', {posts: posts.rows});
    return;
});

postViewsRouter.get('/post/:post_id', async (req, res, next) => {
    let post = await db.posts.getPostById(Number(req.params.post_id));
    let comments = await db.comments.getCommentsByPostId(Number(req.params.post_id));
    post = post.rows[0];
    post.comments = comments.rows;
    res.render('textPost', {post: post})
    return;
})

export default postViewsRouter;