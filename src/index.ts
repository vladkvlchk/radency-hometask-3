import express from 'express';
import routes from './routes/index';

const app = express();
const port = 4444;

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})