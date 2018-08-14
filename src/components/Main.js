import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Dass42 from './Dass42'
import IronLevels from './IronLevels'
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/dass' component={Dass42}/>
      <Route exact path='/iron' component={IronLevels}/>
    </Switch>
  </main>
)

export default Main
