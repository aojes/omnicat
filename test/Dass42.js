const assert = require('assert');
const contract = require('truffle-contract')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const json = require('./../build/contracts/Dass42.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

let accounts, dass42, owner, dass42Instance;

beforeEach(async () => {

  accounts = await web3.eth.getAccounts((error, accounts) => {
    owner = accounts[0];
    return accounts;
  });

  dass42 = contract(json)
  dass42.setProvider(web3.currentProvider)
  dass42.deployed().then((instance) => {
      dass42Instance = instance
      // keys.owner = keys.omni.inst.owner.call()
    }).then((result) => {
      // Update state with the result.
      dass42Instance.send({ from: owner, gas: '1000000' });
    })
});

describe('Dass42', () => {

  it('deploys a contract', async () => {

    const dass42Owner = dass42.owner

    assert.equal(owner, dass42Owner,
      "The manager/owner is the one who launches the smart contract.")
  });

  // Continue from this line from now on...

});
