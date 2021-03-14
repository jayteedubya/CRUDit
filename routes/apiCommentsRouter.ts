import * as db from '../databaseHandler';
import * as express from 'express';

const apiCommentsRouter = express.Router();

apiCommentsRouter.get('/:post_id', async (req, res, next) => {
    const queryResult = await db.comments.getCommentsByPostId(Number(req.params.post_id));
    res.status(200).json(queryResult.rows);
});

apiCommentsRouter.get('/:user_id', async (req, res, next) => {
    const queryResult = await db.comments.getAllCommentsByUser(Number(req.params.user_id));
    res.status(200).json(queryResult.rows);
});

export default apiCommentsRouter;