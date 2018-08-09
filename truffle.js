var env = require('dotenv').config({path: '.env'})
env.local = require('dotenv').config({path: '.env.local'})
const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
  networks: {
    truf: {
      host: env.local.LOCALHOST_IP,
      port: env.local.TRUF_DEV_PORT,
      network_id: '*'
    },
    hdwallet: {
      host: env.local.LOCALHOST_IP,
      port: env.local.TRUF_DEV_PORT,
      network_id: '*',
      provider: function() {
        return new HDWalletProvider(env.local.TRUF_DEV_MNEMONIC, 'http://127.0.0.1:9545')
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
    // config for solidity-coverage
    /*coverage: {
      host: 'localhost',
      network_id: '*',
      port: 7545, // <-- If you change this, also set the port option in .solcover.js.
      gas: 0xfffffffffff, // <-- Use this high gas value
      gasPrice: 0x01, // <-- Use this low gas price
    },*/
  }
}

/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

// See <http://truffleframework.com/docs/advanced/configuration>
// to customize your Truffle configuration!

// require('dotenv').config()

// module.exports = {
//   networks: {
//     development: {
//       host: 'localhost',
//       port: 8545,
//       network_id: '*',
//       gas: 7200000//,
//       // gasPrice: 10000000000 //,
//       // provider: function() {
//       //   return new HDWalletProvider(mnemonic_local, 'http://127.0.0.1:8545/')
//       // }
//     },
//     test: {
//       host: 'localhost',
//       port: 8545,
//       network_id: '*'//,
//       // gas: 7200000,
//       // gasPrice: 10000000000,
//       // provider: function() {
//       //   return new HDWalletProvider(mnemonic_test, 'http://127.0.0.1:8545/')
//       // }
//     },
//     ropsten: {
//       provider: function() {
//         return new HDWalletProvider(
//           mnemonic_ropsten,
//           'https://ropsten.infura.io/v3/dd504a8b6c6d4c1c83d77d9bacd520af'
//         )
//       },
//       network_id: '3' // official id of the ropsten network
//     }
//   }
  // ,
  // mocha: {
  //   useColors: true
  // }
//}
//
// [truffle_react_box (ganache-setup)]$ ganache-cli
// Ganache CLI v6.1.6 (ganache-core: 2.1.5)
//
// Available Accounts
// ==================
// (0) 0xf1c53751b092ba7dfa0cd5675df84b1577e76e17 (~100 ETH)
// (1) 0x2fcb70845be9fb2dd4b576b588a547a683dbc23e (~100 ETH)
// (2) 0xf1407560fd4c68e24e1d8dcb12c53ce877481022 (~100 ETH)
// (3) 0xfaabb7d6aeca5e8032a2fe5be58ea970c3a9d94c (~100 ETH)
// (4) 0x1272d875cba3deb99d5b7893a02fadfc69c92118 (~100 ETH)
// (5) 0xf1b906c6565410d450b78d2398b2c040b89aaf3e (~100 ETH)
// (6) 0xc425b75acd3011685321ea768f74a3941d439ad1 (~100 ETH)
// (7) 0x1b13365f8d26836a8a040ada9e5ecd9f679c2f58 (~100 ETH)
// (8) 0x9352bed3f92bfca0a1cdb9073203794bd2797948 (~100 ETH)
// (9) 0xa18219b28e3ff5d3ad3370075670ee1833341d37 (~100 ETH)
//
// Private Keys
// ==================
// (0) 0x8212fc013a198f650b921ee17b3b0f4cb0e9245d556123f403104b8123451fb8
// (1) 0x20c4f8be34c7419fe0d25910d375849390ae5f13948b4398e71bd5960fb23443
// (2) 0xc05b1f9e4939472135327c8209d8c546943c45f1e18c6f61b76fcae8cc041eac
// (3) 0xd7407134514ed004fa6125a14381fe78d889046338b9ae28b8f70eaf333ca502
// (4) 0x005b5c8571d35281b4005e0fc36c57b55f2ad5347720d6f6414b6d83bc35a7db
// (5) 0x0ed20252f16986b0f5c912a93eaf3c5fa8bcc54c0185ef7bb888b9bbe3259b73
// (6) 0xce9c3c5905a9041346021345725efbbbb4489b9c8268a8f60b73c307bc513f55
// (7) 0xdee22ee8165921dda8e821f9f712e4e608267d41becfc1ca34c0c3b613e6c48b
// (8) 0x492b1fa9e4f7e8192c4ddaa529ffc0a18e4da3aa4abe09875fa7c4fc92330adc
// (9) 0x1831c6a1d807c2cf89679c758eff335f266d051730b5046339415fa011df03a8
//
// HD Wallet
// ==================
// Mnemonic:      oven pill shock plate reunion marine demand witness black apart left oblige
// Base HD Path:  m/44'/60'/0'/0/{account_index}
//
// Gas Price
// ==================
// 20000000000
//
// Gas Limit
// ==================
// 6721975
//
// Listening on 127.0.0.1:8545
