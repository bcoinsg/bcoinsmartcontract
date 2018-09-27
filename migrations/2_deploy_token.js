var BCoin = artifacts.require('./BCoin.sol');
module.exports = function(deployer) {
  deployer.deploy(BCoin);
};