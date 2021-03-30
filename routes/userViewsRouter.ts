import * as express from 'express';
import * as db from '../databaseHandler';

const userViewsRouter = express.Router();

userViewsRouter.get('/auth/log-in', (req, res, next) => {
    res.render('logInPage');
});

userViewsRouter.post('/auth/log-in', );

userViewsRouter.get('/auth/sign-up', (req, res, next) => {
    res.render('createUserPage');
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