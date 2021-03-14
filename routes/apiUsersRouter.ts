import * as db from '../databaseHandler';
import * as express from 'express';

const apiUsersRouter = express.Router();

apiUsersRouter.get('/:user_id/posts', (req, res, next) => {
    const queryResult = db.users.getAllPostsByUser(Number(req.params.user_id));
    res.status(200).json(queryResult);
})

apiUsersRouter.get('/:user_id/comments', (req, res, next) => {
    const queryResult = db.users.getAllCommentsByUser(Number(req.params.user_id));
    res
})