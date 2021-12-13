import Moralis from "moralis"
const web3 = new Moralis.Web3()
const types = [ "Token",  "NFT Bundle",  "NFT Collection",  "Dynamic NFT",  "Access NFT",  "Pack",  "NFT Marketplace", "Other" ]
export const getModuleType = (id, length) => {
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < length; j++) {
            if(web3.utils.soliditySha3(j,i) === id) {
                return types[i]
            }
        }
    }
}

export const getFirstMarketplace = (id,length) => {
    for(let j = 0; j < length; j++) {
        if(web3.utils.soliditySha3(j,6) === id) {
            return id
        }
    }
}

export const getModuleColor = (type)  =>{
    if(type === "Token") {
        return "geekblue"
    }
    if(type === "NFT Bundle") {
        return "cyan"
    }
    if(type === "NFT Marketplace") {
        return "gold"
    }
    if(type === "NFT Collection") {
        return "lime"
    }
}

