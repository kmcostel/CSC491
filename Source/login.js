var React = require('react');
var ReactDOM = require('react-dom');
var HomeComp = require('./Index.jsx');
var LoginComp = require('./Login.jsx');

var homeComp = React.createElement(HomeComp);
var loginComp = React.createElement(LoginComp);

ReactDOM.render(
  loginComp, document
);


