// modules/Account.js
import React from 'react'
import Demographics from './Demographics.js'

export default class Account extends React.Component {
   constructor(props) {
      super(props);
      this.state = {fb: this.props.fb};
   }

   componentWillMount() {
      //How to get userID?
      
   }

   render() {
      return (
         <div>
           <div className='topCorner'><a className='account' href='/'>Home</a></div>
           <p> My Account </p>
           <Demographics/>
         </div>
      );
   }
};
