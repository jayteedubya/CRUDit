import * as express from 'express';
import apiCommentsRouter from './routes/apiCommentsRouter';

const app = express();
const PORT = process.env.PORT || 4001;

app.use('/api/comments', apiCommentsRouter);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));