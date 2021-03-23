import * as express from 'express';
import * as db from '../databaseHandler';

const authRouter = express.Router();

authRouter.get('/log-in', (req, res, next) => {
    res.render('logInPage.ejs');
    return;
});

export default authRouter;