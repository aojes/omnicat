import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import registerServiceWorker from './utils/registerServiceWorker'
import App from './components/App'

const appRootElement = document.getElementById('root')
ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), appRootElement )

registerServiceWorker()
