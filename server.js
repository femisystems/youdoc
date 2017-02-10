// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Global vars
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Route app
require('./server/routes')(app);

app.listen(port, () => {
  console.log(`App listening on localhost:${port}`);
});
