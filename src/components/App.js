import React, { useEffect } from 'react'

// import getWeb3 from './../utils/getWeb3';
// import truffleContract from 'truffle-contract';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import '../css/App.sass'
import neatness from '../utils/neatness'

function App() {
  useEffect(() => {
    neatness(document.getElementById('neatness'))
  })
  // TODO: REVIEW truffle react sample
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 col-lg-4">
          <Header/>
        </div>
        <div className="col-md-12 col-lg-8">
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

//
// function neatnav() {
//   const borderColorOpacity = 1,
//     borderColor1 = `rgba(249,32,86, ${borderColorOpacity})`,
//     borderColor2 = `rgba(0,222,255, ${borderColorOpacity})`,
//     header = document.getElementById('neatness')
//
//   let i = 0, k = 30, l = 60
//
//   function getNextShadowPosition(shadow, offset){
//     shadow.x = -Math.cos((i + offset)/10) * 10 ;
//     shadow.y = -Math.sin((i + offset)/10) * 10;
//   }
//
//   function shadowToString() {
//     getNextShadowPosition(this, this.shadowOffset);
//
//     return this.x + 'px ' + this.y + 'px ' + this.blured + 'px ' + this.color
//   }
//
//   function showAndMove() {
//     showAndMove.timer = setTimeout(function f() {
//
//       //change border
//       header.style.borderImageRadius = '2em'
//       header.style.borderImage = `linear-gradient(${i}deg, ${borderColor1} ${k}%, ${borderColor2} ${l}%)`
//       i++
//
//       //cycle
//       showAndMove.timer = setTimeout(f, 50)
//     }, 0)
//   }
//
//   return showAndMove()
// }
