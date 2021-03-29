import * as express from 'express';
import * as session from 'express-session';
import * as db from '../databaseHandler';
import * as bcrypt from 'bcrypt';

const authRouter = express.Router();

authRouter.get('/log-in', (req, res, next) => {
    res.render('logInPage');
})

authRouter.get('/sign-up', (req, res, next) => {
    res.render('createUserPage');
});

authRouter.post('/log-in', async (req, res, next) => {
    const userName = req.body.user_name;
    const password = req.body.password;
    try {
        const user = await db.users.getUserFullInfo(userName)[0];
        const result = bcrypt.compare(password, user.password);
        if (result) {
            //@ts-ignore  //this makes the compiler stop complaining
            req.session.user = req.body.user_name;
        }
    }
    catch (err) {
        res.send(err);
    }

});

authRouter.get('/am-i-in', (req, res, next) => {
    //@ts-ignore
    const user = req.session.user;
    if (user) {
        res.send(user);
        return;
    }
    res.send('no worky worky');
})
export default authRouter;