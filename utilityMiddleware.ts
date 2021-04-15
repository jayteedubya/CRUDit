import * as db from './databaseHandler';

const attachUsernameToRequest = async (req, res, next) => {
    const sessionID = req.session.id;
    try {
        const userArray = await db.users.getUserFromSession(sessionID);
        if (userArray[0]) {
            const username = userArray[0].user_name;
            req.body.username = username;
            next();
            return;
        }
        next()
        return;
    }
    catch (err) {
        next(err)
    }
}

const logger = (req, res, next) => {
    console.log(req.method);
    next();
    return;
}

const generalErrorHandler = (err, req, res, next) => {
    console.warn(err);
    res.render('errorPage', {error: err});
    next();
}

export { generalErrorHandler, attachUsernameToRequest, logger };