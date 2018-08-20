var env = require('dotenv').config({ path: '.env' })

const HDWalletProvider = require('truffle-hdwallet-provider')
module.exports = {
  networks: { // truffle develop --network dev
    dev: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      provider: function() {
        return new HDWalletProvider(
          env.TRUFFLE_DEV_MNEMONIC, 'http://127.0.0.1:9545/')
      }
    }
    ,gcli: { // tab1: ganache-cli  & tab2: truffle console --network gcli
      host: 'localhost',
      port: 8545,
      network_id: '*',
      provider: function() {
        return new HDWalletProvider(
          env.GCLI_MNEMONIC, "http://127.0.0.1:8545/m/44'/60'/0'/0/1")
      }
    }
    ,ganache: { // run Ganache app and 'truffle console --network ganache'
      host: 'localhost',
      port: 7545,
      network_id: '5777',
      provider: function() {
        return new HDWalletProvider(
          env.GANACHE_APP_MNEMONIC, "http://127.0.0.1:7545/m/44'/60'/0'/0/1")
      }
    }
  }
}
/***

rinkeby: {
  provider: function() { return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io') },
  network_id: '*',
  gas: 4500000,
  gasPrice: 25000000000,
},
ropsten: {
  provider: function() { return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/<infura key>') },
  network_id: '*',
  gas: 4500000,
  gasPrice: 25000000000,
}
*/
