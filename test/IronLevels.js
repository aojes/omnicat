// const assert = require('assert');
//const contract = require('truffle-contract')
// const ganache = require('ganache-cli');
//const Web3 = require('web3');
//const web3 = new Web3(ganache.provider());
// const json = require('./../build/contracts/IronLevels.json');
// const _interface = json['abi'];
// const bytecode = json['bytecode'];
// assert(web3)
var Ownable = artifacts.require("Ownable")
var OmniCAT = artifacts.require("OmniCAT")
var IronLevels = artifacts.require("IronLevels");

contract('IronLevels', async (accounts) => {
  it('deploys a contract', async () => {
    let inst = await IronLevels.deployed()
    assert(inst)
  })

  it('gives web3 to the test env', async () => {
    assert(web3)
  })

  it('gets the right optimal values', async () => {
    let inst = await IronLevels.deployed()
    let si = await inst.getOptimalValues('SerumIron', {from: accounts[0]})
    let ti = await inst.getOptimalValues('TransferrinIBC', {from: accounts[0]})
    let ts = await inst.getOptimalValues('TransferrinSaturation', {from: accounts[0]})
    let sfa = await inst.getOptimalValues('SerumFerritinAssay', {from: accounts[0]})
    assert.equal(20, si, 'err');
    assert.equal(60, ti, 'err')
    assert.equal(40, ts, 'err')
    assert.equal(150, sfa)
  })

  it('gets the right values for normal as [[low1, low2], [hi1, hi2]]', async () => {
    let inst = await IronLevels.deployed()
    let si_norm = await inst.getNormalValues.call('SerumIron', {from: accounts[0]})
    let ti_norm = await inst.getNormalValues.call('TransferrinIBC', {from: accounts[0]})
    let ts_norm = await inst.getNormalValues.call('TransferrinSaturation', {from: accounts[0]})
    let sfa_norm = await inst.getNormalValues.call('SerumFerritinAssay', {from: accounts[0]})
    assert.equal(si_norm[0][0].c[0], 15, '..err low values')
    assert.equal(si_norm[0][1].c[0], 19, '..err low values')
    assert.equal(si_norm[1][0].c[0], 21, '..err high values')
    assert.equal(si_norm[1][1].c[0], 25, '..err high values')


    assert.equal(ti_norm[0][0].c[0], 55, '..err low values')
    assert.equal(ti_norm[0][1].c[0], 59, '..err low values')
    assert.equal(ti_norm[1][0].c[0], 61, '..err high values')
    assert.equal(ti_norm[1][1].c[0], 65, '..err high values')


    assert.equal(ts_norm[0][0].c[0], 35, '..err low values')
    assert.equal(ts_norm[0][1].c[0], 39, '..err low values')
    assert.equal(ts_norm[1][0].c[0], 41, '..err high values')
    assert.equal(ts_norm[1][1].c[0], 45, '..err high values')


    assert.equal(sfa_norm[0][0].c[0], 130, '..err low values')
    assert.equal(sfa_norm[0][1].c[0], 149, '..err low values')
    assert.equal(sfa_norm[1][0].c[0], 151, '..err high values')
    assert.equal(sfa_norm[1][1].c[0], 180, '..err high values')

    //   Contract: IronLevels
    //     ✓ deploys a contract
    //     ✓ gets the right optimal values (1088ms)
    // [ [ BigNumber { s: 1, e: 1, c: [Array] },
    //     BigNumber { s: 1, e: 1, c: [Array] } ],
    //   [ BigNumber { s: 1, e: 1, c: [Array] },
    //     BigNumber { s: 1, e: 1, c: [Array] } ] ]
    //     ✓ gets the right values for high normal (100ms)
  })

})
  // Continue from this line from now on...
    // it('should get correct values', () => {
    //   var iron
    //   return IronLevels.deployed().then( (instance) => {
    //     // assert.equal(instance.contractName, 'IronLevels', 'err... contractName')
    //     assert.equal(instance.getOptimalValues('SerumIron', {from: accounts[0]}), 20, 'err... getOptimalValues')
    //   })
    // })

//
// beforeEach(async () => {
//
//   accounts = await web3.eth.getAccounts((error, accounts) => {
//     owner = accounts[0];
//     return accounts;
//   });
//
//   ironlevels = contract(json)
//   ironlevels.setProvider(web3.currentProvider)
//   ironlevels.deployed().then((instance) => {
//       ironlevelsInstance = instance
//     }).then((result) => {
//       ironlevelsInstance.send({ from: owner, gas: '1000000' });
//     })
// });

// contract('IronLevels', () => {
//
//   it('deploys a contract', async () => {
//
//     const ironlevelsOwner = ironlevels.owner
//
//     assert.equal(owner, ironlevelsOwner,
//       "The owner is the one who launches the smart contract.")
//   });
//
//   // Continue from this line from now on...
//   it('should have correct values in constructor', async () => {
//     let optSI = ironLevelsInstance.getOptimalValues("SerumIron") // returns BigNumber ??
//     assert.equal(20, optSI)
//     // optimal["SerumIron"] = 20;
//     // normal["SerumIron"] = [[15, 19], [21, 25]];
//     // suboptimal["SerumIron"] = [[10, 14], [26, 33]];
//     //
//     // optimal["TransferrinIBC"] = 60;
//     // normal["TransferrinIBC"] = [[55, 59], [61, 65]];
//     // suboptimal["TransferrinIBC"] = [[45, 54], [66, 70]];
//     //
//     // optimal["TransferrinSaturation"] = 40;
//     // normal["TransferrinSaturation"] = [[35, 39], [41, 45]];
//     // suboptimal["TransferrinSaturation"] = [[16, 34], [46, 50]];
//     //
//     // optimal["SerumFerritinAssay"] = 150;
//     // normal["SerumFerritinAssay"] = [[130, 149], [151, 180]];
//     // suboptimal["SerumFerritinAssay"] = [[uint16(20), uint16(129)], [uint16(181), 290]];
//
//   })
//
//   it('should report Normal if normal levels submitted', async () => {
//     return true
//   })
//
//   // it('spec. . .', async () => {
//   //   return true
//   // })
//
// });
