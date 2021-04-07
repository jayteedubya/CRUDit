import * as db from './databaseHandler';

const attachUsernameToRequest = async (req, res, next) => {
    const sessionID = req.session.id;
    try {
        const userArray = await db.users.getUserFromSession(sessionID);
        if (userArray[0]) {
            const username = userArray[0].user_name;
            req.body.username = username;
            req.body.userLogInStatus = true;
            next();
        }
        next()
    }
    catch (err) {
        next(err)
    }
}

const generalErrorHandler = (err, req, res, next) => {
    console.warn(err);
    res.render('errorPage', {error: err});
    next();
}

export { generalErrorHandler, attachUsernameToRequest };