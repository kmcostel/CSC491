// modules/Demographics.js
import React from 'react'
import Searches from './Searches.js'
var BarChart = require('react-chartjs').Bar;

export default class Demographics extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.testAPI = this.testAPI.bind(this);
    this.state = {searches: [], age: '', height: '', weight: '', insulin: ''};
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
         var data = {user: response.id};
         self.setState({user: response.id});
         self.setState({loggedIn: true});
         // Find a user's info
         $.ajax({
            url: 'http://localhost:8080/userInfo',
            type: 'POST',
            data: JSON.stringify({user: response.id}),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               self.setState({searches: response.userInfo.searches});
               self.setState({age: response.userInfo.demographics.age});
               self.setState({height: response.userInfo.demographics.height});
               self.setState({weight: response.userInfo.demographics.weight});
               self.setState({insulin: response.userInfo.demographics.insulin});
            }
         }); 

      });
   }

  saveDems() {
    var self = this;
    // if user didn't enter anything, then use the value already in the database, stored in the state.
    var age = $('#ageInput').val();
    if (age == '') age = this.state.age;
    var height = $('#heightInput').val();
    if (height == '') height = this.state.height;
    var weight = $('#weightInput').val();
    if (weight == '') weight = this.state.weight;
    var insulin = $('#insulinInput').val();
    if (insulin == '') insulin = this.state.insulin;

    var user = this.state.user;
    var data = {age: age, height: height, weight: weight, insulin: insulin, user: user};
    console.log(data);
  
    $.ajax({
      url: 'http://localhost:8080/saveDems',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function(response){ 
         self.setState({age: age});
         self.setState({height: height});
         self.setState({weight: weight});
         self.setState({insulin: insulin});
         // remove values from inputs, placeholders will be updated with current values
         $('#ageInput').val('');
         $('#heightInput').val('');
         $('#weightInput').val('');
         $('#insulinInput').val('');
      }
    }); 

  }

  render() {
      
    return (
      // if not signed in, send back an unauthorized error
      <div>
        <Searches searches={this.state.searches}/>
        <br/>
        <div id='personalInfoContainter'>
          <div id='personalInfo'>
            Age: &nbsp; 
            <input id='ageInput' type='number' placeholder={this.state.age} name='age'/> years
            <br/>
            Height: &nbsp;
            <input id='heightInput' type='number' placeholder={this.state.height} name='height'/> inches
            <br/>
            Weight: &nbsp;
            <input id='weightInput' type='number' placeholder={this.state.weight} name='weight'/> &nbsp; lbs.
            <br/>
            Carbs-Insulin ratio (grams/unit): &nbsp;
            <input id='insulinInput' type='number' placeholder={this.state.insulin} name='ratio'/> &nbsp; 
          </div>
          <div> 
            <button id='saveButton' className='greenOut' onClick={() => this.saveDems()}> Save </button>
          </div>
        </div>
      </div>
    );
  }

}
