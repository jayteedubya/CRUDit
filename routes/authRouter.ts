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

//fix memory leak session cookie store.

authRouter.post('/log-in', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    try {
        const userArr = await db.users.getUserFullInfo(username);
        console.log('user array  ', userArr);
        const user = userArr[0];   
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

authRouter.get('/am-i-in', async (req, res, next) => {
    const sessionID = req.sessionID;
    console.log(sessionID);
    try {
        const user = await db.users.getUserFromSession(sessionID);
        console.log(user[0].current_session);
        res.send(`you are logged in as ${user[0].user_name}`);
    }
    catch (err) {
        res.send('you are not logged in.');
    }
})
export default authRouter;