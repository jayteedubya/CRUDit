import * as express from 'express';
import * as db from '../databaseHandler';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
})
submitViewsRouter.post('/post', (req, res, next) => {
    console.log(req.body);
    res.sendStatus(200);
})



export default submitViewsRouter;