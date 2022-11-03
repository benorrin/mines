var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');

/*
*  Controller Imports
*/

var database = require('./controllers/database.js');
var auth = require('./controllers/auth.js');


/*
*  Route Imports
*/

var indexRouter = require('./routes/index.js');
var registerRouter = require('./routes/register.js');
var loginRouter = require('./routes/login.js');
var userRouter = require('./routes/user.js');


var app = express();


/*
*  Passport
*/

app.use(session({
  secret: 'em*LE#z#qYz#G%HactjPBNW@*9T88FgV3NW%X^YMmuwWhpcMuhUBWYKs^awVTsKa',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
  })
)
app.use(passport.initialize())
app.use(passport.session())


/*
*  App Declarations
*/

app.use(cors());
app.options('*', cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*
*  View Engine
*/

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/*
* Preflight Declarations
*/

app.options('/register', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
app.options('/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});


/*
*  Route Declarations
*/

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/user', passport.authenticate('jwt'), userRouter);


/*
*  404 Handler
*/

app.use(function(req, res, next) {
  next(createError(404));
});


/*
*  Error Handler
*/

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

module.exports = app;
