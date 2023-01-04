// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { route } from './routes';
import { initDb } from './core/database/init';

initDb();

// Global vars
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Route app
route(app);

export default app;
