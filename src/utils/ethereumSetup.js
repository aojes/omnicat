
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
contr.address = process.env.OMNICAT_CONTRACT_ADDRESS

web3.eth.defaultAccount = web3.eth.accounts[0]

const contract = web3.eth.contract(contr.abi).at(contr.address)
export { contract }
