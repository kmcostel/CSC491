// modules/Searches.js
import React from 'react'

export default class Searches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searches: this.props.searches};
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

   componentWillReceiveProps(nextProps) {
      this.setState({ searches: nextProps.searches });  
   }

   buildLink(search) {
     console.log('/?search='+search.search);  
     return '/?search='+search.search;
   }

   render() {
     var self = this;    
     var searches = this.state.searches.map(function(search, i) {
       return (
         <li key={i}> <a href={self.buildLink({search})}> {search} </a> </li>
       );
		 });
      return ( 
         <div>
            <ul> {searches} </ul>
         </div>
      )
   }
}
