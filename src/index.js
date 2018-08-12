import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Dass42 from './Dass42'
import IronLevels from './IronLevels'
import Home from './Home'
import NotFound from './NotFound'
import './index.css'
import registerServiceWorker from './utils/registerServiceWorker'
// import App from './App'
// import App from './App'
import App from './App'

ReactDOM.render((
  <div className="app-root">
    <App />
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/dass' component={Dass42}/>
        <Route exact path='/iron' component={IronLevels}/>
        <Route path='*' component={NotFound}/>
      </Switch>
    </BrowserRouter>
  </div>
), document.getElementById('root'))

registerServiceWorker()
