import Moralis from "moralis"
import Web3 from "web3"; // Only when using npm/yarn
const types = [ "Token",  "NFT Bundle",  "NFT Collection",  "Dynamic NFT",  "Access NFT",  "Pack",  "NFT Marketplace", "Other" ]

export const getModuleType = (id, length) => {
    const web3 = new Web3(Moralis.provider)
    for(let i = 0; i < types.length; i++) {
        for(let j = 0; j < length; j++) {
            if(web3.utils.soliditySha3(j,i) === id) {
                console.log('lol', types[i])
                return types[i]
            }
        }
    }
}

export const getFirstMarketplace =  (id,length) => {
    const web3 = new Web3(Moralis.provider)
    for(let j = 0; j < length; j++) {
        if(web3.utils.soliditySha3(j,6) === id) {
            return id
        }
    }
}

export const getModuleColor = (type)  =>{
    if(type === "Token") {
        return "green"
    }
    if(type === "NFT Bundle") {
        return "yellow"
    }
    if(type === "NFT Marketplace") {
        return "red"
    }
    if(type === "NFT Collection") {
        return "purple"
    }
}

