import React from 'react';
import { renderToString } from 'react-dom/server';

// Use these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes';

var nutri = require('./public/js/nutri.js');
console.log(nutri);
var express = require('express');
var path = require('path');
var keys = require('./public/js/keys.js');
var compression = require('compression');
var path = require('path')
var favicon = require('serve-favicon');
var app = express()

// Compression
app.use(compression());

// Parser for POST requests to server
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Serve static stuff like index.css
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public/images'))

// Favicon
app.use(favicon('public/images/favicon.ico'));

app.post('/nutri', (req, res) => {
  console.log(req.body);
  var searchResult = nutri.makePost(req.body.search, keys.key.appKey, keys.key.appId);
  res.send(searchResult);
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Express server running at localhost:' + PORT)
})
