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
	var nutri = __webpack_require__(13);
	console.log(nutri);
	var express = __webpack_require__(14);
	var path = __webpack_require__(15);
	var compression = __webpack_require__(16);
	var app = express();

	app.use(compression());
	var bodyParser = __webpack_require__(17);
	app.use(bodyParser.json());

	// serve our static stuff like index.css
	app.use(express.static(path.join(__dirname, 'public')));
	app.use('/nutri', function (req, res, next) {
	  console.log("NExt");
	  next();
	});

	app.post('*', function (req, res) {
	  console.log(req.body);
	  res.send('Got a post!');
	});

	// send all requests to index.html so browserHistory works
	app.get('*', function (req, res) {
	  console.log("Getting");
	  // match the routes to the url
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    // `RouterContext` is what the `Router` renders. `Router` keeps these
	    // `props` in its state as it listens to `browserHistory`. But on the
	    // server our app is stateless, so we need to use `match` to
	    // get these props before rendering.
	    var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));

	    // dump the HTML into a template, lots of ways to do this, but none are
	    // really influenced by React Router, so we're just using a little
	    // function, `renderPage`
	    res.send(renderPage(appHtml));
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>My First React Router App</title>\n    <link rel=stylesheet href=/index.css>\n    <div id=app>' + appHtml + '</div>\n    <script src="/bundle.js"></script>\n   ';
	}

	var PORT = process.env.PORT || 8080;
	app.listen(PORT, function () {
	  console.log('Express server running at localhost:' + PORT);
	});
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

	var _Repos = __webpack_require__(8);

	var _Repos2 = _interopRequireDefault(_Repos);

	var _Repo = __webpack_require__(9);

	var _Repo2 = _interopRequireDefault(_Repo);

	var _Home = __webpack_require__(10);

	var _Home2 = _interopRequireDefault(_Home);

	var _Login = __webpack_require__(11);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/repos', component: _Repos2.default },
	    _react2.default.createElement(_reactRouter.Route, { path: '/repos/:userName/:repoName', component: _Repo2.default })
	  ),
	  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/nutri', component: _Login2.default })
	); // modules/routes.js

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(6);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	var _SearchBar = __webpack_require__(7);

	var _SearchBar2 = _interopRequireDefault(_SearchBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h1',
	        null,
	        _react2.default.createElement(
	          'a',
	          { href: '/' },
	          ' Carb Counter'
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // modules/NavLink.js


	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'NavLink',
	  render: function render() {
	    return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
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

	    console.log('Posting with: ' + enteredStr);
	    var success = function success() {
	      console.log('Post success');
	    };
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
	      null,
	      _react2.default.createElement(
	        'p',
	        null,
	        ' What did you eat? '
	      ),
	      _react2.default.createElement('textarea', { id: 'searchText', placeholder: '1 large egg and 50 grams of raw spinach', cols: '80', rows: '1' }),
	      ' \xA0',
	      _react2.default.createElement(
	        'button',
	        { className: 'greenOut', onClick: this.makePost },
	        ' Search '
	      )
	    );
	  }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _NavLink = __webpack_require__(6);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Repos',

	  contextTypes: {
	    router: _react2.default.PropTypes.object
	  },

	  handleSubmit: function handleSubmit(event) {
	    event.preventDefault();
	    var userName = event.target.elements[0].value;
	    var repo = event.target.elements[1].value;
	    var path = '/repos/' + userName + '/' + repo;
	    this.context.router.push(path);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        'Repos'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/reactjs/react-router' },
	            'React Router'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/repos/facebook/react' },
	            'React'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            'form',
	            { onSubmit: this.handleSubmit },
	            _react2.default.createElement('input', { type: 'text', placeholder: 'userName' }),
	            ' / ',
	            ' ',
	            _react2.default.createElement('input', { type: 'text', placeholder: 'repo' }),
	            ' ',
	            _react2.default.createElement(
	              'button',
	              { type: 'submit' },
	              'Go'
	            )
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'Repo',
	  render: function render() {
	    var _props$params = this.props.params,
	        userName = _props$params.userName,
	        repoName = _props$params.repoName;

	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'h2',
	        null,
	        userName,
	        ' / ',
	        repoName
	      )
	    );
	  }
	});

/***/ },
/* 10 */
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

	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'div',
	        { id: 'topcorner' },
	        _react2.default.createElement(
	          'a',
	          { href: '/login' },
	          'Login'
	        )
	      ),
	      _react2.default.createElement(_SearchBar2.default, null)
	    );
	  }
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _LoginForm = __webpack_require__(12);

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createClass({
	   displayName: 'exports',

	   validateUser: function validateUser(username, password) {
	      console.log('Validating user....');
	   },
	   render: function render() {
	      return _react2.default.createElement(
	         'div',
	         null,
	         _react2.default.createElement(
	            'p',
	            null,
	            ' Login page '
	         ),
	         _react2.default.createElement(
	            'div',
	            { id: 'topcorner' },
	            _react2.default.createElement(
	               'a',
	               { href: '/' },
	               'Home'
	            )
	         ),
	         _react2.default.createElement(_LoginForm2.default, null)
	      );
	   }
	});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _react2.default.createClass({
	  displayName: 'LoginForm',

	  loginEvent: function loginEvent(usrnm, psw) {
	    console.log('username = ' + usrnm);
	    console.log('password = ' + psw);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'textarea',
	        null,
	        ' '
	      ),
	      _react2.default.createElement(
	        'textarea',
	        null,
	        ' '
	      ),
	      _react2.default.createElement(
	        'button',
	        { className: 'greenOut' },
	        ' Login Button '
	      )
	    );
	  }
	});

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	module.exports = {

	  makePost: function makePost(foodSearch, appKey, appId) {
	    var headers = {
	      'x-app-key': appKey,
	      'x-app-id': appId,
	      'Content-Type': 'application/json'
	    };

	    var body = {
	      query: foodSearch
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

	    request(options, function (error, response, body) {
	      if (error === null) {
	        str = printBody(body);
	      } else {
	        console.log('error: ' + error);
	        str = 'error: ' + error;
	      }
	    });
	    return str;
	  },

	  printBody: function printBody(body) {
	    var str = "";
	    if (body["foods"]) {
	      console.log(body["foods"].length + " food items retrieved.");
	      str += body["foods"].length + " food items retrieved.";

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
	        str += "total protein: " + body["foods"][i].nf_protein;

	        console.log("total fat: " + body["foods"][i].nf_total_fat);
	        str += "total fat: " + body["foods"][i].nf_total_fat;
	      }
	    } else {
	      console.log("Sorry nothing found :("); // logs to terminal
	      str = "Sorry nothing found :("; // returns to client ajax call
	    }
	    return str;
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);