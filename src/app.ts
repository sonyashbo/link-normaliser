import express, { Application } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import router from './routes/routes';

export const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.text());

app.use(router);

export default app;
