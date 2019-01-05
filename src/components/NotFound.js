import React from 'react'
import { hot } from 'react-hot-loader'

const NotFound = () => (
  <div className="pure-u">
    <h2>The resource requested was not found</h2>
    <hr/>
  </div>
)

export default hot(module)(NotFound)
