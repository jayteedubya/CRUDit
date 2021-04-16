import * as express from 'express';
import * as db from '../databaseHandler';
import * as cors from 'cors';

const submitViewsRouter = express.Router();

submitViewsRouter.get('/post', (req, res, next) => {
    res.render('createPost');
    return;
});

submitViewsRouter.post('/post', async (req, res, next) => {
    const request = req.body;
    const author = req.body.username;
    if (req.body.username) {
        try {
            const result = await db.posts.createPost(request.title, request.topic, request.post, author);
            const postId = result[0].id;
            res.status(201).redirect(`/post/${postId}`);
            console.log(result);
            return;
        }
        catch (err) {
            next(err);
            return;
        }
    }
    res.sendStatus(401)
});

submitViewsRouter.post('/comment', async (req, res, next) => {
    if (!req.body.username) {
        res.status(401).redirect('/auth/log-in');
        return;
    }
    try {
        await db.comments.createComment(req.body.username, req.body.comment, Number(req.body.postID));
        res.sendStatus(201);
        return;
    }
    catch(err) {
        next(err);
        return;
    }    
});
//@ts-ignore
submitViewsRouter.delete('/comment/:commentID', cors(), async (req, res, next) => {
    const commentAuthor = await db.comments.getCommentAuthorByCommentId(Number(req.params.commentID));
    const userAuthorization = commentAuthor[0].user_name === req.body.username;
    if (!userAuthorization) {
        res.sendStatus(401);
        return;
    }
    try {
        await db.comments.deleteComment(Number(req.params.commentID));
        res.sendStatus(204);
        return;
    }
    catch (err) {
        next(err);
        return;
    }
});
//@ts-ignore
submitViewsRouter.put('/comment/:commentID', cors(), async (req, res, next) => {
    const commentAuthor = await db.comments.getCommentAuthorByCommentId(Number(req.params.commentID));
    const userAuthorization = commentAuthor[0].user_name === req.body.username;
    if (!userAuthorization) {
        res.sendStatus(401);
        return;
    }
    try {
        await db.comments.editComment(Number(req.params.commentID), req.body.commentbody);
        res.sendStatus(200);
        return;
    }
    catch (err) {
        next (err);
        return;
    }
});

export default submitViewsRouter;