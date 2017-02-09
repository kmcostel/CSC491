// Search for documents about mammals, using Query By Example.
// The query returns an array of document descriptors, one per
// matching document. The descriptor includes the URI and the
// the contents of each document.

var marklogic = require('marklogic');
var my = require('./my-connection.js');

var db = marklogic.createDatabaseClient(my.connInfo);
var qb = marklogic.queryBuilder;

db.documents.query(
  qb.where(qb.byExample({kind: 'mammal'}))
).result( function(documents) {
    console.log('Matches for kind=mammal:')
    documents.forEach( function(document) {
      console.log('\nURI: ' + document.uri);
      console.log('Name: ' + document.content.name);
    });
}, function(error) {
    console.log(JSON.stringify(error, null, 2));
});

