import React from 'react'
//import { hot } from 'react-hot-loader'
import { NavLink } from 'react-router-dom'
import './../css/Header.sass'

const Header = () => (
  <header>
    <nav>
      {/*<a href="#" className="nav-menu-button">Menu</a>*/}
      <div className="nav-inner">
        {/*<button className="primary-button pure-button">Compose</button>*/}
        <div className="pure-menu">
          <ul className="pure-menu-list menu-order-1">
            <li id="home-link" className="pure-menu-item">
              <NavLink to='/' className="home-link pure-menu-link">Home</NavLink>
            </li>
            <li>
              <ul className="pure-menu-list menu-order-2">
                <li className="pure-menu-item"><NavLink to='/physical-fitness' className="pure-menu-link">Physical Fitness</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/biochemistry' className="pure-menu-link">Biochemistry</NavLink></li>
                <li>
                  <ul className="pure-menu-list menu-order-3">
                    <li className="pure-menu-item"><NavLink to='/iron' className="pure-menu-link">Iron Optimiser</NavLink></li>
                  </ul>
                </li>
                <li className="pure-menu-item"><NavLink to='/brain-health' className="pure-menu-link">Brain Health</NavLink></li>
                <li>
                  <ul className="pure-menu-list menu-order-3">
                    <li className="pure-menu-item"><NavLink to='/dass42' className="pure-menu-link">Dass42</NavLink></li>
                  </ul>
                </li>
                <li className="pure-menu-item"><NavLink to='/hormones' className="pure-menu-link">Hormones</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/wellness' className="pure-menu-link">Wellness</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/aesthetics' className="pure-menu-link">Aesthetics</NavLink></li>
                <li className="pure-menu-item"><NavLink to='/risk-and-prevention' className="pure-menu-link">Risk &amp; Prevention</NavLink></li>
              </ul>
            </li>
            <li className="pure-menu-item"><NavLink to='/about' className="pure-menu-link">About OmniCAT</NavLink></li>
            <li className="pure-menu-item"><NavLink to='/products' className="pure-menu-link">Products</NavLink></li>
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
