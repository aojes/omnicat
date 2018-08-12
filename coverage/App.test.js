import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from '../src/App';

test('has storageValue && web3 properties', () => {
  const newapp = new App()
  expect(newapp.state.hasOwnProperty('storageValue')).toBe(true)
  expect(newapp.state.hasOwnProperty('web3')).toBe(true)
})

it('renders without crashing', () => {
  const div = document.createElement('div');

  // const StoreInstance = Store();

  ReactDOM.render((
     // <Provider store={StoreInstance}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
     // </Provider>,
  ), div)
});

// import React from 'react'
// import ReactDOM from 'react-dom'
// // import  from 'react-router-dom'
// import App from '../src/App'
//
// test('renders without crashing', () => {
//   const div = document.createElement('div')
//   // const toro = document.getElementById('root')
//   ReactDOM.render( <App />, div )
//
// })
