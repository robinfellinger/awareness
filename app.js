
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express(); 

// app.set('port', process.env.PORT || 3001);
// var server = app.listen(app.get('port'), function() {
//  // debug('Express server listening on port ' + server.address().port);
// });

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));


//routing backend
app.use('/', indexRouter);

const port = process.env.PORT || 5001;
app.listen(port);
console.log("server started");
module.exports = app;
