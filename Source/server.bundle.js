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
	var bodyParser = __webpack_require__(11);
	var compression = __webpack_require__(12);
	var express = __webpack_require__(13);
	var favicon = __webpack_require__(14);
	var fillResponse = __webpack_require__(15);
	var https = __webpack_require__(16);
	var keys = __webpack_require__(17);
	var makeOptions = __webpack_require__(18);
	var ml = __webpack_require__(19); // MarkLogic module
	var path = __webpack_require__(22);
	var pem = __webpack_require__(23);
	var request = __webpack_require__(24);

	var app = express();

	// Compression
	app.use(compression());

	// Parser for POST requests to server
	app.use(bodyParser.json());

	// Serve static stuff like index.css from directory 'public'
	app.use(express.static('public'));

	// Favicon
	app.use(favicon('public/images/donut.ico'));

	// Endpoint for POST calls
	app.post('/nutri', function (req, res) {
	   // Save user's search in their history
	   if (req.body.user != null) {
	      ml.update(req.body.user, req.body.search);
	   }
	   var options = makeOptions.generate(req.body.search, keys.key.appKey, keys.key.appId);
	   var answer = {};
	   res.setHeader('Content-Type', 'application/json');

	   request(options, function (error, response, body) {
	      if (error === null) {
	         answer = fillResponse.getResult(body);
	         res.send(answer);
	      } else {
	         answer.error = error;
	         res.send(answer);
	      }
	   });
	});

	app.get('*', function (req, res) {
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// modules/routes.js
	module.exports = _react2.default.createElement(
	   _reactRouter.Route,
	   { path: '/', component: _App2.default },
	   _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default })
	);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/App.js


	var App = function (_React$Component) {
	   _inherits(App, _React$Component);

	   function App() {
	      _classCallCheck(this, App);

	      return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	   }

	   _createClass(App, [{
	      key: "render",
	      value: function render() {
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
	   }]);

	   return App;
	}(_react2.default.Component);

	exports.default = App;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SearchBar = __webpack_require__(7);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	var _FacebookButton = __webpack_require__(10);

	var _FacebookButton2 = _interopRequireDefault(_FacebookButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/Home.js


	var Home = function (_React$Component) {
	   _inherits(Home, _React$Component);

	   function Home() {
	      _classCallCheck(this, Home);

	      return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
	   }

	   _createClass(Home, [{
	      key: 'render',
	      value: function render() {
	         return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(_FacebookButton2.default, { fb: window.FB })
	         );
	      }
	   }]);

	   return Home;
	}(_react2.default.Component);

	exports.default = Home;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Results = __webpack_require__(8);

	var _Results2 = _interopRequireDefault(_Results);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //modules/SearchBar.js


	var SearchBar = function (_React$Component) {
	   _inherits(SearchBar, _React$Component);

	   function SearchBar(props) {
	      _classCallCheck(this, SearchBar);

	      var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

	      _this.updateState = _this.updateState.bind(_this);
	      _this.getFoodInfo = _this.getFoodInfo.bind(_this);
	      _this.state = { items: [], user: props.user };
	      return _this;
	   }

	   _createClass(SearchBar, [{
	      key: 'updateState',
	      value: function updateState(response) {
	         this.setState({
	            items: response.items
	         });
	      }
	   }, {
	      key: 'componentWillReceiveProps',
	      value: function componentWillReceiveProps(nextProps) {
	         this.setState({ user: nextProps.user });
	      }
	   }, {
	      key: 'getFoodInfo',
	      value: function getFoodInfo(callback) {
	         var enteredStr = document.getElementById('searchText').value;

	         var data = { search: enteredStr, user: this.state.user };

	         $.ajax({
	            url: 'http://localhost:8080/nutri',
	            type: 'POST',
	            data: JSON.stringify(data),
	            contentType: 'application/json; charset=utf-8',
	            dataType: 'json',
	            success: function success(response) {
	               callback(response);
	            }
	         });
	      }
	   }, {
	      key: 'render',
	      value: function render() {
	         var _this2 = this;

	         return _react2.default.createElement(
	            'div',
	            { id: 'searchDiv' },
	            _react2.default.createElement(
	               'p',
	               null,
	               ' What are you eating? '
	            ),
	            _react2.default.createElement('textarea', { id: 'searchText', placeholder: this.props.placeholder, cols: '80', rows: '1' }),
	            ' \xA0',
	            _react2.default.createElement(
	               'button',
	               { id: 'searchBtn', className: 'greenOut', onClick: function onClick() {
	                     return _this2.getFoodInfo(_this2.updateState);
	                  } },
	               ' Search '
	            ),
	            _react2.default.createElement(_Results2.default, { items: this.state.items })
	         );
	      }
	   }]);

	   return SearchBar;
	}(_react2.default.Component);

	exports.default = SearchBar;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Results.js


	var BarChart = __webpack_require__(9).Bar;

	var Results = function (_React$Component) {
	  _inherits(Results, _React$Component);

	  function Results(props) {
	    _classCallCheck(this, Results);

	    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	  }

	  _createClass(Results, [{
	    key: "render",
	    value: function render() {
	      var foodList = [];
	      var foods = this.props.items.map(function (food, i) {
	        var thisFood = [];
	        thisFood.push(food.carbs);
	        thisFood.push(food.fat);
	        thisFood.push(food.sugar);
	        foodList.push(thisFood);

	        return _react2.default.createElement(
	          "div",
	          { key: i },
	          _react2.default.createElement(
	            "p",
	            null,
	            " ",
	            food.grams,
	            " grams of ",
	            food.name,
	            " "
	          ),
	          _react2.default.createElement(
	            "p",
	            null,
	            " Fat = ",
	            food.fat,
	            " grams "
	          ),
	          _react2.default.createElement(
	            "p",
	            null,
	            " Carbs = ",
	            food.carbs,
	            " grams "
	          ),
	          _react2.default.createElement(
	            "p",
	            null,
	            " Sugar = ",
	            food.sugar,
	            " grams "
	          )
	        );
	      });

	      var chartData = {
	        labels: ["Carbs", "Fats", "Sugar"],
	        datasets: [{
	          label: "Recommended daily value",
	          fillColor: "#000000",
	          strokeColor: "#000000",
	          pointColor: "rgba(220,220,220,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(220,220,220,1)",
	          data: [200, 80, 35]
	        }, {
	          label: "This search's values",
	          fillColor: "#bfbfbf",
	          strokeColor: "#3ae64b",
	          pointColor: "rgba(151,187,205,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(151,187,205,1)",
	          data: foodList[0]
	        }]
	      };

	      var chartOptions = {};
	      var barChart = null;
	      if (this.props.items.length > 0) {
	        barChart = _react2.default.createElement(BarChart, { data: chartData, options: chartOptions, width: "380", height: "275" });
	      }

	      return _react2.default.createElement(
	        "div",
	        null,
	        foods,
	        barChart
	      );
	    }
	  }]);

	  return Results;
	}(_react2.default.Component);

	exports.default = Results;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-chartjs");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _SearchBar = __webpack_require__(7);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //modules/FacebookButton.js


	var FacebookButton = function (_React$Component) {
	   _inherits(FacebookButton, _React$Component);

	   function FacebookButton(props) {
	      _classCallCheck(this, FacebookButton);

	      var _this = _possibleConstructorReturn(this, (FacebookButton.__proto__ || Object.getPrototypeOf(FacebookButton)).call(this, props));

	      _this.componentDidMount = _this.componentDidMount.bind(_this);
	      _this.testAPI = _this.testAPI.bind(_this);
	      _this.state = { user: null };
	      return _this;
	   }

	   _createClass(FacebookButton, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	         window.fbAsyncInit = function () {
	            FB.init({
	               appId: '375078696202555',
	               cookie: true,
	               xfbml: true,
	               version: 'v2.8'
	            });

	            FB.getLoginStatus(function (response) {
	               FB.Event.subscribe('auth.login', this.onLogin.bind(this));
	               FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
	               this.statusChangeCallback(response);
	            }.bind(this));
	         }.bind(this);

	         // Load the SDK asynchronously
	         (function (d, s, id) {
	            var js,
	                fjs = d.getElementsByTagName(s)[0];
	            if (d.getElementById(id)) return;
	            js = d.createElement(s);js.id = id;
	            js.src = "//connect.facebook.net/en_US/sdk.js";
	            fjs.parentNode.insertBefore(js, fjs);
	         })(document, 'script', 'facebook-jssdk');
	      }

	      // Here we run a very simple test of the Graph API after login is
	      // successful.  See statusChangeCallback() for when this call is made.

	   }, {
	      key: 'testAPI',
	      value: function testAPI() {
	         var self = this;
	         FB.api('/me', function (response) {
	            self.setState({ user: response.id });
	         });
	      }

	      // This is called with the results from FB.getLoginStatus().

	   }, {
	      key: 'statusChangeCallback',
	      value: function statusChangeCallback(response) {
	         if (response.status === 'connected') {
	            this.testAPI();
	         } else if (response.status === 'not_authorized') {
	            // The person is logged into Facebook, but not your app.
	         } else {
	               // The person is not logged into Facebook, so we're not sure if
	               // they are logged into this app or not.
	            }
	      }

	      // This function is called when someone finishes with the Login
	      // Button.  See the onlogin handler attached to it in the sample
	      // code below.

	   }, {
	      key: 'checkLoginState',
	      value: function checkLoginState() {
	         FB.getLoginStatus(function (response) {
	            this.statusChangeCallback(response);
	         }.bind(this));
	      }
	   }, {
	      key: 'handleClick',
	      value: function handleClick() {
	         FB.login(checkLoginState());
	      }
	   }, {
	      key: 'onLogin',
	      value: function onLogin(response) {
	         if (response.status === 'connected') {
	            this.setState({ user: response.authResponse.userID });
	         }
	      }
	   }, {
	      key: 'onLogout',
	      value: function onLogout(response) {
	         this.setState({
	            user: null
	         });
	      }
	   }, {
	      key: 'render',
	      value: function render() {
	         return _react2.default.createElement(
	            'div',
	            { height: '1500' },
	            _react2.default.createElement(
	               'div',
	               { className: 'topCorner' },
	               _react2.default.createElement('div', {
	                  className: 'fb-login-button',
	                  'data-max-rows': '1',
	                  'data-size': 'large',
	                  'data-show-faces': 'false',
	                  'data-auto-logout-link': 'true'
	               })
	            ),
	            _react2.default.createElement(_SearchBar2.default, { user: this.state.user, placeholder: '50 grams of raw spinach and 1 cup of pineapple' })
	         );
	      }
	   }]);

	   return FacebookButton;
	}(_react2.default.Component);

	exports.default = FacebookButton;
	;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	//public/js/fillResponse.js
	module.exports = {
	   getResult: function getResult(body) {
	      var response = {};
	      var curItem;

	      if (body['foods']) {
	         response.numItems = body['foods'].length;
	         response.items = [];

	         for (var i = 0; i < body['foods'].length; i++) {
	            curItem = {};

	            curItem.name = body['foods'][i].food_name;
	            curItem.calories = body['foods'][i].nf_calories;
	            curItem.grams = body['foods'][i].serving_weight_grams;
	            curItem.carbs = body['foods'][i].nf_total_carbohydrate;
	            curItem.protein = body['foods'][i].nf_protein;
	            curItem.fat = body['foods'][i].nf_total_fat;
	            curItem.sugar = body['foods'][i].nf_sugars;
	            curItem.fiber = body['foods'][i].nf_dietary_fiber;
	            curItem.quantity = body['foods'][i].quantity;

	            response.items.push(curItem);
	         }
	      } else {
	         response.error = 'Nothing matched the search';
	      }

	      return response;
	   }
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	   key: {
	      'appId': 'de5c7861',
	      'appKey': 'cef8bbbab558db96475078af05a797c0'
	   }
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	//public/js/getOptions.js
	module.exports = {

	   generate: function generate(foodSearch, appKey, appId) {

	      var headers = {
	         'x-app-key': appKey,
	         'x-app-id': appId,
	         'Content-Type': 'application/json'
	      };

	      var body = {
	         query: foodSearch
	      };

	      var options = {
	         method: 'POST',
	         uri: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
	         headers: headers,
	         body: body,
	         json: true
	      };

	      return options;
	   }
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// public/js/ml.js
	module.exports = {
	   update: function update(userId, searchStr) {
	      var marklogic = __webpack_require__(20);
	      var my = __webpack_require__(21);
	      var db = marklogic.createDatabaseClient(my.connInfo);
	      var qb = marklogic.queryBuilder;
	      var pb = marklogic.patchBuilder;

	      console.log('Updating user ' + userId + ' with ' + searchStr);
	      db.documents.read('/user/' + userId + '.json').result(function (documents) {
	         // Use documents.write() if a user doesn't exist in the database.
	         // Otherwise use the documents.patch() function to update their search history
	         if (documents.length == 0) writeUser();else updateUser();
	      }, function (error) {
	         console.log(JSON.stringify(error, null, 2));
	      });

	      var writeUser = function writeUser() {
	         db.documents.write({ uri: '/user/' + userId + '.json',
	            contentType: 'application/json',
	            content: { searches: [searchStr] }
	         }).result(null, function (error) {
	            console.log(JSON.stringify(error));
	         });
	      };

	      // Insert the search string into the user's search history using patch operation
	      // Patch operation can update a document in the database
	      var updateUser = function updateUser() {
	         db.documents.patch('/user/' + userId + '.json', pb.insert('/array-node("searches")', 'last-child', searchStr));
	      };
	   }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("marklogic");

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  connInfo: {
	    host: 'localhost',
	    port: 8000,
	    user: 'admin',
	    password: 'admin'
	  }
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("pem");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ }
/******/ ]);