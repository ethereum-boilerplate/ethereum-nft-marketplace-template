/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react"
import { useMoralis } from 'react-moralis'
import  { Button, Input, Skeleton } from 'antd'
import { useToken } from "../Module/contracts/Token/useToken"


export default function Token(props) {
    const [ wantsToMint, toggleMinter ] = useState(false)
    const [ amountToMint, setAmountToMint ] = useState(false)
    const [ addressToSend, setAddressToSend ] = useState(null)
    const { web3, Moralis, account} = useMoralis()
    const { decimals, loading, name, symbol, totalSupply, mint, addToMetamask} = useToken(web3, props.address, account)

    return (
        <div>
            <div>
                {(!loading) && <Button onClick={() => addToMetamask()}>Add To Metamask</Button>}
            </div>
            <div>
                <Button disabled={(!wantsToMint && !amountToMint && !addressToSend) ? false : (wantsToMint && (!amountToMint || !addressToSend))} onClick={() => {
                    if(!wantsToMint) {
                        toggleMinter(true)
                    } else {
                        mint(amountToMint, addressToSend)
                    }
                }}
                >
                Mint Tokens
                </Button>
                {
                    wantsToMint && 
                    <div>
                        <Input onChange={(e) => setAmountToMint(e.target.value)} placeholder="Amount"/>
                        <Input onChange={(e) =>setAddressToSend(e.target.value)} placeholder="To Address" />
                    </div>
                }
            </div>
            <div>
                <p>Name</p>
                <Skeleton loading={loading} active style={{width: '50px', height: '20px'}}>
                    <p>{name}</p>
                </Skeleton>
            </div>
            <div>
                <p>Symbol</p>
                <Skeleton loading={loading} active style={{width: '50px', height: '20px'}}>
                    <p>{symbol}</p>
                </Skeleton>
            </div>
            <div>
                <p>Total Supply</p>
                <Skeleton loading={loading} active style={{width: '50px', height: '20px'}}>
                    <p>{Moralis.Units.FromWei(totalSupply, decimals)}</p>
                </Skeleton>
            </div>
            <div>
                <p>Decimals</p>
                
                <Skeleton loading={loading} active style={{width: '50px', height: '20px'}}>
                    <p>{decimals}</p>
                </Skeleton>
            </div>
        </div>
    )
}
