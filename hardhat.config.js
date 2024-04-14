require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/<key>",
    //   accounts: ["privateKey1, privateKey2, ..."]
    // },
    ganache:{
      url: "http://127.0.0.1:7545",
      accounts: ["0xe059a43430beb325e1e47df46d1ba847d7a4a106a7429774e96f18004b7b5653"]
    }
  },
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
}