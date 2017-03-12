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
	var bodyParser = __webpack_require__(10);
	var compression = __webpack_require__(11);
	var express = __webpack_require__(12);
	var favicon = __webpack_require__(13);
	var fillResponse = __webpack_require__(14);
	var https = __webpack_require__(15);
	var keys = __webpack_require__(16);
	var makeOptions = __webpack_require__(17);
	var ml = __webpack_require__(18); // MarkLogic module
	var path = __webpack_require__(21);
	var pem = __webpack_require__(22);
	var request = __webpack_require__(23);

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
	  if (req.body.userId != null) {
	    ml.update(req.body.userId, req.body.search);
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

	var _FacebookButton = __webpack_require__(9);

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
	        _react2.default.createElement(_FacebookButton2.default, { fb: FB }),
	        _react2.default.createElement(_SearchBar2.default, { fb: FB, placeholder: '50 grams of raw spinach and 1 cup of pineapple' })
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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SearchBar = function (_React$Component) {
	  _inherits(SearchBar, _React$Component);

	  function SearchBar(props) {
	    _classCallCheck(this, SearchBar);

	    var _this = _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).call(this, props));

	    _this.FB = props.fb;
	    _this.updateState = _this.updateState.bind(_this);
	    _this.getFoodInfo = _this.getFoodInfo.bind(_this);
	    _this.componentDidMount = _this.componentDidMount.bind(_this);
	    _this.state = { items: [], userId: null };
	    return _this;
	  }

	  _createClass(SearchBar, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var me = this;

	      this.FB.getLoginStatus(function (response) {
	        me.setState({
	          userId: response.authResponse.userID
	        });
	      });
	    }
	  }, {
	    key: 'updateState',
	    value: function updateState(response) {
	      this.setState({
	        items: response.items
	      });
	    }
	  }, {
	    key: 'getFoodInfo',
	    value: function getFoodInfo(FB, callback) {
	      var enteredStr = document.getElementById('searchText').value;
	      var userId = this.state.userId;
	      var data = { 'search': enteredStr, 'userId': userId };

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
	              return _this2.getFoodInfo(_this2.FB, _this2.updateState);
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


	var Results = function (_React$Component) {
	  _inherits(Results, _React$Component);

	  function Results(props) {
	    _classCallCheck(this, Results);

	    return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	  }

	  _createClass(Results, [{
	    key: 'render',
	    value: function render() {
	      var foods = this.props.items.map(function (food, i) {
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
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            ' Fat = ',
	            food.fat,
	            ' grams '
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            ' Carbs = ',
	            food.carbs,
	            ' grams '
	          ),
	          _react2.default.createElement(
	            'p',
	            null,
	            ' Sugar = ',
	            food.sugar,
	            ' grams '
	          )
	        );
	      });

	      return _react2.default.createElement(
	        'div',
	        { id: 'lineContainer' },
	        foods
	      );
	    }
	  }]);

	  return Results;
	}(_react2.default.Component);

	exports.default = Results;

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

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FacebookButton = function (_React$Component) {
	   _inherits(FacebookButton, _React$Component);

	   function FacebookButton(props) {
	      _classCallCheck(this, FacebookButton);

	      var _this = _possibleConstructorReturn(this, (FacebookButton.__proto__ || Object.getPrototypeOf(FacebookButton)).call(this, props));

	      _this.FB = props.fb;
	      return _this;
	   }

	   _createClass(FacebookButton, [{
	      key: 'componentWillMount',
	      value: function componentWillMount() {}
	   }, {
	      key: 'componentDidMount',
	      value: function componentDidMount() {
	         this.FB.Event.subscribe('auth.logout', this.onLogout.bind(this));

	         this.FB.Event.subscribe('auth.statusChange', this.onStatusChange.bind(this));

	         this.FB.Event.subscribe('auth.login', this.onLogin.bind(this));

	         this.FB.getLoginStatus(function (response) {
	            this.state = {
	               user: response
	            };
	         });
	      }
	   }, {
	      key: 'onLogin',
	      value: function onLogin(response) {
	         console.log('onLogin');
	      }
	   }, {
	      key: 'onStatusChange',
	      value: function onStatusChange(response) {
	         var self = this;
	         console.log('Status change');

	         if (response.status === "connected") {
	            this.FB.api('/me', function (response) {
	               console.log('Logging response');
	               console.log(response);
	               self.setState({
	                  user: response
	               });
	            });
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
	            { className: 'topCorner' },
	            _react2.default.createElement('div', {
	               className: 'fb-login-button',
	               'data-max-rows': '1',
	               'data-size': 'large',
	               'data-show-faces': 'false',
	               'data-auto-logout-link': 'true'
	            })
	         );
	      }
	   }]);

	   return FacebookButton;
	}(_react2.default.Component);

	exports.default = FacebookButton;
	;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

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
/* 15 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  key: {
	    'appId': 'de5c7861',
	    'appKey': 'cef8bbbab558db96475078af05a797c0'
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// public/js/ml.js

	module.exports = {
	  update: function update(userId, searchStr) {
	    var marklogic = __webpack_require__(19);
	    var my = __webpack_require__(20);
	    var db = marklogic.createDatabaseClient(my.connInfo);
	    var qb = marklogic.queryBuilder;
	    var pb = marklogic.patchBuilder;

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
/* 19 */
/***/ function(module, exports) {

	module.exports = require("marklogic");

/***/ },
/* 20 */
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
/* 21 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("pem");

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ }
/******/ ]);