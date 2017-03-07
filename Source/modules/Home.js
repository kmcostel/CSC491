// modules/Home.js
import React from 'react'
import SearchBar from './SearchBar'
import FacebookButton from './FacebookButton';

export default class Home extends React.Component {
  render() {
    return ( 
        <div>
          <FacebookButton fb={FB}/>
          <SearchBar placeholder='1 large egg and 50 grams of raw spinach' />
        </div>
    )
  }
}
