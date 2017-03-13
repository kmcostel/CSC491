//modules/SearchBar.js
import React from 'react'
import Results from './Results.js'

export default class SearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.FB = props.fb;
      this.updateState = this.updateState.bind(this);
      this.getFoodInfo = this.getFoodInfo.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.state = {items: [], userId: null};
   }

   componentDidMount() {
      var me = this;

      this.FB.getLoginStatus(function(response) {
         me.setState({
            userId: response.authResponse.userID
         });
      });
   }

   updateState(response) {
      this.setState({
         items: response.items
      });
   }

   getFoodInfo(FB, callback) {
      var enteredStr = document.getElementById('searchText').value;
      var userId = this.state.userId;  
      var data = {'search' : enteredStr, 'userId' : userId};

      $.ajax({
         url: 'http://localhost:8080/nutri',
         type: 'POST',
         data: JSON.stringify(data),
         contentType: 'application/json; charset=utf-8',
         dataType: 'json',
         success: function(response){
         callback(response);
         }
      }); 
   }

   render() {
      return (
         <div id='searchDiv'>
            <p> What are you eating? </p>
            <textarea id='searchText' placeholder={this.props.placeholder} cols='80' rows='1'/> &nbsp;
            <button id='searchBtn' className='greenOut' onClick={() => this.getFoodInfo(this.FB, this.updateState)}> Search </button>
            <Results items={this.state.items} />
         </div>
      );
   }
}

