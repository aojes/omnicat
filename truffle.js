var env = require('dotenv').config({
  path: '.env'
})
env.local = require('dotenv').config({
  path: '.env.local'
})
const HDWalletProvider = require('truffle-hdwallet-provider')
module.exports = {
  networks: {
    dev: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      provider: function() {
        return new HDWalletProvider(
          env.local.TRUFFLE_DEV_MNEMONIC, 'http://127.0.0.1:9545')
      }
    },
    gn: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      provider: function() {
        return new HDWalletProvider(
          env.local.GANACHE_CLI_MNEMONIC, 'http://127.0.0.1:8545')
      }
    }
  }
}

// rinkeby: {
//   provider: function() { return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io') },
//   network_id: '*',
//   gas: 4500000,
//   gasPrice: 25000000000,
// },
// ropsten: {
//   provider: function() { return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/<infura key>') },
//   network_id: '*',
//   gas: 4500000,
//   gasPrice: 25000000000,
// },
