var BCoinTimeLock = artifacts.require('./BCoinTimeLock.sol');

module.exports = function(deployer) {
  var beneficiaries = [
    '0xd040B7C8e8Cd3fb4dEb2c1dDf23Abaad0d9D30E0',
    '0x1132f2F555438518e89DCaBC8cAe9724e5406Db9'
  ];
  (async function() {
    for (let i = 0; i < beneficiaries.length; i++) {
      // let p = new Promise(function(resolve, reject) {
      deployer.deploy(BCoinTimeLock, '0xd85e49f9bc536630c6c723ee5f4caae3be7733d1', beneficiaries[i], 1552867200);
      // .then(function(){
      //   resolve(arguments);
      // }).catch(function(err) {
      //   reject(err)
      // });
      let p = new Promise(function(resolve, reject) {
        setTimeout(function() {
          resolve();
        }, 10000);
      });

      await p;
      // })
      // try {
      //   await p;
      // } catch (err) {
      //   console.error(err);
      // }
    }
  })();
};

// var BCoin = artifacts.require('./BCoin.sol');
// module.exports = function(deployer) {
//   deployer.deploy(BCoin)
// }
