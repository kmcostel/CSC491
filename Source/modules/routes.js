// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Account from './Account'

module.exports = (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/my-account' component={Account}/>
  </Route>
)
