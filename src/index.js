import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import '/index.sass'
import '/scss/animista.scss'
import App from '/components/App'
import * as serviceWorker from '/utils/serviceWorker'


const renderApp = () => render(<Router><App/></Router>, document.getElementById('root'))

renderApp()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
