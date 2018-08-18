import React, { Component } from 'react'
// import SimpleStorageContract from './../../build/contracts/SimpleStorage.json'
import MigrationsContract from './../../build/contracts/Migrations.json'
import OwnableContract from './../../build/contracts/Ownable.json'
import OmniCatContract from './../../build/contracts/OmniCAT.json'
import IronLevelsContract from './../../build/contracts/IronLevels.json'
import Dass42Contract from './../../build/contracts/Dass42.json'
import getWeb3 from './../utils/getWeb3'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './../css/App.sass'

// SET STATE CONTRACTS HERE FOR NOW

let keys = { owner: null,
           ownable: { addr: null, def: null, inst: null },
              omni: { addr: null, def: null, inst: null },
              iron: { addr: null, def: null, inst: null },
              dass: { addr: null, def: null, inst: null },
              migs: { addr: null, def: null, inst: null },
              web3: null
            }

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      omni: null,
      dass: null,
      iron: null,
      migs: null,
      owner: null,
      ownable: null,
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
      keys.web3 = this.state.web3
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

    keys.ownable.def = contract(OwnableContract)
    keys.ownable.def.setProvider(keys.web3.currentProvider)

    keys.omni.def = contract(OmniCatContract)
    keys.omni.def.setProvider(keys.web3.currentProvider)

    keys.dass.def = contract(Dass42Contract)
    keys.dass.def.setProvider(keys.web3.currentProvider)

    keys.iron.def = contract(IronLevelsContract)
    keys.iron.def.setProvider(keys.web3.currentProvider)

    keys.migs.def = contract(MigrationsContract)
    keys.migs.def.setProvider(keys.web3.currentProvider)

    // Get accounts.
    keys.web3.eth.getAccounts((error, accounts) => {
      keys.owner = accounts[0]
      keys.ownable.def.deployed().then( (instance) => {
        keys.ownable.inst = instance
        keys.ownable.addr = keys.ownable.inst.address
      }).then((result) => {
        return this.setState({ omni: keys.ownable.inst.address })
      })

      keys.omni.def.deployed().then((instance) => {
        keys.omni.inst = instance
        keys.omni.addr = keys.omni.inst.address
      }).then((result) => {
        return this.setState({ omni: keys.omni.inst.address })
      })

      keys.dass.def.deployed().then((instance) => {
        keys.dass.inst = instance
        keys.dass.addr = keys.dass.inst.address
      }).then((result) => {
        return this.setState({ dass: keys.dass.inst.address })
      })

      keys.iron.def.deployed().then((instance) => {
        keys.iron.inst = instance
        keys.iron.addr = keys.iron.inst.address
      }).then((result) => {
        return this.setState({ iron: keys.iron.inst.address })
      })

      keys.migs.def.deployed().then((instance) => {
        keys.migs.inst = instance
        keys.migs.addr = keys.migs.inst.address
      }).then((result) => {
        return this.setState({ migs: keys.migs.inst.address })
      })
    })
  }

  render() {
    // delete keys.ownable.def
    // delete keys.migs.def
    // delete keys.omni.def
    // delete keys.iron.def
    // delete keys.dass.def
    // delete keys.we3
    return (
      <div id="app-index" className="pure-g">
        <div id="header" className="pure-u-1 pure-u-md-7-24">
          <Header/>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-17-24">
          <Main props={ keys  }/>
        </div>
        <div id="footer" className="pure-u-1">
          <Footer/>
        </div>
      </div>
    )
  }
}

export default App
