// @ts-nocheck
import {Button, Table} from "web3uikit";
import React, {useEffect, useState} from "react";
import {useNFTBalances} from "react-moralis";
import {Image} from "antd";

interface NFTBalance {
    address: string;
    chain: string;
    marketplaceAddress?: string;
}

const NFTBalanceTable: React.FC<NFTBalance> = ({
    address,
    chain,
}) => {


    const [ tableData, setTableData ] = useState([]);

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
                <Image style={{borderRadius: "15px", maxHeight: "150px", maxWidth: "150px", minHeight: "80px", minWidth: "80px"}} src={nft.metadata ? nft.metadata.image : "https://i.ibb.co/jvjKFFv/Image.png"}/>,
                <div key={1} style={{display: "grid", }}>
                    <span style={{color: "deepskyblue", fontWeight: 600, fontSize: "14px"}}>{nft.contract_type}</span>
                    <span style={{fontWeight: "600"}}>{nft.metadata ? nft.metadata.name : nft.name}</span>
                    <span style={{fontSize: "12px"}}>{(nft.metadata ? nft.metadata.description : "No Description found")}</span>
                </div>,
                <div key={2} style={{display: "flex", justifyContent: "space-between"}}>
                    <Button onClick={() => {}} theme={"outline"} text={"Sell"}/>
                    <Button onClick={() => {}} iconLayout={"icon-only"} icon={"help circle"} theme={"outline"}/>
                </div>,
            ]);
        });
        setTableData(p);
    };

//metadata ? <Image src={metadata.image} bgRadius={"15px"} width={80} height={80}/>  : '',
    return (
        <Table
            columnsConfig={"0.25fr 2fr 0.25fr"}
            data={tableData}
            header={[
                <span>Image</span>,
                <span>Name</span>,
                <span>Actions</span>,
            ]}
            maxPages={3}
            pageSize={10}
            customNoDataText={"You do not have any NFTs"}
        />
    )
}

export default NFTBalanceTable