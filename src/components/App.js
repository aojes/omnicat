import React, { useEffect } from "react";

// import getWeb3 from './../utils/getWeb3';
// import truffleContract from 'truffle-contract';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "/scss/App";
import neat from "/utils/neat";

const App = () => {
  useEffect(() => {
    neat(document.getElementById("neat"));
  });
  // TODO: REVIEW truffle react sample
  return (
    <div id="app-set-container" className="container">
      <div className="row">
        <div className="col-4">
          <Header />
        </div>
        <div className="col-8">
          <Main />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
