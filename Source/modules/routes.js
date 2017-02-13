// modules/routes.js
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Repos from './Repos'
import Repo from './Repo'
import Home from './Home'
import Login from './Login'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="/repos" component={Repos}>
      <Route path="/repos/:userName/:repoName" component={Repo}/>
    </Route>
    <Route path="/login" component={Login}/>
  </Route>
)


