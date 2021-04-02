import * as express from 'express';
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
    try {
        const userArr = await db.users.getUserFullInfo(username);
        const user = userArr[0];   //for some god damn reason it wont add the damn session to the damn database
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            await db.users.startSession(username, req.session.id);
            console.log(userArr[0]);
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
        await db.users.createUser(username, emailaddress, hashedPassword, req.session.id);
        res.redirect(`/user/${username}`);
    }
    catch (err) {
        console.warn(err);
        res.send('no worky worky');
    }
});

authRouter.post('/log-out', async (req, res, next) => {
    try {
        const user = await db.users.getUserFromSession(req.session.id);
        if (user) {
            db.users.endSession(user[0].user_name);
            res.redirect('/');
            return;
        }
        res.send('already out');
    }
    catch (err) {
        console.log(err);
        res.redirect('/error/auth-err');
    }
})

authRouter.get('/am-i-in', async (req, res, next) => {
    const sessionID = req.session.id;
    console.log('session id before try', sessionID);
    try {
        const user = await db.users.getUserFromSession(sessionID);
        console.log('user, from am i in', user);
        res.send(`you are logged in as ${user[0].user_name}`);
    }
    catch (err) {
        console.warn(err);
        res.send('you are not logged in.');
    }
});
export default authRouter;