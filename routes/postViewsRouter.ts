import * as express from 'express';
import * as db from '../databaseHandler';

const postViewsRouter = express.Router();

postViewsRouter.get('/', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByDate();
    if (posts.rows.length > 0) {
        res.render('homepage', {posts: posts.rows});
        return;
    }
    next()
});

postViewsRouter.get('/ranked', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByRank();
    if (posts.rows.length > 0) {
        res.render('homepage', {posts: posts.rows});
        return;
    }
    next()
});

postViewsRouter.get('/topic/:topic', async (req, res, next) => {
    const posts = await db.posts.getAllByTopic(req.params.topic);
    if (posts.rows.length > 0) {
        res.render('homepage', {posts: posts.rows});
        return;
    }
    next();
});

postViewsRouter.get('/post/:post_id', async (req, res, next) => {
    const post = await db.posts.getPostById(Number(req.params.post_id));
    if (post.rows.length > 0) {
        const postObject = post.rows[0];
        const comments = await db.comments.getCommentsByPostId(Number(req.params.post_id));
        postObject.comments = comments.rows;
        res.render('textPost', {post: postObject});
        return;
    }
    next();
})

postViewsRouter.use((err, res, req, next) => {
    res.redirect('/error/post-not-found');
})


export default postViewsRouter;