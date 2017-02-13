import React from 'react'
import NavLink from './NavLink'
import SearchBar from './SearchBar'

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
