var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes');
var mongoose = require('mongoose');
var config = require('./config');
var pkg = require('./package.json');
var MongoStore = require('connect-mongo')(session);

var app = express();

// database setup
mongoose.connect(config.database.url);

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');
app.locals.basedir = path.join(__dirname, 'templates');
app.locals['package'] = pkg;

// Don't log when testing
if (!process.env.TEST)
  app.use(logger('dev'));

// Parses body for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Parses cookies
app.use(cookieParser());

// Show the static directory `public/`
app.use(express['static'](path.join(__dirname, 'public')));

// Save sessions
app.use(session({
	secret: 'bobbobbob',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    touchAfter: 24 * 3600
  })
}));

// Routing
app.use('/', routes);

// Source in dev mode
if (app.get('env') === 'development')
  app.use('/src', express['static'](path.join(__dirname, 'src')));

// catch 404
app.use(function(req, res) {
  res.status(404);
  res.render('notfound', {
    message: 'Not Found',
    url: req.originalUrl
  });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
