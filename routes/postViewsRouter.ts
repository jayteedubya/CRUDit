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
        postObject.userLogInStatus = req.body.userLogInStatus;
        res.render('textPost', {post: postObject});
        return;
    }
    catch(err) {
        next(err);
    }
})
    
//@ts-ignore
postViewsRouter.options('/post/:postId', cors());  //need to add cors as middleware to any unsafe routes, enable pre-flight
//@ts-ignore
postViewsRouter.delete('/post/:postId', cors(),  async (req, res, next) => {
    try {
        const user = req.body.username;
        if (req.body.userLogInStatus) {
            await db.posts.deletePost(Number(req.params.postId));
            res.redirect(`/user/${user}`);
        }
        res.redirect('/auth/log-in');
        return;
    }
    catch (err) {
        next(err);
    }
})
//@ts-ignore
postViewsRouter.put('/post/:postId', cors(), async (req, res, next) => {
    if (!req.body.postbody){
        console.log('no body provided')
        next();
        return;
    }
    try {
        const user = req.body.username
        if (req.body.userLogInStatus) {
            await db.posts.editPost(req.body.postbody, Number(req.params.postId));
            res.redirect(`/user/${user}`);
            return;
        }
        res.redirect('/auth/log-in');
    }
    catch (err) {
        next(err);
    }
})

export default postViewsRouter;