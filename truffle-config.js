require('babel-register');
require('babel-polyfill');
var NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker")
const HDWalletProvider = require('truffle-hdwallet-provider');
const secrets = require('./secrets.json');
const mnemonic = secrets.mnemonic;
const key = secrets.infura_key;
const infura_apikey = key;

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // Match any network id
      gas: 3500000,
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/' + key),
      network_id: '*',
      gas: 3500000,
      gasPrice: 50000000000,
    },
    rinkeby: {
      provider: new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/' + key),
      network_id: '*',
      gas: 3500000,
      gasPrice: 7000000000,
    },
    mainnet: {
      provider: function () {
        var wallet = new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/' + infura_apikey);
        var nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 1,
      gas: 4612388,
      gasPrice: 20000000000,
    }
  }
};
