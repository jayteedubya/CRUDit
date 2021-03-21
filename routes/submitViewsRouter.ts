import * as express from 'express';
import * as db from '../databaseHandler';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
})
submitViewsRouter.post('/post', async (req, res, next) => {
    const request = req.body;  
    const result = await db.posts.createPost(request.title, request.topic, request.post, request.author).catch(err => next(err));
    const postId = result.rows[0].id;
    res.redirect(`/post/${postId}`);
    return;
})

submitViewsRouter.use((err, req, res, next) => {
    console.log(err)
    res.sendStatus(500);
    return;
})


export default submitViewsRouter;