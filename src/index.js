import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './utils/registerServiceWorker'

import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker()
