import React from 'react'

// import getWeb3 from './../utils/getWeb3';
// import truffleContract from 'truffle-contract';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

function App() {
  // REVIEW truffle react sample
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <Header/>
        </div>
        <div className="col-md-8">
          <Main/>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Footer/>
        </div>
      </div>
    </div>
  )
}
export default App
