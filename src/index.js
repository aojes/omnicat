import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// WAIT import registerServiceWorker from './utils/registerServiceWorker'
import App from './components/App'
import './index.sass'
import './css/animista.scss'

const renderApp = () => render(<Router><App/></Router>, document.getElementById('root'))

renderApp()
module.hot.accept(renderApp)
// registerServiceWorker()
