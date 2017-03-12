
module.exports = {
  run: function(userId, searchStr) {
    var marklogic = require('marklogic');
    var my = require('./my-connection.js');
    var db = marklogic.createDatabaseClient(my.connInfo);
    var qb = marklogic.queryBuilder;
  
    console.log('user ' + userId + ' searched for ' + searchStr);

    var writeUser = function(userId) {

      db.documents.write(
        { uri: '/user/example.json',
          contentType: 'application/json',
          content: { some: 'data' }
        }
      ).result(null, function(error) {
          console.log(JSON.stringify(error));
        });
  
      db.documents.read('/user/example.json')
       .result( function(documents) {
          documents.forEach(function(document) {
            console.log(JSON.stringify(document));
          });
        }, function(error) {
          console.log(JSON.stringify(error, null, 2));
        });

    }

  }

};
