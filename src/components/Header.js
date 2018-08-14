import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><NavLink to='/' className="nav-link">Home</NavLink></li>
        <li>CATS</li>
          <ul>
            <li><NavLink to='/physical-fitness' className="nav-link">Physical Fitness</NavLink></li>
            <li><NavLink to='/biochemistry' className="nav-link">Biochemistry</NavLink></li>
            <ul>
              <li><NavLink to='/iron' className="nav-link">Iron Optimiser</NavLink></li>
            </ul>
            <li><NavLink to='/brain-health' className="nav-link">Brain Health</NavLink></li>
            <ul>
              <li><NavLink to='/dass' className="nav-link">DASS42</NavLink></li>
            </ul>
            <li><NavLink to='/hormones' className="nav-link">Hormones</NavLink></li>
            <li><NavLink to='/wellness' className="nav-link">Wellness</NavLink></li>
            <li><NavLink to='/aesthetics' className="nav-link">Aesthetics</NavLink></li>
            <li><NavLink to='/risk-and-prevention' className="nav-link">Rish and Prevention</NavLink></li>
          </ul>
        <li><NavLink to='/about' className="nav-link">About omniCAT</NavLink></li>
        <li><NavLink to='/crowdsale' className="nav-link">Crowdsale</NavLink></li>
      </ul>
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
