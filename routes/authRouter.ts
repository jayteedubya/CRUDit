import * as express from 'express';
import * as db from '../databaseHandler';
import * as passport from "passport";

const authRouter = express.Router();

authRouter.get('/log-in', (req, res, next) => {
    res.render('logInPage.ejs');
    return;
});

//authRouter.post()

export default authRouter;