// modules/Demographics.js
import React from 'react'
import Searches from './Searches.js'
var BarChart = require('react-chartjs').Bar;

export default class Demographics extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.state = {searches: []};
  }

   componentDidMount() {
      window.fbAsyncInit = function() {
         FB.init({
            appId      : '375078696202555',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.8'
         });

         FB.getLoginStatus(function(response) {
            this.testAPI();
         }.bind(this));
      }.bind(this);

      // Load the SDK asynchronously
      (function(d, s, id) {
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) return;
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


   }

   // Here we run a very simple test of the Graph API after login is
   // successful.  See statusChangeCallback() for when this call is made.
   testAPI() {
      var self = this;
      FB.api('/me', function(response) {
         self.setState({user: response.id});
         self.setState({loggedIn: true});
         // Find a user's searches
         $.ajax({
            url: 'http://localhost:8082/searches',
            type: 'POST',
            data: JSON.stringify({user: response.id}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               console.log('searches here');
               console.log(response);
            }
         }); 
         // Find a user's demographics
         $.ajax({
            url: 'http://localhost:8082/demographics',
            type: 'POST',
            data: JSON.stringify({user: response.id}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               console.log('demographics here');
               console.log(response);
            }
         }); 

      });
   }

  getSearches(userID) {
    
  }

  render() {
    
    var searchList = [];
    var searches = this.state.searches.map(function(search, i) {
      searchList.push(search);
      
      return (
        <li key={i}> {search} </li>
      );
		});
      
    return (
      <div>
        <div id="personalInfo">
          Age: &nbsp; 
          <input type="number" name="age"/> years
          <br/>
          Height: &nbsp;
          <input type="number" name="height"/> inches
          <br/>
          Weight: &nbsp;
          <input type="number" name="weight" /> &nbsp; lbs.
          <br/>
          Carbs-Insulin ratio (grams/unit): &nbsp;
          <input type="number" name="ratio" value=""/> &nbsp; 
          <br/><br/>
          <input type="submit" value="Save"/>
        </div>
        <Searches searches={this.state.searches}/>
      </div>
    );
  }

}
