/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _routes = __webpack_require__(4);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Use these to match the url to routes and then render
	var bodyParser = __webpack_require__(9);
	var compression = __webpack_require__(10);
	var express = __webpack_require__(11);
	var favicon = __webpack_require__(12);
	var https = __webpack_require__(13);
	var keys = __webpack_require__(14);
	var nutri = __webpack_require__(15);
	var path = __webpack_require__(17);
	var pem = __webpack_require__(18);

	var app = express();

	// Compression
	app.use(compression());

	// Parser for POST requests to server
	app.use(bodyParser.json());

	// Serve static stuff like index.css from directory 'public'
	app.use(express.static('public'));
	// app.use(express.static(__dirname + '/public/images'))

	// Favicon
	app.use(favicon('public/images/donut.ico'));

	app.post('/nutri', function (req, res) {
	  // testing purposes
	  console.log(req.body);

	  var searchResult = nutri.makePost(req.body.search, keys.key.appKey, keys.key.appId);
	  res.send(searchResult);
	});

	app.get('*', function (req, res) {
	  //res.sendFile(path.resolve(__dirname, 'exampleFB.html'))
	  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
	});

	var PORT = process.env.PORT || 8080;

	// pem module creates credentials on the fly
	// pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
	//   https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(PORT);
	//   console.log('Listening on port ' + PORT);
	// });

	app.listen(PORT);
	console.log('Listening on port ' + PORT);
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	var _App = __webpack_require__(5);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(6);

	var _Home2 = _interopRequireDefault(_Home);

	var _Account = __webpack_require__(8);

	var _Account2 = _interopRequireDefault(_Account);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/my-account', component: _Account2.default })
	); // modules/routes.js

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: "App",
	  render: function render() {
	    return _react2.default.createElement(
	      "div",
	      null,
	      _react2.default.createElement(
	        "h1",
	        null,
	        _react2.default.createElement(
	          "a",
	          { href: "/" },
	          " Carb Counter"
	        )
	      ),
	      this.props.children
	    );
	  }
	}); // modules/App.js

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SearchBar = __webpack_require__(7);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// modules/Home.js
	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_SearchBar2.default, null)
	    );
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'SearchBar',

	  makePost: function makePost() {
	    var enteredStr = document.getElementById('searchText').value;
	    var data = { 'search': enteredStr };

	    var url = 'http://localhost:8080/nutri';

	    $.ajax({
	      url: url,
	      type: 'POST',
	      data: JSON.stringify(data),
	      contentType: "application/json; charset=utf-8",
	      dataType: 'json',
	      success: function success(response) {
	        console.log(response);
	      }
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { id: 'searchDiv' },
	      _react2.default.createElement(
	        'p',
	        null,
	        ' What are you eating? '
	      ),
	      _react2.default.createElement('textarea', { id: 'searchText', placeholder: '1 large egg and 50 grams of raw spinach', cols: '80', rows: '1' }),
	      ' \xA0',
	      _react2.default.createElement(
	        'button',
	        { id: 'searchBtn', className: 'greenOut', onClick: this.makePost },
	        ' Search '
	      )
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createClass({
	   displayName: "exports",

	   render: function render() {
	      return _react2.default.createElement(
	         "div",
	         null,
	         _react2.default.createElement(
	            "p",
	            null,
	            " My Account "
	         ),
	         _react2.default.createElement(
	            "div",
	            { id: "topcorner" },
	            _react2.default.createElement(
	               "a",
	               { href: "/" },
	               "Home"
	            )
	         )
	      );
	   }
	}); // modules/Account.js

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  key: {
	    'appId': 'de5c7861',
	    'appKey': 'cef8bbbab558db96475078af05a797c0'
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var request = __webpack_require__(16);

	module.exports = {

	  makePost: function makePost(foodSearch, appKey, appId) {

	    var printBody = function printBody(body) {
	      var str = '';
	      if (body['foods']) {
	        str += body['foods'].length + ' food items retrieved.';

	        for (var i = 0; i < body['foods'].length; i++) {
	          str += '\n' + body['foods'][i].food_name;

	          str += '\ncalories: ' + body['foods'][i].nf_calories;

	          str += '\nserving weight (grams): ' + body['foods'][i].serving_weight_grams;

	          str += '\ntotal carbs: ' + body['foods'][i].nf_total_carbohydrate;

	          str += '\ntotal protein: ' + body['foods'][i].nf_protein;

	          str += '\ntotal fat: ' + body['foods'][i].nf_total_fat;

	          str += '\n';
	        }
	      } else {
	        str = 'Nothing matched the search: ' + foodSearch;
	      }

	      console.log(str);
	      return str;
	    };

	    var headers = {
	      'x-app-key': appKey,
	      'x-app-id': appId,
	      'Content-Type': 'application/json'
	    };

	    var body = {
	      query: foodSearch
	      // fields: ['item_name','brand_name','nf_calories','nf_sodium','item_type']
	    };

	    var options = {
	      method: 'POST',
	      uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
	      headers: headers,
	      body: body,
	      json: true
	    };

	    var str = '';

	    request(options, function (error, response, body) {
	      if (error === null) {
	        str = printBody(body);
	      } else {
	        console.log('error: ' + error);
	        str = 'error: ' + error;
	      }
	    });

	    return str;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("pem");

/***/ }
/******/ ]);