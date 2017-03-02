// modules/App.js
import React from 'react'

module.exports = React.createClass({
  render() {
    return (
      <div>
        <h1><a href="/"> Carb Counter</a></h1>
        {this.props.children}
      </div>
    )
  }
})
