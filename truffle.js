// const HDWalletProvider = require('truffle-hdwallet-provider')
module.exports = {
  // truffle develop --network dev
  // use this until farther along
  networks: {
    dev: {
      host: 'localhost',
      port: 9545,
      network_id: '*'
    },
    ganache: { // run Ganache app and 'truffle console --network ganache'
      host: 'localhost',
      port: 7545,
      network_id: '5777'
    }
  }
}
