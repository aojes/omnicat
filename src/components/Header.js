import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../css/Header.sass'

const Header = () => {
  return(
    <header id="header-content" className="shadow-drop-center position-fixed">
      <nav id="movingBorder">
        <ul id="ul-moving-border" className="nav flex-column menu-order-1">
          <li id="home-link" className="nav-item">
            <NavLink to='/' className="home-link nav-link" activeClassName="active shadow-drop-center">Home</NavLink>
          </li>
          <li>
            <ul className="nav flex-column menu-order-2">
              <li className="nav-item">
                <NavLink to='/physical-fitness' className="nav-link" activeClassName="active shadow-drop-center">Physical Fitness</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/biochemistry' className="nav-link" activeClassName="active shadow-drop-center">Biochemistry</NavLink>
              </li>
              <li>
                <ul className="nav flex-column menu-order-3">
                  <li className="nav-item">
                    <NavLink to='/iron' className="nav-link" activeClassName="active shadow-drop-center">Iron Optimiser
                      <span className="emoji-heart">❤️</span></NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to='/brain-health' className="nav-link" activeClassName="active shadow-drop-center">Brain Health</NavLink>
              </li>
              <li>
                <ul className="nav flex-column menu-order-3">
                  <li className="nav-item">
                    <NavLink to='/dass42' className="nav-link" activeClassName="active shadow-drop-center">Dass42
                      <span className="emoji-heart">❤️</span></NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to='/hormones' className="nav-link" activeClassName="active shadow-drop-center">Hormones</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/wellness' className="nav-link" activeClassName="active shadow-drop-center">Wellness
                  <span className="emoji-heart">❤️</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/aesthetics' className="nav-link" activeClassName="active shadow-drop-center">Aesthetics
                  <span className="emoji-heart">❤️</span></NavLink>
              </li>
              <li className="nav-item">
                <NavLink to='/risk-and-prevention' className="nav-link" activeClassName="active shadow-drop-center">Risk &amp; Prevention</NavLink>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to='/about' className="nav-link shadow-drop-center">
              <strong>About</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/products' className="nav-link shadow-drop-center">
              <strong>Products</strong>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to='/crowdsale' className="nav-link shadow-drop-center">
              <strong>Crowdsale</strong>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
