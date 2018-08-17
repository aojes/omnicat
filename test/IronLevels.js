const assert = require('assert');
const contract = require('truffle-contract')
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const json = require('./../build/contracts/IronLevels.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

let accounts, ironlevels, owner, ironlevelsInstance
beforeEach(async () => {

  accounts = await web3.eth.getAccounts((error, accounts) => {
    owner = accounts[0];
    return accounts;
  });

  ironlevels = contract(json)
  ironlevels.setProvider(web3.currentProvider)
  ironlevels.deployed().then((instance) => {
      ironlevelsInstance = instance
    }).then((result) => {
      ironlevelsInstance.send({ from: owner, gas: '1000000' });
    })
});

describe('IronLevels', () => {

  it('deploys a contract', async () => {

    const ironlevelsOwner = ironlevels.owner

    assert.equal(owner, ironlevelsOwner,
      "The owner is the one who launches the smart contract.")
  });

  // Continue from this line from now on...
  it('spec. . .', async () => {
    return true
  })

  it('spec. . .', async () => {
    return true
  })

  it('spec. . .', async () => {
    return true
  })

});
