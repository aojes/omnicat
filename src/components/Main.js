import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dass42 from 'components/Dass42'
import IronLevels from 'components/IronLevels'
import Home from 'components/Home'
import NotFound from 'components/NotFound'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/dass' component={Dass42}/>
      <Route exact path='/iron' component={IronLevels}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
)

export default Main