// public/js/ml.js
module.exports = {
   update: function(userId, searchStr) {
      var marklogic = require('marklogic');
      var my = require('./my-connection.js');
      var db = marklogic.createDatabaseClient(my.connInfo);
      var qb = marklogic.queryBuilder;
      var pb = marklogic.patchBuilder;

      db.documents.read('/user/' + userId + '.json')
         .result( function(documents) {
            // Use documents.write() if a user doesn't exist in the database.
            // Otherwise use the documents.patch() function to update their search history
            if (documents.length == 0) writeUser(searchStr);
            else if (!documents[0].content.searches.includes(searchStr)) { // check user's search attribute already has searchStr ... SOMEHOW
              updateUser();
            }
         }, function(error) {
            console.log(JSON.stringify(error, null, 2));
         }
      );

      // in theory, this function should never be called
      var writeUser = function(search) {
         db.documents.write(
            {  uri: '/user/' + userId + '.json',
               contentType: 'application/json',
               content: { searches: [search], demographics: {age: '', height: '', weight: '', insulin: ''} }
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

   },
   // Creates a user with userId in database if they don't exist
   checkUser: function(userId) {
      var marklogic = require('marklogic');
      var my = require('./my-connection.js');
      var db = marklogic.createDatabaseClient(my.connInfo);
      var qb = marklogic.queryBuilder;
      var pb = marklogic.patchBuilder;
      db.documents.read('/user/' + userId + '.json')
         .result( function(documents) {
            if (documents.length == 0) {
               db.documents.write(
                  {  uri: '/user/' + userId + '.json',
                     contentType: 'application/json',
                     content: { searches: [], demographics: {age: '', height: '', weight: '', insulin: ''} }
                  }
               ).result(null, function(error) {
                  console.log(JSON.stringify(error));
               });

               }
            }, function(error) {
                  console.log(JSON.stringify(error, null, 2));
               }
         );   
   },

   getUserInfo: function(userId, res) {
      var marklogic = require('marklogic');
      var my = require('./my-connection.js');
      var db = marklogic.createDatabaseClient(my.connInfo);
      var results; 

      db.documents.read('/user/' + userId + '.json')
         .result( function(documents) {
            if (documents.length == 0) res.status(400).send({'error': 'no user, signed in?'});
            else {
              results = documents[0].content;
              res.send({'userInfo' : results});
              return;
           }
         }, 
         function(error) {
            console.log(JSON.stringify(error, null, 2));
         }
      ); 
   },
   saveDems: function(data) {
      var marklogic = require('marklogic');
      var my = require('./my-connection.js');
      var db = marklogic.createDatabaseClient(my.connInfo);
      var qb = marklogic.queryBuilder;
      var pb = marklogic.patchBuilder;
      console.log('saving :');
      console.log(data);
      // Need to check that data was entered
      db.documents.patch('/user/' + data.user + '.json',
         pb.replace('/demographics/height', data.height),
         pb.replace('/demographics/age', data.age),
         pb.replace('/demographics/weight', data.weight),
         pb.replace('/demographics/insulin', data.insulin),
      ).result();
   }

}

