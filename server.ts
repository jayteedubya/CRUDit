import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as multer from 'multer';
import * as cors from 'cors';
import * as session from 'express-session';
import postViewsRouter from './routes/postViewsRouter';
import userViewsRouter from './routes/userViewsRouter';
import submitViewsRouter from './routes/submitViewsRouter';
import authRouter from './routes/authRouter';



const app = express();
const PORT = process.env.PORT || 4001;
const upload = multer({dest: '/'});

app.set('view engine', 'ejs');
app.use((req, res, next) => {
    console.log(req.method);  //requests are being recieved
    next();
});
//app.use(upload.none());
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(cors()); 
app.use(session({secret: process.env.SECRET, cookie: {secure: true}, proxy: true }));  //make sure proxy is set to true of using https;

app.use('/', postViewsRouter);
app.use('/user', userViewsRouter);
app.use('/submit', submitViewsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
