var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var glob = require('glob');
var config = require('./config.js')
var app = express();
var flash  = require('flash');
var db = require('./models');

app.set('config', config);
app.set('db', db);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'nunjucks');
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app,
    noCache: true
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var cookieLifeTime = new Date((new Date()).getTime() + config.COOKIE_LIFE_TIME_IN_MILISECONDS);
app.use(session({
  secret: config.SESSION.secret,
  store: new redisStore({
    host: config.SESSION.redis.host,
    port: config.SESSION.redis.port,
    ttl: parseInt(config.COOKIE_LIFE_TIME_IN_MILISECONDS / 1000)
  }),
  cookie: {
    expires: cookieLifeTime,
    maxAge: cookieLifeTime
  }
}));
app.use(flash());
var mdHandlers = glob.sync(config.ROOT + '/middleware/*.js');
mdHandlers.forEach(function(mdHandler) {
    require(mdHandler)(app, db);
});

var filterFiles = glob.sync(config.ROOT + '/filters/*.js');
var filters = {};
filterFiles.forEach(function(filterFile) {
    require(filterFile)(filters);
});

app.set('filters', filters);
var helperFiles = glob.sync(config.ROOT + '/helpers/*.js');
var helpers = {};
helperFiles.forEach(function(helperFile) {
    require(helperFile)(helpers);
});

app.set('helpers', helpers);
var routes = glob.sync(config.ROOT + '/routes/*.js');
routes.forEach(function(route) {
  require(route)(app);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
