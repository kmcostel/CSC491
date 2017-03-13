//modules/FacebookButton.js
import React from 'react';

export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);

      this.FB = props.fb;
   }

   componentWillMount() { }

   componentDidMount() {
      this.FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));

      this.FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));

      this.FB.Event.subscribe('auth.login', 
         this.onLogin.bind(this));
      
      this.FB.getLoginStatus(function(response) {
         this.state = {
            user: response   
         }
      });
   }

   onLogin(response) { 
      this.setState({user: response});
   }
      
   onStatusChange(response) {
      var self = this;

      if(response.status === "connected") {
         this.FB.api('/me', function(response) {
            self.setState({
               user: response
            });
         })
      }
   }

   onLogout(response) {
      this.setState({
         user: null
      });
   }

   render() {
      return (
         <div className="topCorner">
            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="large" 
               data-show-faces="false" 
               data-auto-logout-link="true"
               >
            </div>
         </div>
      );
   }
};
