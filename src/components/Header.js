import React from 'react'
// import {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './../css/Header.sass'
const {log} = console
const Header = () => {
  return(
    <header>
      <nav>
        <div className="nav-inner">
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
                      <li className="pure-menu-item"><NavLink to='/iron' className="pure-menu-link">Iron Optimiser <span className="emoji-red-heart">❤️</span></NavLink></li>
                    </ul>
                  </li>
                  <li className="pure-menu-item"><NavLink to='/brain-health' className="pure-menu-link">Brain Health</NavLink></li>
                  <li>
                    <ul className="pure-menu-list menu-order-3">
                      <li className="pure-menu-item"><NavLink to='/dass42' className="pure-menu-link">Dass42 <span className="emoji-red-heart">❤️</span></NavLink></li>
                    </ul>
                  </li>
                  <li className="pure-menu-item"><NavLink to='/hormones' className="pure-menu-link">Hormones</NavLink></li>
                  <li className="pure-menu-item"><NavLink to='/wellness' className="pure-menu-link">Wellness <span className="emoji-red-heart">❤️</span></NavLink></li>
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
}
export default Header
// <li className="pure-menu-item">
//   <Link to="https://gitlab.com/crockett.jesse/omnicat" className="pure-menu-link">
//     <img className="simple-icon" id="react" height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/react.svg" />
//     <img className="simple-icon" id="ethereum" height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ethereum.svg" />
//     <img className="simple-icon" id="gitlab" height="24" width="24" src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/gitlab.svg" />
//     Project Source
//   </Link></li>
