var OmniCAT = artifacts.require("./OmniCAT.sol")
var Dass42 = artifacts.require("./Dass42.sol");
module.exports = function(deployer) {
  deployer.deploy(Dass42)
  deployer.link(Dass42, OmniCAT)
}
