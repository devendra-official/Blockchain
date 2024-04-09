require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {
    },
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/<key>",
    //   accounts: ["privateKey1, privateKey2, ..."]
    // },
    ganache:{
      url: "http://127.0.0.1:7545",
      accounts: ["0xafed7e44f3005904452789bf6931119291af34a8694e8ec52d6ddbc0ebe95777"]
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