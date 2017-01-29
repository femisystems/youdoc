// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Global vars
const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to Youdoc api! Yippy!!!');
});

app.get('/users', (req, res) => {
  res.send('there are no existing users yet');
});

app.listen(port);
