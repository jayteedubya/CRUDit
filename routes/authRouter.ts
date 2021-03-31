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
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    try {
        console.log(typeof username);
        const userIDarr = await db.users.getUserIdFromUserName(username);
        console.log('userIDarr  ', userIDarr);  //undefined, but why?
        const userID = userIDarr[0];
        const userArr = await db.users.getUserFullInfo(Number(userID));
        console.log('userArr  ', userArr);
        const user = userArr[0];
        console.log('user:   ', user);
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            db.users.startSession(username, req.sessionID);
            res.redirect(`/user/${username}`);
        }
    }
    catch (err) {
        console.warn(err);
        res.send('failed');
    }

});

authRouter.post('/sign-up', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const emailaddress = req.body.emailaddress;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await db.users.createUser(username, emailaddress, hashedPassword, req.sessionID);
        res.redirect(`/user/${username}`);
    }
    catch (err) {
        console.warn(err)
        res.send('no worky worky');
    }
})

authRouter.get('/am-i-in', (req, res, next) => {
    const sessionID = req.sessionID;
    const user = db.users.getUserFromSession(sessionID);
    if (!user) {
        res.send('no worky worky');
    }
    res.send('yes');
})
export default authRouter;