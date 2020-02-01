var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var helmet = require('helmet');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use("*", (req, res, next) =>
{
  res.result = function(status, data) {
    return res.status(status || 200).json({data: data});
  };
  res.error = function(status, code, message){
    return next({ status: status, code: code, message: message})
  };
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



process.env.NODE_ENV = 'development';
const config = require('./config/config.js');
app.get('/', (req, res) => {
  res.json(global.gConfig);
});


//Config call test
console.log("global.gConfig.node_port : ",global.gConfig.node_port)




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
  res.status(err.status || 500).json({
    error:
        {code: err.code || -1, message: err.message || 'unexpected error has been occurred!'}
  });
});
app.listen(global.gConfig.node_port, function () {
  console.log("Running RestHub on port " + global.gConfig.node_port);
});
module.exports = app;
