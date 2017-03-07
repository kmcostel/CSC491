import React from 'react'
import Results from './Results.js'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.updateState = this.updateState.bind(this);
    this.makePost = this.makePost.bind(this);
    
    this.state = {items: []};
  }

  updateState(response) {
    this.setState({items: response.items});
  }
 
  makePost(callback) {
      var enteredStr = document.getElementById('searchText').value;
      var data = {'search' : enteredStr};

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
           <button id='searchBtn' className='greenOut' onClick={() => this.makePost(this.updateState)}> Search </button>
           <Results items={this.state.items} />
         </div>
      );
   }
}

