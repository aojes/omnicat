import React from 'react'
import { hot } from 'react-hot-loader'
import { NavLink } from 'react-router-dom'
import '../css/Header.sass'

const Header = () => (
  <header id="header-content">
    <nav>
      <ul className="nav flex-column menu-order-1">
        <li id="home-link" className="nav-item">
          <NavLink to='/' className="home-link nav-link">Home</NavLink>
        </li>
        <li>
          <ul className="nav flex-column menu-order-2">
            <li className="nav-item">
              <NavLink to='/physical-fitness' className="nav-link">Physical Fitness</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/biochemistry' className="nav-link">Biochemistry</NavLink>
            </li>
            <li>
              <ul className="nav flex-column menu-order-3">
                <li className="nav-item">
                  <NavLink to='/iron' className="nav-link">Iron Optimiser
                    <span className="emoji-red-heart">❤️</span></NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to='/brain-health' className="nav-link">Brain Health</NavLink>
            </li>
            <li>
              <ul className="nav flex-column menu-order-3">
                <li className="nav-item">
                  <NavLink to='/dass42' className="nav-link">Dass42
                    <span className="emoji-red-heart">❤️</span></NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to='/hormones' className="nav-link">Hormones</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/wellness' className="nav-link">Wellness
                <span className="emoji-red-heart">❤️</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/aesthetics' className="nav-link">Aesthetics
                <span className="emoji-red-heart">❤️</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/risk-and-prevention' className="nav-link">Risk &amp; Prevention</NavLink>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <NavLink to='/about' className="nav-link">About OmniCAT</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/products' className="nav-link">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/crowdsale' className="nav-link">Crowdsale</NavLink>
        </li>
      </ul>
    </nav>
  </header>
)

export default hot(module)(Header)
