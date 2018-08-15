import React, { Component } from 'react'
// import SimpleStorageContract from './../../build/contracts/SimpleStorage.json'
import OmniCatContract from './../../build/contracts/OmniCAT.json'
import getWeb3 from './../utils/getWeb3'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './../css/oswald.css'
import './../css/open-sans.css'
import './../css/pure-min.css'
import './../css/App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
    const omniCat = contract(OmniCatContract)
    omniCat.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var omniCatInstance;

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      omniCat.deployed().then((instance) => {
        omniCatInstance = instance
        // Stores a given value, 5 by default.
        return omniCatInstance.setSimpleValue(18, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return omniCatInstance.getSimpleValue.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  render() {
    return (
      <div className="container pure-g">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App
