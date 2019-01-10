var OmniCAT = artifacts.require("./OmniCAT.sol")
var Aesthetics = artifacts.require("./Aesthetics.sol");
module.exports = function(deployer) {
  deployer.deploy(Aesthetics)
  deployer.link(Aesthetics, OmniCAT)
}
