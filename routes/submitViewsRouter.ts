import * as express from 'express';
import * as db from '../databaseHandler';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
})
submitViewsRouter.post('/post', async (req, res, next) => {
    const request = req.body;
    const result = await db.posts.createPost(request.title, request.topic, request.post, request.author);
    res.sendStatus(200);
})



export default submitViewsRouter;