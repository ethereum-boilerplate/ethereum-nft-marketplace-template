// @ts-nocheck
import React, {useEffect, useState} from "react"
import {useChain, useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall} from 'react-moralis'
import { useToken } from "../Module/contracts/Token/useToken"
import {Avatar, Button, Information, Input, LinkTo, TabList} from "web3uikit";
import {getExplorer} from "../../../helpers/networks";
import {getEllipsisTxt} from "../../../helpers/formatters";

 const { Tab } = TabList

const Token: React.FC = ({ address, web3 }) => {
    const [ amountToMint, setAmountToMint ] = useState(false)
    const [ addressToSend, setAddressToSend ] = useState(null)
    const { Moralis, account, } = useMoralis()
    const { chainId } = useChain()
    const Web3API = useMoralisWeb3Api()

    const { data } = useMoralisWeb3ApiCall(Web3API.account.getTokenBalances, {
        address: account,
        token_addresses: [ address ],
        chain: chainId
    }, { autoFetch: true});

    const { decimals, loading, symbol, totalSupply, mint, addToMetamask} = useToken(web3, address, account)

    useEffect(() => {
        console.log(data)
    }, data)

    return (

                <TabList
                    tabStyle={"bulbUnion"}
                >
                    <Tab
                        tabKey={1}
                        tabName={"Overview"}
                    >
                        <div style={{display: "grid", placeItems: "center", gap: '20px'}}>
                            <Avatar text={symbol} theme={"letters"}/>
                            <LinkTo address={`${getExplorer(chainId)}address/${address}`} text={getEllipsisTxt(address, 4)} type={"external"}/>
                            <div style={{marginBottom: '15px', display: "flex", alignItems: "center", justifyContent: "space-between", gap: "25px"}}>
                                <Button disabled={loading} onClick={() => addToMetamask()} iconLayout={"leading"} icon={"metamask"} theme={"outline"} text={"Add to Metamask"}/>
                                <Button disabled={(loading || !amountToMint || !addressToSend)} onClick={() => mint(addressToSend, amountToMint)} theme={"primary"} iconLayout={"leading"} icon={"plus"} text={"Mint"}/>
                            </div>
                        </div>
                        <div style={{display: "grid", placeItems:'center', padding: "1em", gap: "1em"}}>
                            <Input onChange={(e) => {setAmountToMint(e.target.value)}} placeholder={"Amount"} type={"number"} />
                            <Input onChange={(e) => {setAddressToSend(e.target.value)}} placeholder={"To Address"} type={"text"} />
                        </div>
                        <div style={{display: 'flex', justifyContent: "space-between", gap: "2%"}}>
                            <Information topic={"Total Supply"} information={totalSupply ? Moralis.Units.FromWei(totalSupply) : "0"}/>
                            <Information topic={"Owned By You"} information={data && data[0] ? Moralis.Units.FromWei(data[0].balance): "..."}/>
                            <Information topic={"Decimals"} information={decimals}/>
                        </div>
                    </Tab>
                    <Tab
                        tabKey={2}
                        tabName={"Permissions"}
                    >
                        <p>Coming Soon</p>
                    </Tab>
                </TabList>
    )
}

export default Token;
