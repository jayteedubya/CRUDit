import * as express from 'express';
import * as bodyParser from 'body-parser'
import apiCommentsRouter from './routes/apiCommentsRouter';
import apiPostsRouter from './routes/apiPostsRouter';
import apiUsersRouter from './routes/apiUsersRouter';
import viewsRouter from './routes/viewsRouter';


const app = express();
const PORT = process.env.PORT || 4001;

app.set('view engine', 'ejs');
app.use('/style', express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use('/api/comments', apiCommentsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/posts', apiPostsRouter);
app.use('/', viewsRouter);

console.log(__dirname);
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));