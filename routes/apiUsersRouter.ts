import * as db from '../databaseHandler';
import * as express from 'express';

const apiUsersRouter = express.Router();

apiUsersRouter.get('/:user_name/posts', async (req, res, next) => {
    const queryResult = await db.users.getAllPostsByUser(req.params.user_name);
    res.status(200).send(queryResult);
});

apiUsersRouter.get('/:user_name/comments', async (req, res, next) => {
    const queryResult = await db.users.getAllCommentsByUser(req.params.user_name);
    res.status(200).send(queryResult);
});

apiUsersRouter.get('/:user_name/public', async (req, res, next) => {
    const queryResult = await db.users.getUserPublicInfo(req.params.user_name);
    res.status(200).send(queryResult);
});

//add routes that require authentication here

export default apiUsersRouter;