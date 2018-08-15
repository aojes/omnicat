import React, { Component } from 'react'
// import SimpleStorageContract from './../../build/contracts/SimpleStorage.json'
import OmniCatContract from './../../build/contracts/OmniCAT.json'
import IronLevelsContract from './../../build/contracts/IronLevels.json'
import Dass42Contract from './../../build/contracts/Dass42.json'
import getWeb3 from './../utils/getWeb3'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './../css/oswald.css'
import './../css/open-sans.css'
import './../css/pure-min.css'
import './../css/App.css'

// ?? SET STATE CONTRACTS HERE FOR NOW
let omniCat = {
      self:   { def: null, inst: null },
      iron:   { def: null, inst: null },
      dass42: { def: null, inst: null }
    }

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      omniCat: null,
      dass42: null,
      iron: null,
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
      this.instantiateContracts()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContracts() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const contract = require('truffle-contract')

    omniCat.self.def = contract(OmniCatContract)
    omniCat.self.def.setProvider(this.state.web3.currentProvider)

    omniCat.dass42.def = contract(Dass42Contract)
    omniCat.dass42.def.setProvider(this.state.web3.currentProvider)

    omniCat.iron.def = contract(IronLevelsContract)
    omniCat.iron.def.setProvider(this.state.web3.currentProvider)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      omniCat.self.def.deployed().then((instance) => {
        omniCat.self.inst = instance
        // Stores a given value, 5 by default.
      }).then((result) => {
        // Update state with the result.
        return this.setState({ omniCat: omniCat.self.inst.address })
      })

      omniCat.dass42.def.deployed().then((instance) => {
        omniCat.dass42.inst = instance
      }).then((result) => {
        // Update state with the result.
        return this.setState({ dass42: omniCat.dass42.inst.address })
      })

      omniCat.iron.def.deployed().then((instance) => {
        omniCat.iron.inst = instance
      }).then((result) => {
        // Update state with the result.
        return this.setState({ iron: omniCat.iron.inst.address })
      })
    })
  }

  render() {
    return (
      <div className="container pure-g">
        <Header />
        <Main props={ omniCat } />
        <Footer />
      </div>
    )
  }
}

export default App
