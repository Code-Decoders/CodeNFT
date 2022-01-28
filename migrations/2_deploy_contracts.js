const CodeNFT = artifacts.require("CodeNFT");
const CodeNFTMarket = artifacts.require("CodeNFTMarket");

module.exports = function (deployer) {
  deployer.deploy(CodeNFT);
  deployer.deploy(CodeNFTMarket);
};

