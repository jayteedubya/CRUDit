import * as express from 'express';
import * as db from '../databaseHandler';
import * as cors from 'cors';

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
        const user = req.body.username
        const post = await db.posts.getPostById(postId);
        const postObject = post[0];
        const comments = await db.comments.getCommentsByPostId(postId); 
        postObject.comments = comments;
        postObject.userViewing = user;
        res.render('textPost', {post: postObject});
        return;
    }
    catch(err) {
        next(err);
    }
})

//@ts-ignore
postViewsRouter.delete('/post/:postId', cors(),  async (req, res, next) => {  //unsafe routes need cors provided as middleware
    const author = await db.posts.getAuthorByPostId(Number(req.params.postId));
    const userAuthorization = author[0].user_name === req.body.username;
    if (!userAuthorization) {
        res.sendStatus(401);
        return;
    }
    try {
        await db.posts.deletePost(Number(req.params.postId));
        res.redirect(303, `/user/${req.body.username}`);
        return;
    }
    catch (err) {
        next(err);
    }
})
//@ts-ignore
postViewsRouter.put('/post/:postId', cors(), async (req, res, next) => {
    const author = await db.posts.getAuthorByPostId(Number(req.params.postId));
    const userAuthorization = author[0].user_name === req.body.username;
    if (!userAuthorization) {
        res.sendStatus(401);
        return;
    }
    if (!req.body.postbody){
        console.log('no body provided')
        next();
        return;
    }
    try {
        const user = req.body.username;
        await db.posts.editPost(req.body.postbody, Number(req.params.postId));
        res.redirect(303, `/user/${user}`);
        return;
    }
        
    catch (err) {
        next(err);
        return;
    }
})

export default postViewsRouter;