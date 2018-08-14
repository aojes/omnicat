import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from '../src/components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((<BrowserRouter><App /></BrowserRouter>), div)
  // expect(div).toMatch(new RegExp(/.*(React version).*15\.6\.2.*/) )
});

test('has storageValue && web3 properties', () => {
  const newapp = new App()
  expect(newapp.state.hasOwnProperty('storageValue')).toBe(true)
  expect(newapp.state.hasOwnProperty('web3')).toBe(true)
})
