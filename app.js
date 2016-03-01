var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var routes = require('./routes/index');
var user = require('./routes/user');
var passport = require('passport');
// This will configure Passport to use Auth0
var strategy = require('./setup-passport');

var app = express();
// Connect to database
mongoose.connect('mongodb://localhost/realracing');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Database connected.');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'KvEPSZXwQLpY2BJWc-myoJpv0Qv6yx1BUKPupR7gYT_0_Jkoo73xJGtiwmCzKlpy', resave: false,  saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
// Auth0 middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/user', user);

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/logerror' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
