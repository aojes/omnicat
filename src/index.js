import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './utils/registerServiceWorker'
// import App from 'components/App'
// import App from './App'
import App from './App'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker()
