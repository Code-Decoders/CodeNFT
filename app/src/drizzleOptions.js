import Web3 from "web3";
import CodeNFT from "./contracts/CodeNFT.json";
import CodeNFTMarket from "./contracts/CodeNFTMarket.json";

const options = {
    web3: {
        block: false,
        customProvider: new Web3("ws://127.0.0.1:7545"),
    },
    contracts: [CodeNFT, CodeNFTMarket],
};

export default options;