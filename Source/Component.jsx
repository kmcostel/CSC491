var React = require('react');

module.exports = React.createClass({
   _handleClick: function() {
      alert("You clicked me");
   },
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
               <div>
                  <h1>Carb Counter</h1>
                  <p>Discover how many carbs are in your meal!</p>
                  <button onClick={this._handleClick}> Click me!</button>
               </div>
               <br />
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
