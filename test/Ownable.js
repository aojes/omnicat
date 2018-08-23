// const assert = require('assert');
// const contract = require('truffle-contract')
// const ganache = require('ganache-cli');
// const Web3 = require('web3');
// const web3 = new Web3(ganache.provider());
// const json = require('./../build/contracts/Ownable.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];

var Ownable = artifacts.require("Ownable")

contract('Ownable', async (accounts) => {

  it('deploys a contract', async () => {
    let inst = await Ownable.deployed()
    assert(inst)

  });
})
