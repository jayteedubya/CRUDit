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

authRouter.post('/log-in', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const userArr = await db.users.getUserFullInfo(username);
        const user = userArr[0];
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            await db.users.startSession(username, req.session.id);
            res.redirect(`/user/${username}`);
        }
    }
    catch (err) {
        next(err);
    }

});

authRouter.post('/sign-up', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const emailaddress = "placeholder";
    console.log("username: ",username);
    console.log("password: ", password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    try {
        console.log(await db.users.createUser(username, emailaddress, hashedPassword, req.session.id));
    }
    catch (err) {
        next(err);
    }
    res.status(302).redirect(`/user/${username}`);
});

authRouter.get('/log-out', async (req, res, next) => {
    try {
        const user = req.body.username
        if (req.body.userLogInStatus) {
            db.users.endSession(user);
            res.redirect('/');
            return;
        }
        res.send('already out');
    }
    catch (err) {
        next(err);
        return;
    }
})

authRouter.get('/am-i-in', async (req, res, next) => {
    res.send(req.body.userLogInStatus);
    return;
});
export default authRouter;