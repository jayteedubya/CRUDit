import * as express from 'express';
import apiCommentsRouter from './routes/apiCommentsRouter';
import apiPostsRouter from './routes/apiPostsRouter';
import apiUsersRouter from './routes/apiUsersRouter';

const app = express();
const PORT = process.env.PORT || 4001;

app.use('/api/comments', apiCommentsRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/posts', apiPostsRouter);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));