// modules/App.js
import React from 'react'

export default class App extends React.Component {
   render() {
      return (
         <div>
            <h1><a href="/"> Carb Counter</a></h1>
            {this.props.children}
         </div>
      )
   }
}
