import * as express from 'express';
import * as db from '../databaseHandler';
import * as bcrypt from 'bcrypt';

const userViewsRouter = express.Router();

userViewsRouter.get('/auth/log-in', (req, res, next) => {
    res.render('logInPage');
});

userViewsRouter.post('/auth/log-in', );

userViewsRouter.get('/auth/sign-up', (req, res, next) => {
    res.render('createUserPage');
})

userViewsRouter.post('/auth/sign-up', async (req, res, next) => {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
        const result = await db.users.createUser(userData.username, userData.emailaddress, hashedPassword);
        res.redirect(`/users/${result[0].user_name}`);
    }
    catch (err) {
        console.log(err);
        res.status(403).redirect('/error/user403')
    }

})

userViewsRouter.use('/:username', async (req, res, next) => {
    try {
        const username = req.params.username;
        const posts = await db.users.getAllPostsByUser(username);
        const comments = await db.users.getAllCommentsByUser(username);
        const userPublic = await db.users.getUserPublicInfo(username);
        const userData = {
            posts: posts,
            comments: comments,
            upvoted: userPublic[0].upvoted,
            downvoted: userPublic[0].downvoted,
            user_name: username
        }
        req.body.userData = userData;
        next();
    }
    catch(err) {
        next(err);
    }
    
});

userViewsRouter.get('/:user_name', (req, res, next) => {
    res.render('userPage', {user: req.body.userData});
    return;
})

userViewsRouter.get('/:user_name/comments', (req, res, next) => {
    res.render('userCommentsPage', {user: req.body.userData});
    return;
});

userViewsRouter.use((err, req, res, next) => {
    console.error(err);
    res.status(404).redirect('/error/user404');
})

export default userViewsRouter;