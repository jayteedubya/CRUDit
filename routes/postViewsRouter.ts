import * as express from 'express';
import * as db from '../databaseHandler';

const postViewsRouter = express.Router();

postViewsRouter.get('/', async (req, res, next) => {
    try {
        const posts = await db.posts.getAllOrderedByDate();
        res.render('homepage', {posts: posts});
        return;
    }
    catch(err) {
        next(err);
    }
});

postViewsRouter.get('/ranked', async (req, res, next) => {
    try {
        const posts = await db.posts.getAllOrderedByRank();
        res.render('homepage', {posts: posts});
        return;
    }
    catch(err) {
        next(err);
    }
});

postViewsRouter.get('/topic/:topic', async (req, res, next) => {
    try {
        const posts = await db.posts.getAllByTopic(req.params.topic);
        res.render('homepage', {posts: posts});
        return;
    }
    catch(err) {
        next(err);
    }
});

postViewsRouter.get('/post/:postId', async (req, res, next) => {
    const postId = Number(req.params.postId)
    try {
        const post = await db.posts.getPostById(postId);
        const postObject = post[0];
        const comments = await db.comments.getCommentsByPostId(postId);    //issues exist with comments being undefined, that is why only post 1 shows up
        postObject.comments = comments;
        res.render('textPost', {post: postObject});
        return;
    }
    catch(err) {
        next(err);
    }
})

postViewsRouter.use((err, res, req, next) => {
    res.redirect(err, '/error/post-not-found');
})


export default postViewsRouter;