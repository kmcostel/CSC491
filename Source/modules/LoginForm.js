import React from 'react'

export default React.createClass({
  loginEvent: function(usrnm, psw) {
    console.log('username = ' + usrnm);
    console.log('password = ' + psw);
  },
  render() {
    return ( 
      <div>
        <textarea> </textarea>
	<textarea> </textarea>
        <button className='greenOut'> Login Button </button>
      </div>
    )
  }
})
