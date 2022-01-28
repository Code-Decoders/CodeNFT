
import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Input, Icon } from "atomize";
import { FaCloudUploadAlt, FaRegUserCircle } from "react-icons/fa"
import { IoWalletOutline } from "react-icons/io5"
import { useHistory,useLocation } from 'react-router-dom';
// import Portis from '@portis/web3'
import Web3 from "web3";
import CodeNFT from "../contracts/CodeNFT.json";

export const Navbar = () => {
    const history = useHistory()
    const location = useLocation()

    const [index, setIndex] = useState(location.pathname.includes('/mynfts') ? 1: 0)

    useEffect(() => {
      
      // portis.importWallet('1ca0dc48dd7058a39fc38f280397576bff48e4ef192705bdda6053a70e130047')
      // portis.isLoggedIn().then(({ error, result }) => {
      //   console.log(error, result);
      // });
      // portis.onActiveWalletChanged(walletAddress => {
      //   console.log('Active wallet address:', walletAddress);
      // });
      // var web3 = new Web3(portis.provider)
      // console.log(web3)
      // var contract = new web3.eth.Contract(CodeNFT.abi, '0xC5E47C64c30c82f2Fb768e0C73614b0813aDeD23')
      // console.log(contract.methods)

    }, [])
    function changeIndex(value) {
        setIndex(() => value);
    }
    return (
        <div className="navbar">
            <div className="logo-container">
                <div style={{  fontSize: 29, verticalAlign: "middle",color: "white"}}>{`Code {NFT}`}</div>
            </div>
            <div className="search-container">
                <Input
                    placeholder="Search"
                    suffix={
                        <Icon
                            name="Search"
                            size="20px"
                            cursor="pointer"
                            onClick={() => console.log("clicked")}
                            pos="absolute"
                            top="50%"
                            right="1rem"
                            transform="translateY(-50%)"
                        />} /></div>
            <div className="menu-container">
                <div className="menu-item" onClick={() => {changeIndex(0); history.replace("/")}}>
                    <div className="menu-item-text">Marketplace</div>
                    <div className={index === 0 ? "menu-item-active" : ""}></div>
                </div>
                <div className="menu-item" onClick={() => {changeIndex(1); history.push("/mynfts")}}>
                    <div className="menu-item-text">My NFTs</div>
                    <div className={index === 1 ? "menu-item-active" : ""}></div>
                </div>
            </div>
            <div className="action-container">
            <span
          className="outline-button"
          onClick={() => history.push("/mint")}
        >
          <FaCloudUploadAlt
            color={"#FFFFFF"}
            size={25}
            style={{ marginRight: "10px" }}
          />
          Upload
        </span>
          <FaRegUserCircle
            className="action-button"
          />
          <IoWalletOutline
            className="action-button"
            style={{ paddingRight: "30px" }}
          />
            </div>
        </div>
    )
}
