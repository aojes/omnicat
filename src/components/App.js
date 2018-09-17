import React from 'react'
//import { hot } from 'react-hot-loader'
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from './utils/getWeb3';
// import truffleContract from 'truffle-contract';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

class App extends React.Component {
  constructor() {
    super()
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null }
  }

  componentDidMount() {
    //console.log('componentDidMount...')
    // try {
    //   // Get network provider and web3 instance.
    //   const web3 = getWeb3();
    //
    //   // Use web3 to get the user's accounts.
    //   const accounts = await web3.eth.getAccounts();
    //
    //   //**** Get the contract instance.
    //   // const Contract = truffleContract(SimpleStorageContract);
    //   // Contract.setProvider(web3.currentProvider);
    //   // const instance = await Contract.deployed();
    //
    //   //**** Set web3, accounts, and contract to the state, and then proceed with an
    //   // example of interacting with the contract's methods.
    //   // this.setState({ web3, accounts, contract: instance }, this.runExample);
    // } catch (error) {
    //   // Catch any errors for any of the above operations.
    //   alert('Failed to load web3, accounts, or contract. Check console for details.');
    //   console.error(error);
    // }
  }

  runExample() {
    console.log('from async runExample() !')
    //const { accounts, contract } = this.state;
    //
    // // Stores a given value, 5 by default.
    // await contract.set(5, { from: accounts[0] });
    //
    // // Get the value from the contract to prove it worked.
    // const response = await contract.get();
    //
    // // Update state with the result.
    // this.setState({ storageValue: response.toNumber() });
  }

  render() {
    return (
      <div id="app-index" className="pure-g">
        <div id="header" className="pure-u-1 pure-u-md-7-24">
          <Header/>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-17-24">
          <Main/>
        </div>
        <div id="footer" className="pure-u-1">
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
