require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@truffle/dashboard-hardhat-plugin");


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {  
  solidity: "0.8.4",  
  networks:{
    linea:{
      accounts:[process.env.key],
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`
    }
    
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.etherscan
  }
};
