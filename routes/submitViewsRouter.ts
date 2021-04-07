import * as express from 'express';
import * as db from '../databaseHandler';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
})

submitViewsRouter.post('/post', async (req, res, next) => {
    const request = req.body;
    const author = req.body.username;
    if (req.body.userLogInStatus) {
        try {
            const result = await db.posts.createPost(request.title, request.topic, request.post, author);
            const postId = result[0].id;
            res.redirect(`/post/${postId}`);
            return;
        }
        catch (err) {
            next(err);
        }
    }
})

submitViewsRouter.post('/comment', async (req, res, next) => {
    try {  //could use some clean up
        const user = req.body.username;
        if (req.body.userLogInStatus) {
            await db.comments.createComment(user, req.body.comment, Number(req.body.postID));
            res.redirect('back');
        }
        res.status(302).redirect('/auth/log-in');
    }
    catch(err) {
        next(err);
    }
});


export default submitViewsRouter;