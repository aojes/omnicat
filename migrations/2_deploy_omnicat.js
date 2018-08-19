var Ownable = artifacts.require("./Ownable.sol");
var OmniCAT = artifacts.require("./OmniCAT.sol");

// Make sure Ownable migrates first since OmniCat inherits
module.exports = function(deployer) {
  deployer.deploy(Ownable).then((ownableInstance) => {
    deployer.deploy(OmniCAT);
  });
};
