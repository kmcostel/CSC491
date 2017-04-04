// public/js/ml.js
module.exports = {
   update: function(userId, searchStr) {
      var marklogic = require('marklogic');
      var my = require('./my-connection.js');
      var db = marklogic.createDatabaseClient(my.connInfo);
      var qb = marklogic.queryBuilder;
      var pb = marklogic.patchBuilder;

      console.log('Updating user ' + userId + ' with ' + searchStr);
      db.documents.read('/user/' + userId + '.json')
         .result( function(documents) {
         // Use documents.write() if a user doesn't exist in the database.
         // Otherwise use the documents.patch() function to update their search history
         if (documents.length == 0) writeUser();
         else updateUser();
      }, function(error) {
         console.log(JSON.stringify(error, null, 2));
      });

      var writeUser = function() {
         db.documents.write(
            {  uri: '/user/' + userId + '.json',
               contentType: 'application/json',
               content: { searches: [searchStr] }
            }
         ).result(null, function(error) {
            console.log(JSON.stringify(error));
         });
      }

      // Insert the search string into the user's search history using patch operation
      // Patch operation can update a document in the database
      var updateUser = function() {
         db.documents.patch('/user/' + userId + '.json',
            pb.insert('/array-node("searches")' , 'last-child', searchStr)
         );
      }

   }
}
