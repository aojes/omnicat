import React, {Component} from 'react'
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
import NotFound from './NotFound'
import './../css/Main.sass'

class Main extends Component {
  render() {
    return (
      <main>
        <section>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/dass' component={Dass42}/>
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
            <Route path='*' component={NotFound}/>
          </Switch>
        </section>
      </main>
    )
  }
}

export default Main
// <div className="">
//   <code>
//     { JSON.stringify(this.props, null, 2) }
//   </code>
//   <br/>
// </div>
