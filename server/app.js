const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const cors = require('cors');

//Import the mongoose module
const mongoose = require('mongoose');

const auctionsRouter = require('./routes/auctions');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');
const authRouter = require('./routes/auth');

const app = express();
app.use('/pictures', express.static(path.join(__dirname,'assets', 'images')));

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

//Set up default mongoose connection
//var mongoDB = 'mongodb://localhost/27017/iBid'; 
var mongoDB = 'mongodb+srv://ibid:ibid135@cluster0-g1iny.mongodb.net/iBid?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { 
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true});

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

//app.use('/auctions/:id/comments',commentsRouter);
app.use('/auctions', auctionsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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
