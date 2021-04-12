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
            res.redirect('/topic/tests');
            return;
        }
        catch (err) {
            next(err);
            return;
        }
    }
    res.sendStatus(401)
})

submitViewsRouter.post('/comment', async (req, res, next) => {
    if (req.body.userLogInStatus) {
        const user = req.body.username;
        try {
            await db.comments.createComment(user, req.body.comment, Number(req.body.postID));
        }
        catch(err) {
            next(err);
            return;
        }
        res.redirect('back');
        return;
    }
    res.redirect('/auth/log-in');
    
});


export default submitViewsRouter;