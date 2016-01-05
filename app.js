var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes');

var mongoose = require('mongoose');
var config = require('./config');
var DBService = require('./data/connectDBService');
DBService(config.database.url, mongoose);

var app = express();

// Logging
app.use(logger('dev'));

// Parses body for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing
//TODO: make error.js file to handle errors
app.use('/', routes);

module.exports = app;
