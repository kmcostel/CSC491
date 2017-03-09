// modules/Home.js
import React from 'react'
import SearchBar from './SearchBar'
import FacebookButton from './FacebookButton';

export default class Home extends React.Component {
  render() {
    return ( 
        <div>
          <FacebookButton fb={FB}/>
          <SearchBar placeholder='50 grams of raw spinach and 1 cup of pineapple' />
        </div>
    )
  }
}
