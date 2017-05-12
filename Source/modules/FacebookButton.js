//modules/FacebookButton.js
import React from 'react';
import SearchBar from './SearchBar.js';

export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);

      this.componentDidMount = this.componentDidMount.bind(this);
      this.testAPI = this.testAPI.bind(this);
      this.state = {user: null, loggedIn: false};      
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
            var data = {user : response.authResponse.userID};
            FB.Event.subscribe('auth.login', this.onLogin.bind(this));
            FB.Event.subscribe('auth.logout', this.onLogout.bind(this));
            this.statusChangeCallback(response);

         $.ajax({
            url: 'http://localhost:8080/signin',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               console.log('success sign in from module/facebook');
            }
         }); 

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
      });
   }

   // This is called with the results from FB.getLoginStatus().
   statusChangeCallback(response) {
      var data = {user : response.authResponse.userID};
      if (response.status === 'connected') {
         this.testAPI();
         // ensures the user has an account for them in the database
         $.ajax({
            url: 'http://localhost:8080/signin',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               console.log('success sign in from module/facebook');
            }
         }); 
      } else if (response.status === 'not_authorized') {
         // The person is logged into Facebook, but not your app.
      } else {
         // The person is not logged into Facebook, so we're not sure if
         // they are logged into this app or not.
      }
   }

   onLogin(response) { 
      if (response.status === 'connected') {
         var data = {user : response.authResponse.userID};
         this.setState({user: response.authResponse.userID});
         this.setState({loggedIn: true});
    /*     $.ajax({
            url: 'http://localhost:8080/signin',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function(response){
               console.log('success sign in from module/facebook');
            }
         }); 
         */
      }
   }
      
   onLogout(response) {
      this.setState({
         user: null
      });
      this.setState({
         loggedIn: false
      });
   }

   render() {
      return (
         <div>
            <div className="topCorner">
               {this.state.loggedIn && 
                   <a className='account' href='/account'>
                      Account {'  '}
                   </a>
               }
               <div 
                  className="fb-login-button" 
                  data-max-rows="1" 
                  data-size="large" 
                  data-show-faces="false" 
                  data-auto-logout-link="true"
                  >
               </div>
            </div>
            <SearchBar user={this.state.user} placeholder='50 grams of cooked spinach and 1 cup of pineapple' />          
        </div>
      );
   }
};
