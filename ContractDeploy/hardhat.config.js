require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 // Replace this private key with your Ropsten account private key
 // To export your private key from Metamask, open Metamask and
 // go to Account Details > Export Private Key
 // Be aware of NEVER putting real Ether into testing accounts
 const FUJI_PRIVATE_KEY = "ab24df078e882ccb8c0b7dbbaf220daf40ea9dc64756a5c894d4647a9dc0d68f";
 const FUJI_PUBLIC_KEY = "0xFDf572Ce0b87f7036f9F528FD55968348Bd86081"
module.exports = {
  solidity: "0.8.0",
  networks:{
    fuji:{
      url: `https://api.avax-test.network/ext/bc/C/rpc`,
      accounts: [`${FUJI_PRIVATE_KEY}`]
    }
  }
};
