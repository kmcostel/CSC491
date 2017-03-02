import React from 'react';
import { renderToString } from 'react-dom/server';

// Use these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes';

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const https = require('https');
const keys = require('./public/js/keys.js');
const nutri = require('./public/js/nutri.js');
const path = require('path');
const pem = require('pem');

var app = express();

// Compression
app.use(compression());

// Parser for POST requests to server
app.use(bodyParser.json());

// Serve static stuff like index.css from directory 'public'
app.use(express.static('public'))
// app.use(express.static(__dirname + '/public/images'))

// Favicon
app.use(favicon('public/images/donut.ico'));

app.post('/nutri', (req, res) => {
  // testing purposes
  console.log(req.body);

  var searchResult = nutri.makePost(req.body.search, keys.key.appKey, keys.key.appId);
  res.send(searchResult);
})

app.get('*', (req, res) => {
  //res.sendFile(path.resolve(__dirname, 'exampleFB.html'))
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080

// pem module creates credentials on the fly
// pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
//   https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(PORT);
//   console.log('Listening on port ' + PORT);
// });

app.listen(PORT);
console.log('Listening on port ' + PORT);


