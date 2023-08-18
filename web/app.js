var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const socketIo = require("socket.io");

const server = require('http').createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use((req, res, next) => {
  req.io = io;
  return next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weightRouter = require('./routes/weight');
var apiRouter = require('./routes/trash_api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/weight', weightRouter);
app.use('/api', apiRouter);

// ----------------- just act like this is the end of file -----------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  // console.log(err)
});

// listen to the port 8080 
// and you should check the ./bin/www file
// it listens to port 3000 as well cause we dont have .env file :)
server.listen(8080, () => console.log(`Server started!`));

module.exports = app;
