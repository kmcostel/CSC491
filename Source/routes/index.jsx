var router = require('express').Router();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Component = require('../Component.jsx');
var ReactRouter = require('react-router')



router.get('*', function (req, res) {
  var props = {title: 'Universal React'};
  ReactRouter.match({
    routes: (
      <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path='/' component={require('../Component.jsx')}>
        </ReactRouter.Route>
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

module.exports = router;

// app.get('/search', function(req, res) {
//   console.log(req['query']);
//   console.log("INSIDE OF SEARCH!");
//   for (var prop in req) {
//     console.log("prop = " + prop);
//   }
//   res.send(makePost(req['query']));
// });

// app.post('/query', function(req, res) {

//   console.log("Inside /query post handler: " + req.body.data);
//   console.log('body: ' + JSON.stringify(req.body));

//   var foodData = makePost(req.body.query)

//   res.send(foodData);
// })
