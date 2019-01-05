import React from 'react'
import { hot } from 'react-hot-loader'
import '../css/Footer.sass'

function Footer(props) {
  return (
    <footer id={props.id} className={props.className}>
      <p>footer content</p>
      <p>...</p>
      <p>...</p>
    </footer>
  )
}

export default hot(module)(Footer)
