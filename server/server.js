'use strict';

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

// Global vars
var app = express();
var port = process.env.PORT || 5001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Route app
require('./routes')(app);

app.listen(port, function () {
  console.log('App listening on localhost:' + port);
});