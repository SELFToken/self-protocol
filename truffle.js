var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "debris maximum chalk tower latin pole degree churn middle era refuse regret";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic,"https://ropsten.infura.io/4RgiPxJdONP7pk1PNmpW");
      },
      network_id: 3,
      gas: 4000000
    },
    live: {
      host: "localhost",
      port: 8546,
      network_id: 1,
      gas: 4000000
    }
  },
  rpc: {
    host: "localhost",
    post: 8545
  }
};
