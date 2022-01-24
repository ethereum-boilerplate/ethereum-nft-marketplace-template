import { collectionAbi } from "../../../Forms/Factory/collection"
import { useState, useEffect } from "react"
import {useMoralis, useMoralisWeb3Api} from "react-moralis"


export const useCollection = (web3, address) => {
    const [ nextTokenId, setNextTokenId ] = useState("")
    const [ nextTokenIdByAddress, setNextTokenIdByAddress ] = useState("")
    const { chainId } = useMoralis()
    const [ royaltyPercentage, setRoyaltyPercentage ] = useState(0)
    const Web3API = useMoralisWeb3Api()

    useEffect(() => {
        if(address && web3) {
            getNextTokenId()
            getRoyaltyPercentage()
            getUri()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address, web3])

    const triggerWeb3Api = async () => {
        await Web3API.token.syncNFTContract({
            chain: chainId,
            address: address
        })
        const nextToken = await getNextTokenId()
        await Web3API.token.reSyncMetadata({
            chain: chainId,
            address: address,
            token_id: nextToken-1
        })
    }

    const mint = async (to, uri, signer) => {
        const contract = new web3.eth.Contract(collectionAbi, address)

        await contract.methods.mintNFT(to,uri).send({from: signer})
        .on('receipt', () => {
            triggerWeb3Api()
        })
    }

    const getNextTokenId = async () => {
        const contract = await new web3.eth.Contract(collectionAbi, (address ? address : ""))
        const result = await contract.methods.nextTokenId().call()
        setNextTokenId(result)
        return result
    }

    const getNextTokenIdByAddress = async (custom) => {
        const contract = await new web3.eth.Contract(collectionAbi, custom)
        const result = await contract.methods.nextTokenId().call()
        setNextTokenIdByAddress(result)
        return {
            result,
            contract
        }
    }

    const getRoyaltyPercentage = async () => {
        const contract = await new web3.eth.Contract(collectionAbi, (address ? address : ""))

        await contract.methods.royaltyBps().call().then(setRoyaltyPercentage)
    }

    const getUri = async () => {
        const contract = await new web3.eth.Contract(collectionAbi, (address ? address : ""))

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