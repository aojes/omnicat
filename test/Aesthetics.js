// const assert = require('assert');
// const contract = require('truffle-contract')
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
// const json = require('./../build/contracts/Aesthetics.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

var Ownable = artifacts.require("Ownable")
var OmniCAT = artifacts.require("OmniCAT")
var Aesthetics = artifacts.require("Aesthetics")

var accounts, aesthetics, owner;

contract('Aesthetics', async (accounts) => {

  it('deploys a contract', async () => {
    let inst = await Aesthetics.deployed()
    owner = inst.owner
    aesthetics = inst
    assert(inst)
  })

  it('gives web3 to the test env', async () => {
    assert(web3)
  })

  it('deploys a contract', async () => {
    const aestheticsOwner = aesthetics.owner

    assert.equal(owner, aestheticsOwner,
      "The manager/owner is the one who launches the smart contract.")
  });

});
