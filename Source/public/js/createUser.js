// Search for documents about mammals, using Query By Example.
// The query returns an array of document descriptors, one per
// matching document. The descriptor includes the URI and the
// the contents of each document.

var marklogic = require('marklogic');
var my = require('./my-connection.js');

var db = marklogic.createDatabaseClient(my.connInfo);
var qb = marklogic.queryBuilder;

db.createCollection(
  '/users'
)
.result(function(response) {
    console.log(JSON.stringify(response,null,2));
  }, function (error) {
    console.log(JSON.stringify(error,null,2));
  });
