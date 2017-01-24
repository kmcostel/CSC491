var express = require('express');
var keys = require('./js/keys.js');
var http = require('http');
var request = require('request');
var app = express();

app.use(express.static('js'));

// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

app.get('/', function (req, res) {
  console.log(req);
  res.sendFile( __dirname + "/" + "index.html" );

});

app.get('/search', function(req, res) {
  console.log(req['query']);
  for (var prop in req) {
    console.log("prop = " + prop);
  }
  res.send(makePost(req['query']));
});

app.post('/query', function(req, res) {
  console.log("Got something here!");

  res.send("Hey!");
})

app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
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

// app.get('/process_get', function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.query.first_name,
//       last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// });

var makePost = function(foodSearch) {

  var headers = {
    'x-app-key' : appKey,
    'x-app-id' : appId,
    'Content-Type':'application/json'
  };

  var body = {
    query : foodSearch
  };

  var options = {
    method: 'POST',
    uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
    headers: headers,
    body: body,
    json: true
  };
  var str;

  request(options, function(error, response, body) {
      var str = '';
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
    }
  }
  else {
    console.log("Sorry nothing found :(");
    str = "Sorry nothing found :( ";
  }
  return str;

}

makePost('2 large grade AA eggs and 1 pound of 10% beef');

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("listening at port 3000");

});


