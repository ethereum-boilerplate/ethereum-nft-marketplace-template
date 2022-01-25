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
    const { withdrawFunds } = useProtocol();
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
                '',
                <span>{erc20.name}</span>,
                <span>{erc20.symbol}</span>,
                <span>{Moralis.Units.FromWei(erc20.balance, Number(erc20.decimals))}</span>,
                <LinkTo address={getExplorer(chainId)} text={getEllipsisTxt(erc20.token_address, 4)} type={"external"} />,
                <div style={{display: "flex", justifyContent:"space-between"}}>
                    <Button onClick={() => {withdrawFunds(account, erc20.token_address)}} theme={"primary"} text={"Withdraw"} />
                </div>
            ]
            setTableData(prevState => prevState.length === 0 ? [row] : [...prevState, row])
        })
    }

    return (
        <div style={{ padding: '15px' }}>
            <h1 style={{ marginBottom: '15px' }}>💰Royalties</h1>
                <Table
                 columnsConfig={"50px 1fr 1fr 1fr 1fr"}
                 data={tableData}
                 header={[
                     '',
                     <div style={columnNameStyle}>
                         <span>Name</span>
                     </div>,
                     <div style={columnNameStyle}>
                         <span>Symbol</span>
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
                 customNoDataText={"Nothing to withdraw"}
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
