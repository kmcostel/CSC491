require('babel-register')({
  presets: ['react']
});

var express = require('express');
var keys = require('./js/keys.js');
var request = require('request');
var app = express();
var bodyParser = require('body-parser');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Component = require('./Component.jsx');


app.use(express.static('js'));
app.use(bodyParser.json());

//app.set('views', __dirname + '/views');


app.get('/', function (req, res) {
  var html = ReactDOMServer.renderToString(
    React.createElement(Component)
  );
  res.send(html);
  //res.sendFile(__dirname, 'index.html');
});

app.get('/search', function(req, res) {
  console.log(req['query']);
  console.log("INSIDE OF SEARCH!");
  for (var prop in req) {
    console.log("prop = " + prop);
  }
  res.send(makePost(req['query']));
});

app.post('/query', function(req, res) {

  console.log("Inside /query post handler: " + req.body.data);
  console.log('body: ' + JSON.stringify(req.body));

  var foodData = makePost(req.body.query)

  res.send(foodData);
})

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404 not founddddd!', { url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

var makePost = function(foodSearch) {

  var headers = {
    'x-app-key' : appKey,
    'x-app-id' : appId,
    'Content-Type':'application/json',
  };

  var body = {
    query : foodSearch
    // fields: ["item_name","brand_name","nf_calories","nf_sodium","item_type"]
  };

  var options = {
    method: 'POST',
    uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: headers,
    body: body,
    json: true
  };
  var str = '';

  request(options, function(error, response, body) {
      if (error === null) {
        str = printBody(body);
      }
      else {
        console.log('error: ' + error);
        str = 'error: ' + error;
      }
    }
  );
  return str;

};

var printBody = function(body) {
  var str = "";
  if (body["foods"]) {
    console.log(body["foods"].length + " food items retrieved.");
    str += body["foods"].length + " food items retrieved."

    for (var i = 0; i < body["foods"].length; i++) {
      console.log(body["foods"][i].food_name);
      str += body["foods"][i].food_name;

      console.log("calories: " + body["foods"][i].nf_calories);
      str += "calories: " + body["foods"][i].nf_calories;

      console.log("serving weight (grams): " + body["foods"][i].serving_weight_grams);
      str += "serving weight (grams): " + body["foods"][i].serving_weight_grams;

      console.log("total carbs: " + body["foods"][i].nf_total_carbohydrate);
      str += "total carbs: " + body["foods"][i].nf_total_carbohydrate;

      console.log("total protein: " + body["foods"][i].nf_protein);
      str +="total protein: " + body["foods"][i].nf_protein

      console.log("total fat: " + body["foods"][i].nf_total_fat);
      str +="total fat: " + body["foods"][i].nf_total_fat;
    }
  }
  else {
    console.log("Sorry nothing found :("); // logs to terminal
    str = "Sorry nothing found :("; // returns to client ajax call
  }
  return str;

}

makePost('100 grams gala apple');

var PORT = 3000;
app.listen(PORT, function() {
  console.log('listening to localhost:' + PORT);
});


