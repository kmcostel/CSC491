var React = require('react');

module.exports = React.createClass({
   handleChange: function() {
      console.log("Change");
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
                 <a href="/">Home</a>
                 &nbsp; &nbsp;
                 <a href="">Register</a>
              </div>
              <p> Login page </p>
               <script src='/bundle.js' />

            </body>
         </html>
      );
   }
});
