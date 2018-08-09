import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import 'index.css'
import registerServiceWorker from 'utils/registerServiceWorker'
import App from 'components/App'

render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))

registerServiceWorker()
