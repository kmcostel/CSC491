import React from 'react';
import Mark from './Mark.js';

export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);

      this.FB = props.fb;

      this.FB.getLoginStatus(function(response) {
         console.log('Getting login status');
         console.log(response);
         this.state = {
            user: response   
         }
      });

   }

   componentDidMount() {
      this.FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
      this.FB.Event.subscribe('auth.statusChange', 
         this.onStatusChange.bind(this));
   }
      
   onStatusChange(response) {
      var self = this;

      if( response.status === "connected" ) {
         this.FB.api('/me', function(response) {
            console.log('Logging response');
            console.log( response );
            self.setState({
               user: response
            });
         })
      }
   }

   onLogout(response) {
      /*this.setState({
         message: "Bye"
      });*/
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
            <Mark user={this.state} />
         </div>
      );
   }
};
