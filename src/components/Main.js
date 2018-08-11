import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dass42 from './Dass42'
import IronLevels from './IronLevels'
import Home from './Home'
import NotFound from './NotFound'

export default class Main extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/dass' component={Dass42}/>
          <Route exact path='/iron' component={IronLevels}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </main>
    )
  }
}
