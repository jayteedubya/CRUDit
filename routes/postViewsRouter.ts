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
        const userFromSession = await db.users.getUserFromSession(req.session.id);
        const post = await db.posts.getPostById(postId);
        const postObject = post[0];
        const comments = await db.comments.getCommentsByPostId(postId); 
        postObject.comments = comments;
        postObject.userLoggedIn = !!userFromSession;
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
        res.redirect('/auth/log-in');
    }
    catch(err) {
        console.warn(err);
        res.redirect('/');
    }
//@ts-ignore
postViewsRouter.options('/post/:postId', cors());
//@ts-ignore
postViewsRouter.delete('/post/:postId', cors(),  async (req, res, next) => {
    try {
        let user = await db.users.getUserFromSession(req.session.id);  //the request never gets here, why?
        user = user[0].user_name;
        if (user) {
            await db.posts.deletePost(Number(req.params.postId));
            res.redirect(`/user/${user}`);
            return;
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
            res.redirect('back');
        }
        res.redirect('/auth/log-in') 
    }
    catch (err) {
        console.log(err);
        res.redirect('back');
    }
})

})

postViewsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(404).redirect('/');
})


export default postViewsRouter;