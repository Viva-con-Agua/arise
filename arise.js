var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var arise = express();

// view engine setup
arise.set('views', path.join(__dirname, 'views'));
arise.set('view engine', 'pug');

arise.use(logger('dev'));
arise.use(express.json());
arise.use(express.urlencoded({ extended: false }));
arise.use(cookieParser());
arise.use(express.static(path.join(__dirname, 'public')));

arise.use('/', indexRouter);
arise.use('/users', usersRouter);

// catch 404 and forward to error handler
arise.use(function(req, res, next) {
  next(createError(404));
});

// error handler
arise.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = arise;
