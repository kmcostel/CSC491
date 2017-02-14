import React from 'react'
import LoginForm from './LoginForm'

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
           <LoginForm />
         </div>
      );
   }
});
