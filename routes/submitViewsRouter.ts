import * as express from 'express';
import * as db from '../databaseHandler';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
})
submitViewsRouter.post('/post', async (req, res, next) => {
    const request = req.body;
    try {
        const user = await db.users.getUserFromSession(req.session.id);
        var author = user[0].user_name
    }
    catch (err) {
        console.warn(err);
        res.redirect('/');
    }
    if (author) {
        try {
            const result = await db.posts.createPost(request.title, request.topic, request.post, author);
            const postId = result[0].id;
            res.redirect(`/post/${postId}`);
            return;
        }
        catch (err) {
            console.warn(err);
            res.redirect('/')
        }
    }
})


export default submitViewsRouter;