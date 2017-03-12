import React from 'react';
import { renderToString } from 'react-dom/server';

// Use these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './modules/routes';

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const favicon = require('serve-favicon');
const fillResponse = require('./public/js/fillResponse.js');
const https = require('https');
const keys = require('./public/js/keys.js');
const makeOptions = require('./public/js/getOptions.js');
const ml = require('./public/js/ml.js'); // MarkLogic module
const path = require('path');
const pem = require('pem');
const request = require('request');

var app = express();

// Compression
app.use(compression());

// Parser for POST requests to server
app.use(bodyParser.json());

// Serve static stuff like index.css from directory 'public'
app.use(express.static('public'))

// Favicon
app.use(favicon('public/images/donut.ico'));

// Endpoint for POST calls
app.post('/nutri', (req, res) => {
  // Save user's search in their history
  if (req.body.userId != null) {
    ml.update(req.body.userId, req.body.search);
  }
  var options = makeOptions.generate(req.body.search, keys.key.appKey, keys.key.appId);
  var answer = {};
  res.setHeader('Content-Type', 'application/json');

    request(options, function(error, response, body) {
      if (error === null) {
        answer = fillResponse.getResult(body);
        res.send(answer);
      }
      else {
        answer.error = error;
        res.send(answer);
      }
    });
});

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});

var PORT = process.env.PORT || 8080

// pem module creates credentials on the fly
// pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
//   https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(PORT);
//   console.log('Listening on port ' + PORT);
// });

app.listen(PORT);
console.log('Listening on port ' + PORT);

