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
