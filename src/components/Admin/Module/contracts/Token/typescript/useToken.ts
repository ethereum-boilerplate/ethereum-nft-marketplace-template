import {useEffect, useState} from "react";
import {useChain, useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import generateContractOptions from "../../../../helpers";
import tokenInterface from "./interface";

const useToken = (address: string) => {

    const [ name, setName ] = useState(null)
    const [ symbol, setSymbol ] = useState(null)
    const [ totalSupply, setTotalSupply ] = useState(null)
    const [ decimals, setDecimals ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ isMinting, setMinting ] = useState(false)
    const [ error, setError ] = useState(null)
    const { token } = useMoralisWeb3Api()
    const { data, fetch } = useWeb3ExecuteFunction()
    const { chainId } = useChain();
    const { mintTokensAbi, totalSupplyAbi } = tokenInterface();

    useEffect(() => {
        getTokenInformation();
    })

    useEffect(() => {
        console.log(data)
    }, [ data ])

    const getTotalSupply = () => {
        const options = generateContractOptions(totalSupplyAbi, address, "totalSupply", {})
        fetch(options).then((e) => console.log(e))
    }

    const getTokenInformation = () => {
        setLoading(true)
        token.getTokenMetadata({
            addresses: [address]
        })
            .then((result) => {
                const metadata = result[0];
                setName(metadata.name);
                setSymbol(metadata.symbol);
                setDecimals(metadata.decimals);
                setLoading(false)
            })
            .catch(setError)
    }

    const mintTokens = (toAddress: string, amount: number | string ) => {
        const options = generateContractOptions(mintTokensAbi,address,"mint", {to: toAddress, amount: amount})
        setMinting(true)
        fetch(options).then(()=>setMinting(false))
    }

    return {
        name,
        symbol,
        decimals,
        loading,
        isMinting,
        totalSupply,
        mintTokens,
        getTotalSupply,
        error
    }
}

export default useToken;