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
	var bodyParser = __webpack_require__(14);
	var compression = __webpack_require__(15);
	var express = __webpack_require__(16);
	var favicon = __webpack_require__(17);
	var fillResponse = __webpack_require__(18);
	var https = __webpack_require__(19);
	var keys = __webpack_require__(20);
	var makeOptions = __webpack_require__(21);
	var ml = __webpack_require__(22); // MarkLogic module
	var path = __webpack_require__(25);
	var pem = __webpack_require__(26);
	var request = __webpack_require__(27);

	var app = express();

	// Compression
	app.use(compression());

	// Parser for POST requests to server
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

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

	// Check if the user exists
	app.post('/signin', function (req, res) {
	   //  console.log('signing in');
	   ml.checkUser(req.body.user);
	});

	app.post('/userInfo', function (req, res) {
	   res.setHeader('Content-Type', 'application/json');
	   var searches = {};
	   if (req.body.user != null) {
	      //getSearches sends the search data found back to the client
	      ml.getUserInfo(req.body.user, res);
	   }
	});

	app.post('/saveDems', function (req, res) {
	   res.setHeader('Content-Type', 'application/json');
	   if (req.body.user != null) {
	      // TODO: Create ml function to save the user's entered demographic info
	      ml.saveDems(req.body);
	      res.send({ success: 'success' });
	   } else {
	      //res.send({'results': 'none, server error?'});
	   }
	});

	app.get('*', function (req, res) {
	   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
	});

	var PORT = process.env.PORT || 8080;

	/* pem module creates credentials on the fly
	 pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
	   https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(PORT);
	   console.log('Listening on port ' + PORT);
	 }); */

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

	var _Account = __webpack_require__(11);

	var _Account2 = _interopRequireDefault(_Account);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	   _reactRouter.Route,
	   { path: '/', component: _App2.default },
	   _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	   _react2.default.createElement(_reactRouter.Route, { path: '/account', component: _Account2.default })
	); // modules/routes.js

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

	var _FacebookButton = __webpack_require__(7);

	var _FacebookButton2 = _interopRequireDefault(_FacebookButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/Home.js

	//import SearchBar from './SearchBar'


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
	            _react2.default.createElement(_FacebookButton2.default, null)
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

	var _SearchBar = __webpack_require__(8);

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
	      _this.state = { user: null, loggedIn: false };
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
	               var data = { user: response.authResponse.userID };
	               FB.Event.subscribe('auth.login', this.onLogin.bind(this));
	               FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
	               this.statusChangeCallback(response);

	               $.ajax({
	                  url: 'http://localhost:8080/signin',
	                  type: 'POST',
	                  data: JSON.stringify(data),
	                  contentType: 'application/json; charset=utf-8',
	                  dataType: 'json',
	                  success: function success(response) {
	                     console.log('success sign in from module/facebook');
	                  }
	               });
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
	            self.setState({ loggedIn: true });
	         });
	      }

	      // This is called with the results from FB.getLoginStatus().

	   }, {
	      key: 'statusChangeCallback',
	      value: function statusChangeCallback(response) {
	         var data = { user: response.authResponse.userID };
	         if (response.status === 'connected') {
	            this.testAPI();
	            // ensures the user has an account for them in the database
	            $.ajax({
	               url: 'http://localhost:8080/signin',
	               type: 'POST',
	               data: JSON.stringify(data),
	               contentType: 'application/json; charset=utf-8',
	               dataType: 'json',
	               success: function success(response) {
	                  console.log('success sign in from module/facebook');
	               }
	            });
	         } else if (response.status === 'not_authorized') {
	            // The person is logged into Facebook, but not your app.
	         } else {
	               // The person is not logged into Facebook, so we're not sure if
	               // they are logged into this app or not.
	            }
	      }
	   }, {
	      key: 'onLogin',
	      value: function onLogin(response) {
	         if (response.status === 'connected') {
	            var data = { user: response.authResponse.userID };
	            this.setState({ user: response.authResponse.userID });
	            this.setState({ loggedIn: true });
	            /*     $.ajax({
	                    url: 'http://localhost:8080/signin',
	                    type: 'POST',
	                    data: JSON.stringify(data),
	                    contentType: 'application/json; charset=utf-8',
	                    dataType: 'json',
	                    success: function(response){
	                       console.log('success sign in from module/facebook');
	                    }
	                 }); 
	                 */
	         }
	      }
	   }, {
	      key: 'onLogout',
	      value: function onLogout(response) {
	         this.setState({
	            user: null
	         });
	         this.setState({
	            loggedIn: false
	         });
	      }
	   }, {
	      key: 'render',
	      value: function render() {
	         return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	               'div',
	               { className: 'topCorner' },
	               this.state.loggedIn && _react2.default.createElement(
	                  'a',
	                  { className: 'account', href: '/account' },
	                  'Account ',
	                  '  '
	               ),
	               _react2.default.createElement('div', {
	                  className: 'fb-login-button',
	                  'data-max-rows': '1',
	                  'data-size': 'large',
	                  'data-show-faces': 'false',
	                  'data-auto-logout-link': 'true'
	               })
	            ),
	            _react2.default.createElement(_SearchBar2.default, { user: this.state.user, placeholder: '50 grams of cooked spinach and 1 cup of pineapple' })
	         );
	      }
	   }]);

	   return FacebookButton;
	}(_react2.default.Component);

	exports.default = FacebookButton;
	;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Results = __webpack_require__(9);

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
	      _this.componentDidMount = _this.componentDidMount.bind(_this);
	      _this.getFoodInfo = _this.getFoodInfo.bind(_this);
	      _this.state = { items: [], user: props.user };
	      return _this;
	   }

	   _createClass(SearchBar, [{
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	         var str = location.search.split('search=')[1];
	         // translates %20 back into space
	         var search = decodeURI(str);
	         if (search != 'undefined') {
	            $('textarea#searchText').val(search);
	            this.getFoodInfo(this.updateState);
	         }
	      }
	   }, {
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

	         if (enteredStr != '') {
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
	      }
	   }, {
	      key: 'render',
	      value: function render() {
	         var _this2 = this;

	         return _react2.default.createElement(
	            'div',
	            { id: 'searchDv' },
	            _react2.default.createElement(
	               'p',
	               null,
	               ' What are you eating? '
	            ),
	            _react2.default.createElement(
	               'div',
	               { id: 'searchDiv' },
	               _react2.default.createElement('textarea', { id: 'searchText', placeholder: this.props.placeholder, cols: '80', rows: '1' }),
	               ' ',
	               ' ',
	               _react2.default.createElement(
	                  'button',
	                  { id: 'searchBtn', className: 'greenOut', onClick: function onClick() {
	                        return _this2.getFoodInfo(_this2.updateState);
	                     } },
	                  ' Search '
	               )
	            ),
	            _react2.default.createElement(_Results2.default, { items: this.state.items })
	         );
	      }
	   }]);

	   return SearchBar;
	}(_react2.default.Component);

	exports.default = SearchBar;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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


	var BarChart = __webpack_require__(10).Bar;
	//var Chart = require('chart.js');

	var Results = function (_React$Component) {
	  _inherits(Results, _React$Component);

	  function Results(props) {
	    _classCallCheck(this, Results);

	    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	  }

	  _createClass(Results, [{
	    key: 'render',
	    value: function render() {

	      var foodList = [];
	      var foods = this.props.items.map(function (food, i) {
	        foodList.push(food);

	        return _react2.default.createElement(
	          'div',
	          { key: i },
	          _react2.default.createElement(
	            'p',
	            null,
	            ' ',
	            food.grams,
	            ' grams of ',
	            food.name,
	            ' '
	          )
	        );
	      });

	      var chartOptions = {
	        tooltips: {
	          enabled: false
	        },
	        stacked: true
	      };

	      var barChart = null;
	      var fats = 0;
	      var protein = 0;
	      var sugar = 0;
	      var carbs = 0;
	      var name = "";

	      // can't stack bars, can't have a variable number of food items on the chart it seems like
	      // once the chart is drawn, it can't change the number of bars it has. But it can resize them
	      // Seems like stacked bars might work so continue checking into that
	      // Need to be able to call the chart's update() method to redraw it with new data and options

	      var chartData = {
	        labels: ["Carbs", "Fats", "Protein", "Sugar"],
	        datasets: [{
	          label: "Recommended daily value",
	          fillColor: "#000000",
	          strokeColor: "#000000",
	          pointColor: "rgba(220,220,220,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(220,220,220,1)",
	          data: [300, 65, 50, 30]
	        }]
	      };

	      for (var i = 0; i < foodList.length; i++) {
	        chartData.datasets.push({
	          label: foodList[i].name,
	          fillColor: '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6),
	          strokeColor: "#3ae64b",
	          pointColor: "rgba(151,187,205,1)",
	          pointStrokeColor: "#fff",
	          pointHighlightFill: "#fff",
	          pointHighlightStroke: "rgba(151,187,205,1)",
	          data: [foodList[i].carbs, foodList[i].fat, foodList[i].protein, foodList[i].sugar]
	        });
	      };

	      if (this.props.items.length > 0) {
	        barChart = _react2.default.createElement(BarChart, { data: chartData, options: chartOptions, redraw: true, width: '650', height: '325' });
	      }

	      return _react2.default.createElement(
	        'div',
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
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-chartjs");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	   value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Demographics = __webpack_require__(12);

	var _Demographics2 = _interopRequireDefault(_Demographics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/Account.js


	var Account = function (_React$Component) {
	   _inherits(Account, _React$Component);

	   function Account(props) {
	      _classCallCheck(this, Account);

	      var _this = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this, props));

	      _this.state = { fb: _this.props.fb };
	      return _this;
	   }

	   _createClass(Account, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {}
	   }, {
	      key: 'render',
	      value: function render() {
	         return _react2.default.createElement(
	            'div',
	            null,
	            _react2.default.createElement(
	               'div',
	               { className: 'topCorner' },
	               _react2.default.createElement(
	                  'a',
	                  { className: 'account', href: '/' },
	                  'Home'
	               )
	            ),
	            _react2.default.createElement(
	               'p',
	               null,
	               'Past Searches'
	            ),
	            _react2.default.createElement(_Demographics2.default, null)
	         );
	      }
	   }]);

	   return Account;
	}(_react2.default.Component);

	exports.default = Account;
	;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Searches = __webpack_require__(13);

	var _Searches2 = _interopRequireDefault(_Searches);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/Demographics.js


	var BarChart = __webpack_require__(10).Bar;

	var Demographics = function (_React$Component) {
	  _inherits(Demographics, _React$Component);

	  function Demographics(props) {
	    _classCallCheck(this, Demographics);

	    var _this = _possibleConstructorReturn(this, (Demographics.__proto__ || Object.getPrototypeOf(Demographics)).call(this, props));

	    _this.componentDidMount = _this.componentDidMount.bind(_this);
	    _this.testAPI = _this.testAPI.bind(_this);
	    _this.state = { searches: [], age: '', height: '', weight: '', insulin: '' };
	    return _this;
	  }

	  _createClass(Demographics, [{
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
	          this.testAPI();
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
	        var data = { user: response.id };
	        self.setState({ user: response.id });
	        self.setState({ loggedIn: true });
	        // Find a user's info
	        $.ajax({
	          url: 'http://localhost:8080/userInfo',
	          type: 'POST',
	          data: JSON.stringify({ user: response.id }),
	          contentType: 'application/json; charset=utf-8',
	          dataType: 'json',
	          success: function success(response) {
	            self.setState({ searches: response.userInfo.searches });
	            self.setState({ age: response.userInfo.demographics.age });
	            self.setState({ height: response.userInfo.demographics.height });
	            self.setState({ weight: response.userInfo.demographics.weight });
	            self.setState({ insulin: response.userInfo.demographics.insulin });
	          }
	        });
	      });
	    }
	  }, {
	    key: 'saveDems',
	    value: function saveDems() {
	      var self = this;
	      // if user didn't enter anything, then use the value already in the database, stored in the state.
	      var age = $('#ageInput').val();
	      if (age == '') age = this.state.age;
	      var height = $('#heightInput').val();
	      if (height == '') height = this.state.height;
	      var weight = $('#weightInput').val();
	      if (weight == '') weight = this.state.weight;
	      var insulin = $('#insulinInput').val();
	      if (insulin == '') insulin = this.state.insulin;

	      var user = this.state.user;
	      var data = { age: age, height: height, weight: weight, insulin: insulin, user: user };
	      console.log(data);

	      $.ajax({
	        url: 'http://localhost:8080/saveDems',
	        type: 'POST',
	        data: JSON.stringify(data),
	        contentType: 'application/json; charset=utf-8',
	        dataType: 'json',
	        success: function success(response) {
	          self.setState({ age: age });
	          self.setState({ height: height });
	          self.setState({ weight: weight });
	          self.setState({ insulin: insulin });
	          // remove values from inputs, placeholders will be updated with current values
	          $('#ageInput').val('');
	          $('#heightInput').val('');
	          $('#weightInput').val('');
	          $('#insulinInput').val('');
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      return (
	        // if not signed in, send back an unauthorized error
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(_Searches2.default, { searches: this.state.searches }),
	          _react2.default.createElement('br', null),
	          _react2.default.createElement(
	            'div',
	            { id: 'personalInfoContainter' },
	            _react2.default.createElement(
	              'div',
	              { id: 'personalInfo' },
	              'Age: \xA0',
	              _react2.default.createElement('input', { id: 'ageInput', type: 'number', placeholder: this.state.age, name: 'age' }),
	              ' years',
	              _react2.default.createElement('br', null),
	              'Height: \xA0',
	              _react2.default.createElement('input', { id: 'heightInput', type: 'number', placeholder: this.state.height, name: 'height' }),
	              ' inches',
	              _react2.default.createElement('br', null),
	              'Weight: \xA0',
	              _react2.default.createElement('input', { id: 'weightInput', type: 'number', placeholder: this.state.weight, name: 'weight' }),
	              ' \xA0 lbs.',
	              _react2.default.createElement('br', null),
	              'Carbs-Insulin ratio (grams/unit): \xA0',
	              _react2.default.createElement('input', { id: 'insulinInput', type: 'number', placeholder: this.state.insulin, name: 'ratio' }),
	              ' \xA0'
	            ),
	            _react2.default.createElement(
	              'div',
	              null,
	              _react2.default.createElement(
	                'button',
	                { id: 'saveButton', className: 'greenOut', onClick: function onClick() {
	                    return _this2.saveDems();
	                  } },
	                ' Save '
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Demographics;
	}(_react2.default.Component);

	exports.default = Demographics;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // modules/Searches.js


	var Searches = function (_React$Component) {
	  _inherits(Searches, _React$Component);

	  function Searches(props) {
	    _classCallCheck(this, Searches);

	    var _this = _possibleConstructorReturn(this, (Searches.__proto__ || Object.getPrototypeOf(Searches)).call(this, props));

	    _this.state = { searches: _this.props.searches };
	    _this.componentWillReceiveProps = _this.componentWillReceiveProps.bind(_this);
	    return _this;
	  }

	  _createClass(Searches, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      this.setState({ searches: nextProps.searches.reverse() });
	    }
	  }, {
	    key: 'buildLink',
	    value: function buildLink(search) {
	      return '/?search=' + search.search;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var self = this;
	      var searches = this.state.searches.map(function (search, i) {
	        return _react2.default.createElement(
	          'li',
	          { key: i },
	          ' ',
	          _react2.default.createElement(
	            'a',
	            { className: 'list', href: self.buildLink({ search: search }) },
	            ' ',
	            search,
	            ' '
	          ),
	          ' '
	        );
	      });
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'ul',
	          null,
	          ' ',
	          searches,
	          ' '
	        )
	      );
	    }
	  }]);

	  return Searches;
	}(_react2.default.Component);

	exports.default = Searches;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 18 */
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
/* 19 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	   key: {
	      'appId': 'de5c7861',
	      'appKey': 'cef8bbbab558db96475078af05a797c0'
	   }
	};

/***/ },
/* 21 */
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
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// public/js/ml.js
	module.exports = {
	   update: function update(userId, searchStr) {
	      var marklogic = __webpack_require__(23);
	      var my = __webpack_require__(24);
	      var db = marklogic.createDatabaseClient(my.connInfo);
	      var qb = marklogic.queryBuilder;
	      var pb = marklogic.patchBuilder;

	      db.documents.read('/user/' + userId + '.json').result(function (documents) {
	         // Use documents.write() if a user doesn't exist in the database.
	         // Otherwise use the documents.patch() function to update their search history
	         if (documents.length == 0) writeUser(searchStr);else if (!documents[0].content.searches.includes(searchStr)) {
	            // check user's search attribute already has searchStr ... SOMEHOW
	            updateUser();
	         }
	      }, function (error) {
	         console.log(JSON.stringify(error, null, 2));
	      });

	      // in theory, this function should never be called
	      var writeUser = function writeUser(search) {
	         db.documents.write({ uri: '/user/' + userId + '.json',
	            contentType: 'application/json',
	            content: { searches: [search], demographics: { age: '', height: '', weight: '', insulin: '' } }
	         }).result(null, function (error) {
	            console.log(JSON.stringify(error));
	         });
	      };

	      // Insert the search string into the user's search history using patch operation
	      // Patch operation can update a document in the database
	      var updateUser = function updateUser() {
	         db.documents.patch('/user/' + userId + '.json', pb.insert('/array-node("searches")', 'last-child', searchStr));
	      };
	   },
	   // Creates a user with userId in database if they don't exist
	   checkUser: function checkUser(userId) {
	      var marklogic = __webpack_require__(23);
	      var my = __webpack_require__(24);
	      var db = marklogic.createDatabaseClient(my.connInfo);
	      var qb = marklogic.queryBuilder;
	      var pb = marklogic.patchBuilder;
	      db.documents.read('/user/' + userId + '.json').result(function (documents) {
	         if (documents.length == 0) {
	            db.documents.write({ uri: '/user/' + userId + '.json',
	               contentType: 'application/json',
	               content: { searches: [], demographics: { age: '', height: '', weight: '', insulin: '' } }
	            }).result(null, function (error) {
	               console.log(JSON.stringify(error));
	            });
	         }
	      }, function (error) {
	         console.log(JSON.stringify(error, null, 2));
	      });
	   },

	   getUserInfo: function getUserInfo(userId, res) {
	      var marklogic = __webpack_require__(23);
	      var my = __webpack_require__(24);
	      var db = marklogic.createDatabaseClient(my.connInfo);
	      var results;

	      db.documents.read('/user/' + userId + '.json').result(function (documents) {
	         if (documents.length == 0) res.status(400).send({ 'error': 'no user, signed in?' });else {
	            results = documents[0].content;
	            res.send({ 'userInfo': results });
	            return;
	         }
	      }, function (error) {
	         console.log(JSON.stringify(error, null, 2));
	      });
	   },
	   saveDems: function saveDems(data) {
	      var marklogic = __webpack_require__(23);
	      var my = __webpack_require__(24);
	      var db = marklogic.createDatabaseClient(my.connInfo);
	      var qb = marklogic.queryBuilder;
	      var pb = marklogic.patchBuilder;
	      console.log('saving :');
	      console.log(data);
	      // Need to check that data was entered
	      db.documents.patch('/user/' + data.user + '.json', pb.replace('/demographics/height', data.height), pb.replace('/demographics/age', data.age), pb.replace('/demographics/weight', data.weight), pb.replace('/demographics/insulin', data.insulin)).result();
	   }

	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("marklogic");

/***/ },
/* 24 */
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
/* 25 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("pem");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ }
/******/ ]);