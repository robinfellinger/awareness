//var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var logger = require('morgan');

//var routes = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

//set port
var debug = require('debug')('awareness');
app.set('port', process.env.PORT || 3001);
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});

// view engine setup
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'html');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

//app.use('/', routes);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  //next(createError(404));
//});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/src/index.js'));
});

app.get('/', function (req, res) {
  console.log("get");
  res.send('Hello World!')
});


app.post('/', function(req, res) {
  console.log("redirect")
  //res.render('client/build/statistics.html');
  app.use(express.static(path.join(__dirname, 'client/build/statistics.html')));

 // res.send(200);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 res.render('error');
});*/

console.log("finished")
module.exports = app;
