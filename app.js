const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');

const db = require('./database.js');
console.log(db);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  if (db.readyState !== 1) {
    res.status(500);
    res.send({code: 500, reason: "Database Not Connected"})
    console.log(db.readyState);
    console.log("Database Not Connected");
  } else {
    next()
  }
})

app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log("404");
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: err.status || 500});
});

module.exports = app;