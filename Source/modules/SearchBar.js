import React from 'react'
import Results from './Results.js'

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: {}}
  }

  makePost() {
      var enteredStr = document.getElementById('searchText').value;
      var data = {'search' : enteredStr};

      var url = 'http://localhost:8080/nutri';

      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        success: function(response){
          console.log(response);
          /*this.setState({
            results: response
          });*/
        }
      })
   }

   render() {
      return (
         <div id='searchDiv'>
           <p> What are you eating? </p>
           <textarea id='searchText' placeholder={this.props.placeholder} cols='80' rows='1'/> &nbsp;
           <button id='searchBtn' className='greenOut' onClick={this.makePost}> Search </button>
           <Results results={this.state.results} />
         </div>
      );
   }
}

