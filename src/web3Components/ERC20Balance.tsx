import { useMoralis, useERC20Balances, useChain } from 'react-moralis';
import { getEllipsisTxt } from '../helpers/formatters';
import {Button, LinkTo, Table} from 'web3uikit';
import useProtocol from '../views/Admin/Module/contracts/Protocol/useProtocol';
import { getExplorer } from '../helpers/networks';
import React, {useEffect, useState} from "react";

function ERC20Balance({ address }) {
    const { account, Moralis } = useMoralis();
    const { chainId } = useChain();
    const { data: assets } = useERC20Balances({ address: address, ['chain' as any]: chainId });
    const { withdrawFunds, isWithdrawing, setIsWithdrawing } = useProtocol();
    const [ tableData, setTableData ] = useState<Array<any>>([])
    useEffect(() => {
        if(assets) {
            if(assets.length === 0) return;
            printTable(assets).then()
        }
        // eslint-disable-next-line
    }, [ assets])

    const printTable = async (assetList: typeof  assets) => {
        setTableData([])
        assetList.forEach((erc20) => {
            const row = [
                <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                    <img width={"45px"} height={"45px"} src={erc20.logo || "https://etherscan.io/images/main/empty-token.png"} alt={""} />
                </div>,
                <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                    <span style={{color: '#041836', fontSize: '16px'}}>{erc20.name}</span>
                </div>,
                <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                    <span style={{color: '#041836', fontSize: '16px'}}>{Moralis.Units.FromWei(erc20.balance, Number(erc20.decimals))} {erc20.symbol}</span>
                </div>,
                <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                    <LinkTo address={getExplorer(chainId)} text={getEllipsisTxt(erc20.token_address, 4)} type={"external"} />
                </div>,
                <div style={{display: "grid", alignItems:"center", placeItems: "center"}}>
                    <Button disabled={isWithdrawing} onClick={() => {
                        setIsWithdrawing(true)
                        withdrawFunds(account, erc20.token_address)
                    }} theme={!isWithdrawing ? "primary" : "outline"} text={"Withdraw"} />
                </div>
            ]
            setTableData(prevState => prevState.length === 0 ? [row] : [...prevState, row])
        })
    }

    return (
        <div style={{ padding: '15px' }}>
            <h1 style={{ marginBottom: '15px', fontWeight: 600 }}>💰Royalties</h1>
                <Table
                 columnsConfig={"70px 0.5fr 0.5fr 0.2fr 0.25fr"}
                 data={tableData}
                 header={[
                     '',
                     <div style={columnNameStyle}>
                         <span>Name</span>
                     </div>,
                     <div style={columnNameStyle}>
                         <span>Balance</span>
                     </div>,
                     <div style={columnNameStyle}>
                         <span>Address</span>
                     </div>,
                     '',
                 ]}
                 pageSize={10}
                 customNoDataText={"Nothing to withdraw. Start earning 🤑"}
                />
        </div>
    );
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

export default ERC20Balance;
