import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component{
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/dass'>DASS42</Link></li>
            <li><Link to='/iron'>Iron Levels</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}
export default Header
