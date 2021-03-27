import * as express from 'express';
import * as db from '../databaseHandler';

const userViewsRouter = express.Router();

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
    console.log(req.body.userData);
    res.render('userPage', {user: req.body.userData});
    return;
})

userViewsRouter.get('/:user_name/comments', (req, res, next) => {
    res.render('userCommentsPage', {user: req.body.userData});
    return;
})

export default userViewsRouter;