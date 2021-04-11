import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as multer from 'multer';
import * as cors from 'cors';
import * as session from 'express-session';
import * as util from './utilityMiddleware';
import postViewsRouter from './routes/postViewsRouter';
import userViewsRouter from './routes/userViewsRouter';
import submitViewsRouter from './routes/submitViewsRouter';
import authRouter from './routes/authRouter';




const app = express();
const PORT = process.env.PORT || 4001;
const upload = multer({dest: '/'});
//third party middleware
app.set('view engine', 'ejs');
app.use(upload.none());
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());  //not a cors issue
app.use(session({secret: process.env.SECRET, cookie: {secure: true}, proxy: true }));  //make sure proxy is set to true if using https;
//my middleware
app.use(util.attachUsernameToRequest);
app.use((req, res, next) => console.log('body, initial request', req.body));
//routes
app.use('/', postViewsRouter);
app.use('/user', userViewsRouter);
app.use('/submit', submitViewsRouter);
app.use('/auth', authRouter);
//final error handling
app.use(util.generalErrorHandler);
app.listen(PORT, () => console.log(`listening on port ${PORT}`))
