const assert = require('assert');
const contract = require('truffle-contract')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const json = require('./../build/contracts/OmniCAT.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

let accounts, omnicat, owner, omnicatInstance;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts((error, accounts) => {
    owner = accounts[0];
    return accounts;
  });

  omnicat = contract(json)
  omnicat.setProvider(web3.currentProvider)
  omnicat.deployed().then((instance) => {
      omnicatInstance = instance
      // keys.owner = keys.omni.inst.owner.call()
    }).then((result) => {
      // Update state with the result.
      omnicatInstance.send({ from: owner, gas: '1000000' });
    })
});

describe('OmniCAT', () => {

  it('deploys a contract', async () => {

    const omnicatOwner = omnicat.owner

    assert.equal(owner, omnicatOwner,
      "The manager/owner is the one who launches the smart contract.")
  });

  // Continue from this line from now on...

});
