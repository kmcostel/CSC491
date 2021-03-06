//modules/SearchBar.js
import React from 'react'
import Results from './Results.js'

export default class SearchBar extends React.Component {
   constructor(props) {
      super(props);
      this.updateState = this.updateState.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.getFoodInfo = this.getFoodInfo.bind(this);
      this.state = {items: [], user: props.user};
   }

   componentDidMount() {
      var str = location.search.split('search=')[1];
      // translates %20 back into space
      var search = decodeURI(str);
      if (search != 'undefined') {
         $('textarea#searchText').val(search);
         this.getFoodInfo(this.updateState);
      }
   }

   updateState(response) {
      this.setState({
         items: response.items
      });
   }

   componentWillReceiveProps(nextProps) {
      this.setState({ user: nextProps.user });  
   }

   getFoodInfo(callback) {
      var enteredStr = document.getElementById('searchText').value;
      var data = {search : enteredStr, user : this.state.user};

      if (enteredStr != '') {
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
   }

   render() {
      return (
         <div id='searchDv'>
            <p> What are you eating? </p>
            <div id='searchDiv'>
               <textarea id='searchText' placeholder={this.props.placeholder} cols='80' rows='1'/> {' '}
               <button id='searchBtn' className='greenOut' onClick={() => this.getFoodInfo(this.updateState)}> Search </button>
            </div>
            <Results items={this.state.items} user={this.state.user} />
         </div>
      );
   }
}

