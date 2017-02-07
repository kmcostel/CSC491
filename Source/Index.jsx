var React = require('react');

module.exports = React.createClass({
   handleChange: function() {
      console.log("Change");
   },
   makePost: function() {
      console.log("Makepost1");
      var enteredText = document.getElementById("searchText").value;
      console.log(enteredText);
   },
   render: function() {
      return (
         <html>
            <head>
               <title>Carbs</title>
               <link rel='stylesheet' href='/style.css' />
            </head>
            <body>
               <div id="topcorner">
                 <a href="/login">Login</a>
                 &nbsp; &nbsp;
                 <a href="">Register</a>
              </div>

               <div>
                  <h1>Carb Counter</h1>
                  <p>What are you eating?</p>
               </div>

               <div>
                  <textarea id="searchText" cols="80" rows="1"/> &nbsp;
                  <button id="myButton" onClick={this.makePost}> Search </button>
               </div>
               <script src='/bundle.js' />

            </body>
         </html>
      );
   }
});
