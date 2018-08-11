import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('has storageValue && web3 properties', () => {
  const newapp = new App()
  expect(newapp.state.hasOwnProperty('storageValue')).toBe(true)
  expect(newapp.state.hasOwnProperty('web3')).toBe(true)
})
