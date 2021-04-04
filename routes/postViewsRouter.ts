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
        const userFromSession = await db.users.getUserFromSession(req.session.id);
        const post = await db.posts.getPostById(postId);
        const postObject = post[0];
        const comments = await db.comments.getCommentsByPostId(postId); 
        postObject.comments = comments;
        if (userFromSession[0]) {
            postObject.userLoggedIn = (postObject.user_name === userFromSession[0].user_name);
        }
        else {
            postObject.userLoggedIn = false;
        }
        res.render('textPost', {post: postObject});
        return;
    }
    catch(err) {
        next(err);
    }
})

postViewsRouter.post('/post/:postId', async (req, res, next) => {
    try {
        const user = await db.users.getUserFromSession(req.session.id);
        if (user[0]) {
            await db.comments.createComment(user[0].user_name, req.body.comment, Number(req.params.postId));
            res.redirect('back');
        }
        res.status(302).redirect('/auth/log-in');
    }
    catch(err) {
        console.warn(err);
        res.redirect('/');
    }
});
//@ts-ignore
postViewsRouter.options('/post/:postId', cors());  //need to add cors as middleware to any unsafe routes
//@ts-ignore
postViewsRouter.delete('/post/:postId', cors(),  async (req, res, next) => {
    try {
        let user = await db.users.getUserFromSession(req.session.id);
        user = user[0].user_name;
        if (user) {
            
            await db.posts.deletePost(Number(req.params.postId));
            res.status(200).redirect(`/user/${user}`);
        }
        res.redirect('/auth/log-in');
        return;
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
})

postViewsRouter.put('/post/:postId', async (req, res, next) => {
    try {
        let user = await db.users.getUserFromSession(req.session.id);
        user = user[0].user_name;
        if (user) {
            await db.posts.editPost(req.body.postbody, Number(req.params.postId));
            res.redirect(`/user/${user}`);
        }
        res.redirect('/auth/log-in');
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
})

postViewsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(404).redirect('/');
})


export default postViewsRouter;