require('babel-register')({
  presets: ['react']
});

var express = require('express');
var keys = require('./public/js/keys.js');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');

//serve all files in public directory
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(require('./routes/index.jsx'));

var PORT = 3000;

app.listen(PORT, function() {
  console.log('listening to localhost:' + PORT);
});

