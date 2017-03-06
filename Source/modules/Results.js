// Results.js
import React from 'react'

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: {}}
  }
   render() {
      return (
         <div id='resultDiv'>
           <p> Fat = {this.props.fat} </p>
           <p> Carbs = {this.props.carbs} </p>
           <p> Sugar = {this.props.sugar} </p>
         </div>
      )
   }
}
