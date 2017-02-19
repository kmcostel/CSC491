import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h1><a href="/"> Carb Counter</a></h1>
        {this.props.children}
      </div>
    )
  }
})
