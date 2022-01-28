import React, { useEffect } from "react";
import { Col, Row, } from 'atomize';
import { Navbar } from "./components/navbar";
import { StyleReset } from "atomize";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import Marketplace from "./components/marketplace";
import { Switch, Route, useLocation } from "react-router-dom"
import DetailsPage from "./components/DetailsPage";
import MintNFT from "./components/MintNFT";
import MyNFTs from "./components/mynfts";
import Web3 from "web3"
import SideBar from "./components/SideBar";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

export default ({ drizzle, drizzleState }) => {
  const location = useLocation()
  // var portis = new Portis('f92f78e0-f2e3-4e31-a99e-8d34d4a7087f',{
  //   nodeUrl: "https://rpc-mumbai.maticvigil.com/",
  //   chainId:"80001",
  // })
  // var web3 = new Web3('ws://127.0.0.1:7545')

  async function getData() {
    const accounts = await drizzle.web3.eth.getAccounts()
    const market = await drizzle.contracts.CodeNFTMarket;
    const code = await drizzle.contracts.CodeNFT
    // .methods["createToken"].cacheSend(market.address, "test6", {
    //   gas: 300000,
    // });
    // const listing = await market.methods["createMarketItem"].cacheSend(drizzle.contracts.CodeNFT.address, drizzle.web3.utils.toHex("1"), 1000000, {
    //   from: "0x80A97706c8859bAe70004aF44CdAb5D826A37dF0",
    //   value: drizzle.web3.utils.toWei("0.1", "ether")
    // })
    console.log("test ", market.address, code.address)



    // console.log(await drizzle.contracts.CodeNFTMarket.methods["createMarketItem"].cacheSend("0xf2D5BDc9C64ecd12CdA75957140D2d525dC7eBAA", 2, drizzle.web3.utils.toWei(`1`, "ether"),{value: drizzle.web3.utils.toWei("0.1", "ether")}))
    // console.log(await drizzle.contracts.CodeNFTMarket.methods['getMarketItem'].cacheCall(0))
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <StyleReset />
      <div className="App">
        {
          location.pathname.includes("mint") ? <></> :
            <Navbar />
        }
        <Row>
          {/* <Col size="2" bg="warning700"></Col> */}
          <Col>
            <div style={{ height: "92vh", width: "100%" }}>
              <Switch>
                <Route exact path="/">
                  <Marketplace drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route path="/mynfts">
                  <MyNFTs drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route path="/details/:id?">
                  <DetailsPage drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route path="/mint">
                  <MintNFT drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
                <Route path="/mynfts/details/:id?">
                  <DetailsPage drizzle={drizzle} drizzleState={drizzleState} />
                </Route>
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    </StyletronProvider>
  );
};
