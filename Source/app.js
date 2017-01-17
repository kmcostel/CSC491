// Load documents into the database.

var marklogic = require('marklogic');
var my = require('./my-connection.js');
var db = marklogic.createDatabaseClient(my.connInfo);

// Document descriptors to pass to write(). 
var documents = [
  { uri: '/gs/aardvark.json',
    content: {
      name: 'aardvark',
      kind: 'mammal',
      desc: 'The aardvark is a medium-sized burrowing, nocturnal mammal.'
    }
  },
  { uri: '/gs/bluebird.json',
    content: {
      name: 'bluebird',
      kind: 'bird',
      desc: 'The bluebird is a medium-sized, mostly insectivorous bird.'
    }
  },
  { uri: '/gs/cobra.json',
    content: {
      name: 'cobra',
      kind: 'mammal',
      desc: 'The cobra is a venomous, hooded snake of the family Elapidae.'
    }
  },
];

// Load the example documents into the database
db.documents.write(documents).result( 
  function(response) {
    console.log('Loaded the following documents:');
    response.documents.forEach( function(document) {
      console.log('  ' + document.uri);
    });
  }, 
  function(error) {
    console.log(JSON.stringify(error, null, 2));
  }
);
