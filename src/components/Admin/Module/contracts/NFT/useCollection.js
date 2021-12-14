import { collectionAbi } from "./collection"
import { useState, useEffect } from "react"
import { useMoralis } from "react-moralis"
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"


export const useCollection = (web3, address) => {
    const [ nextTokenId, setNextTokenId ] = useState("")
    const [ nextTokenIdByAddress, setNextTokenIdByAddress ] = useState("")
    const { Moralis } = useMoralis()
    const { chainId } = useMoralisDapp()
    const [ royaltyPercentage, setRoyaltyPercentage ] = useState(0)
    const contract = new web3.eth.Contract(collectionAbi, (address ? address : ""))

    useEffect(() => {
        if(address && web3) {
            getNextTokenId()
            getRoyaltyPercentage()
            getUri()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, web3])

    const triggerWeb3Api = async () => {
        await Moralis.Web3API.token.syncNFTContract({
            chain: chainId,
            address: address
        })
    }

    const mint = async (to, uri, signer) => {
        await contract.methods.mintNFT(to,uri).send({from: signer})
        .on('receipt', () => {
            triggerWeb3Api()
        })
    }

    const getNextTokenId = async () => {
        const result = await contract.methods.nextTokenId().call()
        setNextTokenId(result)
        return result
    }

    const getNextTokenIdByAddress = async (custom) => {
        const contract = new web3.eth.Contract(collectionAbi, custom)
        const result = await contract.methods.nextTokenId().call()
        setNextTokenIdByAddress(result)
        return {
            result,
            contract
        }
    }

    const getRoyaltyPercentage = async () => {
        await contract.methods.royaltyBps().call().then(setRoyaltyPercentage)
    }

    const getUri = async () => {
        return await contract.methods._contractURI().call()
    }

    return {
        mint,
        nextTokenId,
        getNextTokenIdByAddress,
        nextTokenIdByAddress,
        royaltyPercentage
    }
}