import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as multer from 'multer';
import * as cors from 'cors';
import * as https from 'https';
import * as fs from 'fs';
import apiCommentsRouter from './routes/apiCommentsRouter';
import apiPostsRouter from './routes/apiPostsRouter';
import apiUsersRouter from './routes/apiUsersRouter';
import postViewsRouter from './routes/postViewsRouter';
import userViewsRouter from './routes/userViewsRouter';
import submitViewsRouter from './routes/submitViewsRouter';


const app = express();
const PORT = process.env.PORT || 4001;
const upload = multer({dest: '/'});

app.set('view engine', 'ejs');
app.use(upload.none());
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(upload.none());
app.use('/api/comments', apiCommentsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/posts', apiPostsRouter);
app.use('/', postViewsRouter);
app.use('/user', userViewsRouter);
app.use('/submit', submitViewsRouter);

/*https.createServer({
    key: fs.readFileSync('./security/server.key'),
    cert: fs.readFileSync('./security/server.cert')
  }, app)
  .listen(PORT, function () {
    console.log(`listening on port ${PORT}!`)
  })*/
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));