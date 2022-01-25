// @ts-nocheck
import {Button, Table} from "web3uikit";
import React, {useEffect, useState} from "react";
import {useNFTBalances} from "react-moralis";
import {Image} from "antd";
import {useMarketplace} from "../views/Admin/Module/contracts/NFT/useMarketplace";
import NFTLister from "../views/Admin/Forms/NFTLister";

interface NFTBalance {
    address: string;
    chain: string;
    marketplaceAddress?: string;
    web3?: any;
}

const NFTBalanceTable: React.FC<NFTBalance> = ({
    address,
    chain,
    marketplaceAddress,
    web3
}) => {


    const [ tableData, setTableData ] = useState([]);
    const [ nftToList, setNftToList ] = useState({});
    const [ showLister, setShowLister ] = useState<boolean>(false);

    const { data } = useNFTBalances({
        address: address,
        ["chain" as any]: chain,
    })

    useEffect(() => {
        if(data) {
            if(data.result.length > 0 ) {
                printTable(data.result).then()
            }
        }
    }, [ data ])

    const printTable = async (result: Array<any>) => {
        let p = [];
        await result.forEach((nft) => {
            p.push([
                //@ts-ignore
                '',
                <div style={{height: "100%", width: "100%", display: "grid", placeItems: "center"}}>
                    <Image style={{borderRadius: "15px", minHeight: "80px", minWidth: "80px"}} src={nft.metadata ? nft.metadata.image : "https://i.ibb.co/jvjKFFv/Image.png"}/>
                </div>,
                <div key={1} style={{display: "grid", }}>
                    <span style={{color: "deepskyblue", fontWeight: 600, fontSize: "14px"}}>{nft.contract_type}</span>
                    <span style={{fontWeight: "600"}}>{nft.metadata ? nft.metadata.name : nft.name}</span>
                    <span style={{fontSize: "12px"}}>{(nft.metadata ? nft.metadata.description : "No Description found")}</span>
                </div>,
                <div key={2} style={{display: "flex", justifyContent: "space-between"}}>
                    <Button
                        onClick={() => {
                            setNftToList({ token_address: nft.token_address, token_id: nft.token_id, metadata: nft.metadata, type: nft.contract_type });
                            setShowLister(true)
                        }}
                        theme={"outline"}
                        text={"Sell"}
                    />
                    <Button onClick={() => {}} iconLayout={"icon-only"} icon={"help circle"} theme={"outline"}/>
                </div>,
            ]);
        });
        setTableData(p);
    };

//metadata ? <Image src={metadata.image} bgRadius={"15px"} width={80} height={80}/>  : '',
    return (
        <div style={{display: "grid", gap: "50px"}}>
            <div>
                <h1 style={{ fontSize: "36px", lineHeight: "40px", fontWeight: "600"}}>Your NFT's</h1>
                <span style={{ marginLeft: "5px", color: "#68738D", fontWeight: 600, fontSize: "14px", lineHeight: "24px"}}>{data ? data.result.length : "0"} {`token${data ? data.result.length > 1 ? "s" : "" : ""} inside`}</span>
            </div>
            <Table
                columnsConfig={"10px 0.25fr 2fr 0.25fr"}
                data={tableData}
                header={[
                    '',
                    <div style={columnNameStyle}>
                        <span>Image</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Name</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Actions</span>
                    </div>,
                ]}
                maxPages={3}
                pageSize={10}
                customNoDataText={"You do not have any NFTs"}
            />
            {showLister && (
                /* @ts-ignore */
                <NFTLister web3={web3} marketplaceAddress={marketplaceAddress} nft={nftToList} />
            )}
        </div>
    )
}

const columnNameStyle = {
    color: "#68738D",
    fontWeight: "500",
    fontSize: "14px",
    display: 'grid',
    placeItems: "flex-start",
    width: "100%",
    marginTop: "5px",
    marginBottom: "-5px"
}

export default NFTBalanceTable