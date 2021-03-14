import * as express from 'express';
import * as db from '../databaseHandler';

const apiPostsRouter = express.Router();

apiPostsRouter.get('/', async (req, res, next) => {
    const queryResult = await db.posts.getAllOrderedByDate();
    res.status(200).json(queryResult.rows);
});

apiPostsRouter.get('/ranked', async (req, res, next) => {
    const queryResult = await db.posts.getAllOrderedByRank();
    res.status(200).json(queryResult.rows);
});

apiPostsRouter.get('/:topic', async (req, res, next) => {
    const queryResult = await db.posts.getAllByTopic(req.params.topic);
    res.status(200).json(queryResult.rows);
});

apiPostsRouter.get('/:post_id', async (req, res, next) => {
    const queryResult = await db.posts.getPostById(Number(req.params.post_id));
    res.status(200).json(queryResult.rows);
}); //issues in this route

//add routes that require authentication here

export default apiPostsRouter;