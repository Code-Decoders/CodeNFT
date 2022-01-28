import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { imageCidandImage } from '../utils/utils'
import "./DetailsPage.css"


const DetailsPage = ({ drizzle, drizzleState }) => {
    const { id } = useParams()
    const [state, setstate] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getData()
    }, [])

    const market = drizzle.contracts.CodeNFTMarket
    const code = drizzle.contracts.CodeNFT


    async function getData() {
        const data = await market.methods.getMarketItem(id).call()
        var uri = (await code.methods.tokenURI(data.tokenId).call()).toString().split("ipfs://")[1].split("/metadata.json")[0]
        var result = await axios.get(`https://${uri}.ipfs.dweb.link/metadata.json`);
        setstate({
            imageUrl: imageCidandImage(result.data.image),
            name: result.data.name,
            description: result.data.description,
            price: data.price,
            tokenId: data.tokenId,
            itemId: data.itemId
        })
        setLoading(false)
    }

    async function onSell() {
        console.log("Sold")
        await market.methods["createMarketSale"].cacheSend(code.address, id, { from: drizzleState.accounts[1], value: state.price, gas: 3000000 })
    }
    return (
        loading ? <div>Loading...</div> :
            <div style={{ display: "flex", }}>
                <div style={{ flex: 1, display: "flex", height: "92vh", alignItems: "center", justifyContent: "center" }}>
                    <img src={state.imageUrl} className="nft-image-container" />
                </div>
                <div className="detail-section">
                    <div style={{ fontSize: "4.8vh", textAlign: "left" }}>{state.name}</div>
                    <div className="price-container">
                        <div style={{ padding: "13px 20px" }}>
                            <div style={{ fontWeight: "500" }}>Price</div>
                            <div style={{ display: "flex", marginTop: "20px", alignItems: "baseline" }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png" style={{ height: "30px", marginRight: "10px" }} alt="https://toppng.com/uploads/preview/erreur-404-11550708744oo95egrxlp.png" />
                                <div style={{ fontWeight: "500", fontSize: "3vh" }}>{parseFloat(drizzle.web3.utils.fromWei(state.price, "ether")).toFixed(2)}</div>
                                <div style={{ fontSize: "1.9vh", verticalAlign: "baseline", marginLeft: "5px", fontWeight: "300" }}></div>
                            </div>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "40px", marginBottom: "13px" }}>

                            <button className="buy-button" onClick={onSell}>Buy</button>
                        </div>
                    </div>
                    <div className="description-container">

                        <div style={{ padding: "13px 20px" }}>
                            <div style={{ fontWeight: "500", fontSize: "3.1vh" }}>Description</div>
                            <p className="desc-text">
                                {state.description}
                                {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default DetailsPage
