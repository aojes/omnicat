
// As a general http server:

// var ganache = require("ganache-cli");
// var server = ganache.server();
// server.listen(port, function(err, blockchain) {...});
import Web3 from 'web3'

// As a Web3 provider:
const ganache = require("ganache-cli")
const web3 = new Web3(new Web3.providers.setProvider(ganache.provider()))

// As a
// const server = ganache.server()
// server.listen(process.env.PORT, (err, blockchain) => {})

let contr = {}
contr.abi = [] // npx solcjs --abi contracts/OmniCAT.sol
contr.address = process.env.OMNICAT_CONTRACT_ADDRESS // '0xae484a0532f066e868f985bc7a2e3473c33cfc1c'

web3.eth.defaultAccount = web3.eth.accounts[0]

const contract = web3.eth.contract(contr.abi).at(contr.address)
export { contract }

/* [omnicat (master)]$ truffle migrate --reset --network development
Using network 'development'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0xd49cebe502f8656aaf0bdac4a95b12e66dcb3b835e93baff9c3a48249f5b44da
  Migrations: 0x2c8f682e8a1b902771698040bc7dcaec3023ed42
Saving successful migration to network...
  ... 0xacc3dee5cf45566fa0cf4997f4bc2318e0a52e9d8afbfe8efea33831deca86d4
Saving artifacts...
Running migration: 2_deploy_contract.js
  Replacing OmniCAT...
  ... 0xab2e52c94877ead57aec339095b2a4f4aafc8f03e27b6b02cb8ff384091fe77f
  OmniCAT: 0xae484a0532f066e868f985bc7a2e3473c33cfc1c
  Replacing IronLevels...
  ... 0x5c5c6be3c4734b8f4d53bcc8d71c69b722b31ebf30c1625ae1d585ee57686ed1
  IronLevels: 0xdfb0933ce30b37f1e87437a7a966871cdd633efc
  Replacing Dass42...
  ... 0x259c852a83d64fbf99bed8045cbbdfddc6f1892e622a583966de84180d5c86c4
  Dass42: 0x6b8f0eb3105af69217d0f2e509af473e45e65032
Saving successful migration to network...
  ... 0xa6b18826c9ef8b3e69ebe6085bad3265d719872c870f8aa85cb5fa5535ac9064
Saving artifacts...
*/