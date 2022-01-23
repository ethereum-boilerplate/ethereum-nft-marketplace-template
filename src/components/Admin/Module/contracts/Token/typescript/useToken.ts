import {useEffect, useState} from "react";
import { useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";

const useToken = (address: string) => {

    const [ name, setName ] = useState(null)
    const [ symbol, setSymbol ] = useState(null)
    const [ totalSupply,  ] = useState(null)
    const [ decimals, setDecimals ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ isMinting,  ] = useState(false)
    const [ error, setError ] = useState(null)
    const { token } = useMoralisWeb3Api()
    const { data, } = useWeb3ExecuteFunction()
    /*const { mintTokensAbi, totalSupplyAbi } = tokenInterface();*/

    useEffect(() => {
        getTokenInformation();
    })

    useEffect(() => {
        console.log(data)
    }, [ data ])

    const getTotalSupply = () => {
        /*const params = generateContractOptions(totalSupplyAbi, address, "totalSupply", {})
        fetch({params, onSuccess: (e) => (setTotalSupply(e))}).then((e) => console.log(e))*/
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

    /*const mintTokens = (toAddress: string, amount: number | string ) => {
        /!*const params = mintTokensAbi,address,"mint", {to: toAddress, amount: amount})
        setMinting(true)
        fetch({params}).then(()=>setMinting(false))*!/
    }*/

    return {
        name,
        symbol,
        decimals,
        loading,
        isMinting,
        totalSupply,
        getTotalSupply,
        error
    }
}

export default useToken;