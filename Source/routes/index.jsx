var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var MainComponent = require('../Index.jsx');
var LoginComponent = require('../Login.jsx')
var ReactRouter = require('react-router')
var keys = require('../public/js/keys.js');
var request = require('request');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var makePost = function(foodSearch, appKey, appId) {
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

router.get('/', function (req, res) {
  var props = {title: 'Universal React'};
  ReactRouter.match({
    routes: (
      <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path='/' component={require('../Index.jsx')}> </ReactRouter.Route>
      </ReactRouter.Router>
    ),
    location: req.url
  }, function(error, redirectLocation, renderProps) {
      if (renderProps) {
        var html = ReactDOMServer.renderToString(
          <ReactRouter.RouterContext {...renderProps} />
        );
        res.send(html);
      } else {
        res.status(404).send('404 - Not Found!');
      }
  });
});

router.get('/login', function (req, res) {
  var props = {title: 'Universal React'};
  ReactRouter.match({
    routes: (
      <ReactRouter.Router>
        <ReactRouter.Route path='/login' component={require('../Login.jsx')}> </ReactRouter.Route>
      </ReactRouter.Router>
    ),
    location: req.url
  }, function(error, redirectLocation, renderProps) {
      if (renderProps) {
        var html = ReactDOMServer.renderToString(
          <ReactRouter.RouterContext {...renderProps} />
        );
        res.send(html);
      } else {
        res.status(404).send('404 - Not Found!');
      }
  });
});

router.post('/nutri', function (req, res) {
  console.log(JSON.stringify(req.body)); //Empty ???
  res.json({ "message": "yeah!" });
});

module.exports = router;

