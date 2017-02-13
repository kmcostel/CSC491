import React from 'react'
import SearchBar from './SearchBar'

export default React.createClass({
  render() {
    return ( 
      <div>
        <div id="topcorner">
          <a href="/login">Login</a>
        </div>
        <SearchBar />
      </div>
    )
  }
})
