import * as express from 'express';
import * as db from '../databaseHandler';

const viewsRouter = express.Router();

viewsRouter.get('/', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByDate();
    res.render('homepage', {posts: posts.rows});
    return;
});

viewsRouter.get('/ranked', async (req, res, next) => {
    const posts = await db.posts.getAllOrderedByRank();
    res.render('homepage', {posts: posts.rows});
    return;
})

viewsRouter.get('/topic/:topic', async (req, res, next) => {
    const posts = await db.posts.getAllByTopic(req.params.topic);
    res.render('homepage', {posts: posts.rows});
    return;
})


export default viewsRouter;