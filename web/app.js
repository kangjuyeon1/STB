var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const url = "mongodb://127.0.0.1:27017/stb";
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(url);
}

const socketIo = require("socket.io");

const server = require('http').createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

let latestSocketData = null;

io.on('connection', (socket) => {
    socket.on('data', (data) => {
        latestSocketData = data; // Store the latest data
    });
    socket.on('getLatestData', () => {
        socket.emit('latestData', latestSocketData);
    });
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var weightRouter = require('./routes/weight');
var apiRouter = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
