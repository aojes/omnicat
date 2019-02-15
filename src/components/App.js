import React, { useEffect } from 'react'

// import getWeb3 from './../utils/getWeb3';
// import truffleContract from 'truffle-contract';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../css/App.sass'
import neatness from '../utils/neatness'

const App = () => {
  useEffect(() => {
    neatness(document.getElementById('neatness'))
  })
  // TODO: REVIEW truffle react sample
  return (
    <div id="app-set-container" className="container">
      <div className="row">
        <div className="col-4">
          <Header/>
        </div>
        <div className="col-8">
          <Main/>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Footer/>
        </div>
      </div>
    </div>
  )
}

export default App
