import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Link } from 'react-router-dom'
// import { }
import App from '../App'

test('renders without crashing', () => {
  // const div = document.createElement('div')
  const r = document.getElementById('root')
  ReactDOM.render( { return (<App />) }, r)

})

test('has storageValue && web3 properties', () => {
  const newapp = new App()
  expect(newapp.state.hasOwnProperty('storageValue')).toBe(true)
  expect(newapp.state.hasOwnProperty('web3')).toBe(true)
})
