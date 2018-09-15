import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker'
import App from './components/App'
// import Hi from './components/Hi'
import './index.sass'

ReactDOM.render((<BrowserRouter><App/></BrowserRouter>),
  document.getElementById('root') )
registerServiceWorker()
