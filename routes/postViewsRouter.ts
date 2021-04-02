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

postViewsRouter.post('/post/:postId', async (req, res, next) => {
    try {
        const user = await db.users.getUserFromSession(req.session.id);
        if (user[0]) {
            await db.comments.createComment(user[0].username, req.body.comment, Number(req.params.postId));
            res.redirect('back');
        }
        res.redirect('back');
    }
    catch(err) {
        console.warn(err);
        res.redirect('/');
    }

})

postViewsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(404).redirect('/');
})


export default postViewsRouter;