var OmniCAT = artifacts.require("./OmniCAT.sol");
var Ownable = artifacts.require("./Ownable.sol");
module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(OmniCAT);
};
