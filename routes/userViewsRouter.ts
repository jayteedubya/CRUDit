import * as express from 'express';
import * as db from '../databaseHandler';

const userViewsRouter = express.Router();

userViewsRouter.use('/:user_name', async (req, res, next) => {
    const posts = await db.users.getAllPostsByUser(req.params.user_name);
    const comments = await db.users.getAllCommentsByUser(req.params.user_name);
    const userPublic = await db.users.getUserPublicInfo(req.params.user_name);
    const userData = {
        posts: posts,
        comments: comments,
        upvoted: userPublic[0].upvoted,
        downvoted: userPublic[0].downvoted,
        user_name: userPublic[0].user_name
    }
    req.body.userData = userData;
});

userViewsRouter.get('/:user_name', (req, res, next) => {
    res.render('userPage', {user: req.body.userData});
    return;
})

userViewsRouter.get('/:user_name/comments', (req, res, next) => {
    res.render('userCommentsPage', {user: req.body.userData});
    return;
})

export default userViewsRouter;