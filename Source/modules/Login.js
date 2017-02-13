import React from 'react'

module.exports = React.createClass({
   validateUser: function(username, password) {
      console.log('Validating user....');
   },
   render: function() {
      return (
         <div>
           <p> Login page </p>
           <div id="topcorner">
             <a href="/">Home</a>
           </div>
           <div id="loginForm">
           </div>
         </div>
      );
   }
});
