import React from 'react'

export default React.createClass({
  makePost: function() {
      var enteredStr = document.getElementById('searchText').value;
      var data = {'search' : enteredStr};

      console.log('Posting with: ' + enteredStr);
      var success = function() {
        console.log("Post success");
      }
      var url = 'http://localhost:8080/nutri';

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
         <div>
           <p> What did you eat? </p>
           <textarea id='searchText' placeholder='1 large egg and 50 grams of raw spinach' cols='80' rows='1'/> &nbsp;
           <button id='myButton' onClick={this.makePost}> Search </button>
         </div>
      )
   }
});
