import * as db from '../databaseHandler';
import * as express from 'express';

const apiUsersRouter = express.Router();

apiUsersRouter.get('/:user_id/posts', async (req, res, next) => {
    const queryResult = await db.users.getAllPostsByUser(Number(req.params.user_id));
    res.status(200).send(queryResult.rows);
});

apiUsersRouter.get('/:user_id/comments', async (req, res, next) => {
    const queryResult = await db.users.getAllCommentsByUser(Number(req.params.user_id));
    res.status(200).send(queryResult.rows);
});

apiUsersRouter.get('/:user_id/public', async (req, res, next) => {
    const queryResult = await db.users.getUserPublicInfo(Number(req.params.user_id));
    res.status(200).send(queryResult.rows);
});

//add routes that require authentication here

export default apiUsersRouter;