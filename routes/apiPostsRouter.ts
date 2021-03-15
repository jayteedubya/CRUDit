import * as express from 'express';
import * as db from '../databaseHandler';

const apiPostsRouter = express.Router();

apiPostsRouter.get('/', async (req, res, next) => {
    const queryResult = await db.posts.getAllOrderedByDate();
    res.status(200).send(queryResult.rows);
});

apiPostsRouter.get('/ranked', async (req, res, next) => {
    const queryResult = await db.posts.getAllOrderedByRank();
    res.status(200).send(queryResult.rows);
});

apiPostsRouter.get('/by-topic/:topic', async (req, res, next) => {
    const queryResult = await db.posts.getAllByTopic(req.params.topic);
    res.status(200).send(queryResult.rows);
});

apiPostsRouter.get('/by-id/:post_id/', async (req, res, next) => {
    console.log("why don't I get called?");
    const queryResult = await db.posts.getPostById(Number(req.params.post_id));
    res.status(200).send(queryResult.rows);
}); //it never got called because you had two routers doing the same thing /:topic and /:post_id



//add routes that require authentication here

export default apiPostsRouter;