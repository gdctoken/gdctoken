const PrivateKeyProvider = require("truffle-privatekey-provider");
require("dotenv").config();

const ropstenProviderUrl = "https://ropsten.infura.io/v3/";
const mainnetProviderUrl = "https://mainnet.infura.io/v3/";

module.exports = {
  compilers: {
    solc: {
      version: "0.4.19",
    }
  },
  networks: {
    development: {
      provider: () => {
		return new PrivateKeyProvider(process.env.PRIVKEY, "http://localhost:7545");
	  },
      network_id: "*",
      gas: 3000000,
      gasPrice: 1e12,
      skipDryRun: true,
    },
    ganache: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      gas: 3000000,
    },
    ropsten: {
      provider: () => {
        console.log("connecting :" + ropstenProviderUrl + process.env.INFURAKEY)
		return new PrivateKeyProvider(process.env.PRIVKEY, ropstenProviderUrl+process.env.INFURAKEY);
	  },
      network_id: 3,
      gas: 2500000,
      gasPrice: 1e9,
    },
    mainnet: {
      provider: () => {
        console.log("connecting :" + mainnetProviderUrl + process.env.INFURAKEY)
		return new PrivateKeyProvider(process.env.PRIVKEY, mainnetProviderUrl+process.env.INFURAKEY);
	  },
      network_id: 1,
      gas: 2500000,
      gasPrice: 9e9,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
