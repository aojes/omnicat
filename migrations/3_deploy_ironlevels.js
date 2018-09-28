var OmniCAT = artifacts.require("./OmniCAT.sol")
var IronLevels = artifacts.require("./IronLevels.sol");
module.exports = function(deployer) {
  deployer.deploy(IronLevels)
  deployer.link(IronLevels, OmniCAT)
}
