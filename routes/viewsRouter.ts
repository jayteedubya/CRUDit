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

viewsRouter.get('/user/:user_name', async (req, res, next) => {
    const posts = await db.users.getAllPostsByUser(req.params.user_name);
    const comments = await db.users.getAllCommentsByUser(req.params.user_name);
    const userPublic = await db.users.getUserPublicInfo(req.params.user_name);
    const userData = {
        posts: posts.rows,
        comments: comments.rows,
        upvoted: userPublic.rows[0].upvoted,
        downvoted: userPublic.rows[0].downvoted,
        user_name: userPublic.rows[0].user_name
    }
    res.render('userPage', {user: userData});
    return;
});

viewsRouter.get('/post/:post_id', async (req, res, next) => {
    let post = await db.posts.getPostById(Number(req.params.post_id));
    let comments = await db.comments.getCommentsByPostId(Number(req.params.post_id));
    post = post.rows[0];
    post.comments = comments.rows;
    res.render('textPost', {post: post})
    return;
})

viewsRouter.get('/user/comments', async (req, res, next) => {
    
})

export default viewsRouter;