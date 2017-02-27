import React from 'react'

export default React.createClass({
  loginEvent: function(usrnm, psw) {
    console.log('username = ' + usrnm);
    console.log('password = ' + psw);
  },
  loadFb: function() {

  },
  render() {
    return ( 
      <div>
         <button className='greenOut'> Login Button </button>
      </div>
    )
  }
})
