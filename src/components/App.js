import React from 'react'
// import { Switch, Route } from 'react-router-dom'

import 'components/css/App.css'
// import { contract } from "utils/ethereumSetup"
import Header from 'components/Header'
import Main from 'components/Main'


const App = () => (
  <div>
    <h1>Hello World</h1>
    <Header />
    <Main />
  </div>
)

export default App


// <div>
//   <div>
//     <header>
//       <Welcome name="Jesse" />
//       <Clock date={new Date()} />
//     </header>
//   </div>
//   <p><Link to="/" label="OmniCAT Home Page" /></p>
//   <p><Link to="/dass" label="Dass42 Evaluation" /></p>
//   <p><Link to="/iron" label="Iron Levels Evaluation" /></p>
//   <p>
//     {contract.address}
//   </p>
//   <p>
//     {this.props.children}
//   </p>
// </div>