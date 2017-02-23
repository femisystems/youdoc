// Dependencies
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

// Global vars
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Route app
require('./routes')(app);

app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
