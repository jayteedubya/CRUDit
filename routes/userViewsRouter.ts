import * as express from 'express';
import * as db from '../databaseHandler';
import * as passport from 'passport';
import * as localStrategy from 'passport-local';

const userViewsRouter = express.Router();

userViewsRouter.use('/:user_name', async (req, res, next) => {
    const posts = await db.users.getAllPostsByUser(req.params.user_name);
    const comments = await db.users.getAllCommentsByUser(req.params.user_name);
    const userPublic = await db.users.getUserPublicInfo(req.params.user_name);
    const userData = {
        posts: posts.rows,
        comments: comments.rows,
        upvoted: userPublic.rows[0].upvoted,
        downvoted: userPublic.rows[0].downvoted,
        user_name: userPublic.rows[0].user_name
    }
    req.body.userData = userData;
    next()
});

userViewsRouter.get('/:user_name', (req, res, next) => {
    res.render('userPage', {user: req.body.userData});
    return;
})

userViewsRouter.get('/:user_name/comments', (req, res, next) => {
    res.render('userCommentsPage', {user: req.body.userData});
    return;
})

userViewsRouter.get('/log-in', (req, res, next) => {
    res.render('logInPage.ejs');
    return;
})


export default userViewsRouter;