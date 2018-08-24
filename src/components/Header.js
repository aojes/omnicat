import React from 'react'
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
            <li id="home-link" className="pure-menu-item item-order-1">
              <NavLink to='/' className="home-link pure-menu-link">
                OmniCAT
              </NavLink>
            </li>
            <li className="pure-menu-heading nav-heading item-order-1">
              <ul className="pure-menu-list menu-order-2">
                <li className="pure-menu-item item-order-2"><NavLink to='/physical-fitness' className="pure-menu-link">Physical Fitness</NavLink></li>
                <li className="pure-menu-item item-order-2"><NavLink to='/biochemistry' className="pure-menu-link">Biochemistry</NavLink></li>
                <ul className="pure-menu-list menu-order-3">
                  <li className="pure-menu-item item-order-3"><NavLink to='/iron' className="pure-menu-link">Iron Optimiser</NavLink></li>
                </ul>
                <li className="pure-menu-item item-order-2"><NavLink to='/brain-health' className="pure-menu-link">Brain Health</NavLink></li>
                <ul className="pure-menu-list menu-order-3">
                  <li className="pure-menu-item item-order-3"><NavLink to='/dass42' className="pure-menu-link">Dass42</NavLink></li>
                </ul>
                <li className="pure-menu-item item-order-2"><NavLink to='/hormones' className="pure-menu-link">Hormones</NavLink></li>
                <li className="pure-menu-item item-order-2"><NavLink to='/wellness' className="pure-menu-link">Wellness</NavLink></li>
                <li className="pure-menu-item item-order-2"><NavLink to='/aesthetics' className="pure-menu-link">Aesthetics</NavLink></li>
                <li className="pure-menu-item item-order-2"><NavLink to='/risk-and-prevention' className="pure-menu-link">Risk &amp; Prevention</NavLink></li>
              </ul>
            </li>
            <li className="pure-menu-item item-order-1"><NavLink to='/about' className="pure-menu-link">About OmniCAT</NavLink></li>
            <li className="pure-menu-item item-order-1"><NavLink to='/crowdsale' className="pure-menu-link">Crowdsale</NavLink></li>
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
