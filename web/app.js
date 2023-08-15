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

// Okay, so disclaimer first.
// there's so many issues with separating routing files
// with socket.io features in it, so just make it one file only for now.
// app.post('/weight/data', (req, res) => {
//   const sensorValue = req.body.sensor_value;
//   console.log(`\nReceived sensor value: ${sensorValue}`);
//   io.emit('monitoring', { value: 10 })
//
//   res.status(200).send({ sensor_value: sensorValue });
// });

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
});

server.listen(8080, () => console.log(`Server started!`));

module.exports = app;
