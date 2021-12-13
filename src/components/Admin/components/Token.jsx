/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useMoralis } from 'react-moralis'
import  { Button, Input, Skeleton } from 'antd'
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"


export default function Token(props) {
    const [ totalSupply, setTotalSupply ] = useState("")
    const [ tokenDecimals, setTokenDecimals ] = useState("")
    const [ tokenName, setTokenName ] = useState("")
    const [ wantsToMint, toggleMinter ] = useState(false)
    const [ amountToMint, setAmountToMint ] = useState(false)
    const [ addressToSend, setAddressToSend ] = useState(null)
    const [ tokenSymbol, setTokenSymbol ] = useState("")
    const { Moralis, web3 } = useMoralis()
    const { walletAddress } = useMoralisDapp() 


    useEffect(() => {
        getTokenInformation()
    }, [])

    const getTokenInformation = async () => {
        let tokenContract = new web3.eth.Contract([{
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }], props.address)
        const decimals = await tokenContract.methods.decimals().call()
        const name = await tokenContract.methods.name().call()
        const symbol = await tokenContract.methods.symbol().call()
        const totalSupply = await tokenContract.methods.totalSupply().call()
        setTokenDecimals(decimals)
        setTotalSupply(Moralis.Units.FromWei(totalSupply, decimals))
        setTokenName(name)
        setTokenSymbol(symbol)
    }

    const mintTokens = async (amount, to = walletAddress) => {

        let tokenContract = new web3.eth.Contract([
            {
				"inputs": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"name": "mint",
				"outputs": [],
				"stateMutability": "nonpayable",
				"type": "function"
			}
        ], props.address)
        let formattedAmount =  Moralis.Units.ETH(amount)
        await tokenContract.methods.mint(to,formattedAmount).send({from: walletAddress})
        setTotalSupply(totalSupply+amount)
    }

    const addTokenToMetamask = async () => {

    try {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
                address: props.address, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
            },
            },
        });
        } catch (error) {
        console.log(error);
        }
    }



    return (
        <div>
            <div>
                {(tokenSymbol !== "" && tokenDecimals !== "") && <Button onClick={() => addTokenToMetamask()}>Add To Metamask</Button>}
            </div>
            <div>
                <Button disabled={(!wantsToMint && !amountToMint && !addressToSend) ? false : (wantsToMint && (!amountToMint || !addressToSend)) ? true : false} onClick={() => {
                    if(!wantsToMint) {
                        toggleMinter(true)
                    } else {
                        mintTokens(amountToMint, addressToSend)
                    }
                }}>Mint Tokens</Button>
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
                <Skeleton loading={tokenName === ""} active style={{width: '50px', height: '20px'}}>
                    <p>{tokenName}</p>
                </Skeleton>
            </div>
            <div>
                <p>Symbol</p>
                <Skeleton loading={tokenSymbol === ""} active style={{width: '50px', height: '20px'}}>
                    <p>{tokenSymbol}</p>
                </Skeleton>
            </div>
            <div>
                <p>Total Supply</p>
                <Skeleton loading={totalSupply === ""} active style={{width: '50px', height: '20px'}}>
                    <p>{totalSupply}</p>
                </Skeleton>
            </div>
            <div>
                <p>Decimals</p>
                
                <Skeleton loading={tokenDecimals === ""} active style={{width: '50px', height: '20px'}}>
                    <p>{tokenDecimals}</p>
                </Skeleton>
            </div>
        </div>
    )
}
