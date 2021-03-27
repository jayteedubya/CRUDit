import * as express from 'express';
import * as db from '../databaseHandler';

const userViewsRouter = express.Router();

userViewsRouter.use('/:username', async (req, res, next) => {
    const username = req.params.username;
    const posts = await db.users.getAllPostsByUser(username);
    const comments = await db.users.getAllCommentsByUser(username);
    const userPublic = await db.users.getUserPublicInfo(username);
    const userData = {
        posts: posts,
        comments: comments,
        upvoted: userPublic[0].upvoted,
        downvoted: userPublic[0].downvoted,
        user_name: userPublic[0].userName
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