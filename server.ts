import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as cors from 'cors';
import * as session from 'express-session';
import * as util from './utilityMiddleware';
import postViewsRouter from './routes/postViewsRouter';
import userViewsRouter from './routes/userViewsRouter';
import submitViewsRouter from './routes/submitViewsRouter';
import authRouter from './routes/authRouter';




const app = express();
const PORT = process.env.PORT || 4001;
//third party middleware
app.set('view engine', 'ejs');
app.use('/style', express.static(__dirname + '/views'));
app.use('/scripts', express.static(__dirname + '/scripts'));
app.use(express.json());
app.use(cors({origin: 'https://crudit.herokuapp.com'}));
app.use(session({secret: process.env.SECRET, cookie: {secure: true}, proxy: true, resave: true, saveUninitialized: true }));  //make sure proxy is set to true if using https;
//my middleware
app.use(util.logger);
app.use(util.attachUsernameToRequest);
//routes
app.use('/', postViewsRouter);
app.use('/user', userViewsRouter);
app.use('/submit', submitViewsRouter);
app.use('/auth', authRouter);
//final error handling
app.use(util.generalErrorHandler);
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
