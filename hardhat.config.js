require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // To load environment variables from a .env file

module.exports = {
  solidity: "0.8.24",
  networks: {
    celoAlfajores: {
      url: "https://celo-alfajores.infura.io/v3/5e384ed639c04bb6bd6ec82105d5e5a6",
      chainId: 44787, 
      accounts: ["43dfd9255cbaad2e6692320469d62f6c140f40cc58138e977ad769c98f916cba"],
    },
    base_sepolia: {
      url: "https://base-sepolia.g.alchemy.com/v2/k8dpUeP7Mbr1CFWEkIwjsEbzqlRHdH13", 
      accounts: ["43dfd9255cbaad2e6692320469d62f6c140f40cc58138e977ad769c98f916cba"], 
    },
  }
};
