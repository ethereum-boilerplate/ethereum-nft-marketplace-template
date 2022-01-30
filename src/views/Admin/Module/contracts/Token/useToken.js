import { useState, useEffect } from "react"
import { tokenAbi } from "../../../Forms/Factory/token"
import { useMoralis } from "react-moralis";
import Web3 from "web3"

export const useToken = (address) => {
    const [ name, setName ] = useState(null)
    const [ symbol, setSymbol ] = useState(null)
    const [ totalSupply, setTotalSupply ] = useState(null)
    const [ decimals, setDecimals ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ isMinting, setMinting ] = useState(false)
    const [ mintingSuccess, setMintingSuccess ] = useState();
    const [ error, setError ] = useState(null)
    const [ web3, setWeb3 ] = useState();
    const { provider, Moralis, account } = useMoralis()
    const [ contract, setContract ] = useState(null);



    useEffect(() => {
        if(provider) {
            setWeb3(new Web3(provider))
        }
    }, [provider])

    useEffect( () => {
        console.log(name, symbol, totalSupply, decimals)
        if(name && symbol && totalSupply && decimals) {
            setLoading(false)
        }
    }, [name, symbol, totalSupply, decimals])

    useEffect(() => {
        if(web3 && address) {
            let contractTemp = new web3.eth.Contract(tokenAbi, address)
            setContract(contractTemp)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, address])

    useEffect(() => {
        if(contract) {
            getTokenName()
            getTokenSymbol()
            getTokenDecimals()
            getTotalSupply()
        }
        // eslint-disable-next-line
    }, [contract])

    const mint = async (to, amount) => {
        setMinting(true)
        let formattedAmount =  Moralis.Units.ETH(amount)
        await contract.methods.mint(to,formattedAmount).send({from: account})
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