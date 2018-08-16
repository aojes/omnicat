const assert = require('assert');
const contract = require('truffle-contract')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const json = require('./../build/contracts/Ownable.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

let accounts, ownable, owner, ownableInstance;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts((error, accounts) => {
    owner = accounts[0];
    return accounts;
  });

  ownable = contract(json)
  ownable.setProvider(web3.currentProvider)
  ownable.deployed().then((instance) => {
      ownableInstance = instance
      // keys.owner = keys.omni.inst.owner.call()
    }).then((result) => {
      // Update state with the result.
      ownableInstance.send({ from: owner, gas: '1000000' });
    })
});

describe('Ownable', () => {

  it('deploys a contract', async () => {

    const ownableOwner = ownable.owner

    assert.equal(owner, ownableOwner,
      "The manager/owner is the one who launches the smart contract.")
  });

  // Continue from this line from now on...

});
