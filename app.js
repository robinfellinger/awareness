
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express(); 



// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));


//routing backend
app.use('/', indexRouter);

const port = process.env.PORT || 3001;
app.listen(port);

console.log("server started");
module.exports = app;
