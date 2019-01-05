import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker'
import App from './components/App'
import './index.sass'

function renderApp() {
  render(
    <BrowserRouter><App/></BrowserRouter>, document.getElementById('root')
  )
}

renderApp()
module.hot.accept(renderApp)
registerServiceWorker()
