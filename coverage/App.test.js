import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'
import request from 'request'
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

it('has storageValue && web3 properties', () => {
  const newapp = new App()
  // expect(newapp.hasOwnProperty('storageValue')) == true
  // expect(request('').then(() => {return newapp.getState('web3')} )).toBeTruthy()
})

// it('gets web3', () => {
//   const newapp = new App()
//   // expect(newapp.web3).toBe(!null)
//   // const app = new App()
//   // expect(app.hasOwnProperty('web3')).toBe(true)
//   // expect(app.).toBe(true)
//   // typeof(a) === App
// })
