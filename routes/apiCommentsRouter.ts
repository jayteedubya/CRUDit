import * as db from '../databaseHandler';
import * as express from 'express';

const apiCommentsRouter = express.Router();

apiCommentsRouter.get('/:post_id', async (req, res, next) => {
    const queryResult = await db.comments.getCommentsByPostId(Number(req.params.post_id));
    res.status(200).json(queryResult.rows);
});

//add routes that require authentication here

export default apiCommentsRouter;