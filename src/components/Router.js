import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dass42 from './Dass42'
import IronLevels from './IronLevels'
import Home from './Home'
import NotFound from './NotFound'
const Router = () => (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dass' component={Dass42}/>
          <Route exact path='/iron' component={IronLevels}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </BrowserRouter>
)
export default Router
