import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header className="pure-g">
    <nav id="nav" className="pure-u-1-3">
      {/*<a href="#" className="nav-menu-button">Menu</a>*/}
      <div className="nav-inner">
        {/*<button className="primary-button pure-button">Compose</button>*/}
        <div className="pure-menu">
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><NavLink to='/' className="pure-menu-link">Home</NavLink></li>
            <li className="pure-menu-heading">CATS</li>
              <ul className="pure-menu-list">
                <li className="pure-menu-item"><NavLink to='/physical-fitness' className="pure-menu-link">Physical Fitness</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/biochemistry' className="pure-menu-link">Biochemistry</NavLink></li>
                <ul className="pure-menu-list">
                  <li className="pure-menu-item"><NavLink to='/iron' className="pure-menu-link">Iron Optimiser</NavLink></li>
                </ul>
                <li className="pure-menu-item"><NavLink to='/brain-health' className="pure-menu-link">Brain Health</NavLink></li>
                <ul className="pure-menu-list">
                  <li className="pure-menu-item"><NavLink to='/dass' className="pure-menu-link">DASS42</NavLink></li>
                </ul>
                <li className="pure-menu-item"><NavLink to='/hormones' className="pure-menu-link">Hormones</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/wellness' className="pure-menu-link">Wellness</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/aesthetics' className="pure-menu-link">Aesthetics</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/risk-and-prevention' className="pure-menu-link">Risk and Prevention</NavLink></li>
              </ul>
            <li className="pure-menu-item"><NavLink to='/about' className="pure-menu-link">About omniCAT</NavLink></li>
            <li className="pure-menu-item"><NavLink to='/crowdsale' className="pure-menu-link">Crowdsale</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
// Home
// CATs
//   Physical Fitness
//   Biochemistry
//     Iron Optimiser
//   Brain Health
//     DASS42 (Depression, Anxiety and Stress Scale)
//   Hormones
//   Wellness
//   Aesthetics
//   Risk and Prevention
// About
// Crowdsale
