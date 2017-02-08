var React = require('react');

module.exports = React.createClass({
   handleChange: function() {
      console.log("Change");
   },
   makePost: function() {
      var enteredStr = document.getElementById('searchText').value;
      var data = {'search' : enteredStr};

      console.log('Posting');
      var success = function() {
        console.log("Post success");
      }
      var url = 'http://localhost:3000/nutri';

      $.ajax({
        url: url,
        type: "POST",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response){
          console.log(response);
        }
      })
   },
   render: function() {
      return (
         <html>
            <head>
               <title>Carbs</title>
               <link rel='stylesheet' href='/style.css' />
               <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
            </head>
            <body>
               <div id="topcorner">
                 <a href="/login">Login</a>
              </div>

               <div>
                  <h1>Carb Counter</h1>
                  <p>What are you eating?</p>
               </div>

               <div>
                  <textarea id='searchText' cols='80' rows='1'/> &nbsp;
                  <button id='myButton' onClick={this.makePost}> Search </button>
               </div>
               <script src='/bundle.js' />

            </body>
         </html>
      );
   }
});
