import { collectionAbi } from "./collection"
import { useState } from "react"
import { useMoralis } from "react-moralis"
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider"


export const useCollection = (web3, address) => {
    const [ nextTokenId, setNextTokenId ] = useState("")
    const { Moralis } = useMoralis()
    const { chainId } = useMoralisDapp()
    const [ royaltyPercentage, setRoyaltyPercentage ] = useState(0)
    const contract = new web3.eth.Contract(collectionAbi, address)

    const triggerWeb3Api = async (receipt) => {
        await Moralis.Web3API.token.syncNFTContract({
            chain: chainId,
            address: address
        })
    }

    const mint = async (to, uri, signer) => {
        await contract.methods.mintNFT(to,uri).send({from: signer})
        .on('receipt', (receipt) => {
            triggerWeb3Api()
        })
    }

    const getNextTokenId = async () => {
        const result = await contract.methods.nextTokenId().call()
        setNextTokenId(result)
        return result
    }

    const getRoyaltyPercentage = async () => {
        await contract.methods.royaltyBps().call().then(setRoyaltyPercentage)
    }

    const getUri = async () => {
        return await contract.methods._contractURI().call()
    }

    getNextTokenId()
    getRoyaltyPercentage()
    getUri()

    return {
        mint,
        nextTokenId,
        royaltyPercentage
    }
}