var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes');
var mongoose = require('mongoose');
var config = require('./config');

var app = express();

// database setup
mongoose.connect(config.database.url);

// Logging
app.use(logger('dev'));

// Parses body for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
app.use('/', routes);

module.exports = app;
