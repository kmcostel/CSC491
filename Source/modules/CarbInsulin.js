// CarbInsulin.js
import React from 'react'

export default class CarbInsulin extends React.Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = {insulin: props.insulin, carbs: -1}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.insulin != undefined) {
      this.setState({insulin: nextProps.insulin})
    }
    if (nextProps.carbs != undefined) {
      this.setState({carbs: Math.round(nextProps.carbs * 10) / 10});
    }
  }

  render() {
    
    if (this.state.insulin != undefined && this.state.carbs > -1) {
      return (  
        <div id='insulinAnimation'>
          <div id='carbs'> {this.state.carbs} carbs </div>  
          <div id='arrowContainer'> <img src='/images/arrow.png' width='150' alt='arrow'/>  </div>
          <div id='insulin'> {Math.round(this.state.insulin * this.state.carbs * 100) / 100} IU </div>
        </div>
      )
    }
      else {
       return ( <div> </div> );
      }

  }

}
