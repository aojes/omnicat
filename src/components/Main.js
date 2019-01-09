import React from 'react'
import { hot } from 'react-hot-loader'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Dass42 from './Dass42'
import IronLevels from './IronLevels'
import About from './About'
import Aesthetics from './Aesthetics'
import BrainHealth from './BrainHealth'
import Biochemistry from './Biochemistry'
import Crowdsale from './Crowdsale'
import Hormones from './Hormones'
import PhysicalFitness from './PhysicalFitness'
import RiskAndPrevention from './RiskAndPrevention'
import Wellness from './Wellness'
import Products from './Products'
import NotFound from './NotFound'
import '../css/Main.sass'

const Main = () => (
  <main id="main-content">
    <section>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/dass42' component={Dass42}/>
        <Route exact path='/iron' component={IronLevels}/>
        <Route exact path='/aesthetics' component={Aesthetics}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/biochemistry' component={Biochemistry}/>
        <Route exact path='/brain-health' component={BrainHealth}/>
        <Route exact path='/crowdsale' component={Crowdsale}/>
        <Route exact path='/hormones' component={Hormones}/>
        <Route exact path='/physical-fitness' component={PhysicalFitness}/>
        <Route exact path='/risk-and-prevention' component={RiskAndPrevention}/>
        <Route exact path='/wellness' component={Wellness}/>
        <Route exact path='/products' component={Products}/>
        <Route path='*' component={NotFound}/>
      </Switch>
    </section>
  </main>
)


export default hot(module)(Main)
