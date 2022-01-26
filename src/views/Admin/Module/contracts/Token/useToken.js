import { useState, useEffect } from "react"
import { tokenAbi } from "../../../Forms/Factory/token"
import Moralis from "moralis"


export const useToken = (web3, address, signer) => {
    const contract = new web3.eth.Contract(tokenAbi, address)
    const [ name, setName ] = useState(null)
    const [ symbol, setSymbol ] = useState(null)
    const [ totalSupply, setTotalSupply ] = useState(null)
    const [ decimals, setDecimals ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ isMinting, setMinting ] = useState(false)
    const [ mintingSuccess, setMintingSuccess ] = useState();
    const [ error, setError ] = useState(null)

    useEffect( () => {
        console.log(name, symbol, totalSupply, decimals)
        if(name && symbol && totalSupply && decimals) {
            setLoading(false)
        }
    }, [name, symbol, totalSupply, decimals])

    useEffect(() => {
        if(web3 && address) {
            getTokenName()
            getTokenSymbol()
            getTokenDecimals()
            getTotalSupply()
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, address])

    const mint = async (to, amount) => {
        setMinting(true)
        let formattedAmount =  Moralis.Units.ETH(amount)
        await contract.methods.mint(to,formattedAmount).send({from: signer})
        .on('receipt', () => {
            setMintingSuccess(true)
            setMinting(false)
        })
        .on('error', (err) => {
            setError(err)
            setMinting(false)
        })
    }

    const addToMetamask = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                type: 'ERC20',
                options: {
                    address: address,
                    symbol: symbol,
                    decimals: decimals
                },
                },
            });
            } catch (error) {
            console.log(error);
            }
        }

    const getTokenName = () => {
        contract.methods.name().call().then(setName)
    }
    
    const getTokenSymbol = () => {
        contract.methods.symbol().call().then(setSymbol)
    }
    
    const getTotalSupply = () => {
        contract.methods.totalSupply().call().then(setTotalSupply)
    }

    const getTokenDecimals = () => {
        contract.methods.decimals().call().then(setDecimals)
    }
    
    return {
        addToMetamask,
        name,
        totalSupply,
        decimals,
        symbol,
        mint,
        mintingSuccess,
        isMinting,
        loading,
        error
    }
}