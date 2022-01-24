import { useState, useEffect } from "react"
import { useMoralis, useMoralisWeb3Api } from "react-moralis"
export const useMarketplace = (web3, marketplaceAddress, currentUser) => {
    const [confirmed, setConfirmed] = useState(false)
    const [isListing, toggleIsListing] = useState(false)
    const [isUnlisting, setIsUnlisting] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [ currentUsersListings, setUsersListings ] = useState([])
    const [error, setError] = useState(null)
    const [ isApproved, setApproved ] = useState(false)
    const [ itemsCount, incrementItemsCount ] = useState(0)
    const [ allListings, setAllListings] = useState([])
    const [ isUpdating, setUpdating ] = useState(false)
    const [ isUpdated, setUpdated ] = useState(false)
    const [ loadingListings, setLoadingListings] = useState(true)
    const { token } = useMoralisWeb3Api()
    const { chainId } = useMoralis()

    useEffect(() => {
        if(web3 && marketplaceAddress) {
            getAllListings()
            if(currentUser) {
                getListingsByUser(currentUser)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, marketplaceAddress, currentUser])
    // DONE
    const getAllListings = async () => {
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        const listings = await contract.methods.getAllListings().call()
        await listings.forEach(async (item) => {
            // If Quantity is 0 then item is not on sale 
            if(item.quantity === "0") return;
            incrementItemsCount(itemsCount+1)
            const call = await token.getTokenIdMetadata({
                address: item.assetContract,
                chain: chainId,
                token_id: item.tokenId
            })
            const metadata = JSON.parse(call.metadata)
            const currency = await token.getTokenMetadata({
                addresses: [item.currency],
                chain: chainId,
            })
            setAllListings( prev => [...prev, {...item, key: item.listingId, metadata, tokenInfo: currency}])
        })

        setLoadingListings(false)
    }
    /*
    * done
     */
    const getListingsByUser = async (user) => {
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        const listings = await contract.methods.getListingsBySeller(user).call()
        await listings.forEach(async (item) => {
            let buyer = "N/A"
            if(item.quantity === "0") {
                buyer = "Need to Sync Event"
                return
            }
            const call = await token.getTokenIdMetadata({
                address: item.assetContract,
                chain: chainId,
                token_id: item.tokenId
            }).catch(() => {return})
            let metadata
            if(!call?.metadata) {
                metadata = {}
                return
            } else {
                metadata = JSON.parse(call.metadata)
            }
            const currency = await token.getTokenMetadata({
                addresses: [item.currency],
                chain: chainId,
            })
            setUsersListings( prev => [...prev, {...item, key: item.listingId, metadata, tokenInfo: currency, buyer}])
        })
        setLoadingListings(false)
    }

    const getListingsByContract = async (address) => {
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        return await contract.methods.getListingsByContract(address).call()
    }

    const getContractURI = async () => {
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        const uri = await contract.methods._contractURI().call()
        return uri
    }

    const approve = async (assetContract, signer) => {
        toggleIsListing(true)
        const contract = await new web3.eth.Contract(standardNFTAbi, assetContract)
        await contract.methods.setApprovalForAll(marketplaceAddress, true).send({from: signer})
        .on('receipt', () => {
            setApproved(true)
        })
    }

    const hasApproved = async (assetContract, signer) => {
        const contract = await new web3.eth.Contract(standardNFTAbi, assetContract)
        const result = await contract.methods.isApprovedForAll(signer, marketplaceAddress).call()
        setApproved(result)
        return result
    }

    const hasEnoughTokensToBuy = async (currency, amount, wallet) => {
        if(currency === "0x0000000000000000000000000000000000000000") return true
        const contract = await new web3.eth.Contract(erc20abi, currency)
        console.log(wallet)
        return (await contract.methods.balanceOf(wallet).call() >= amount)
    }

    const listNFT = async (assetContract, tokenId, currency = "", pricePerToken = "0", quantity = 1, tokensPerBuyer = 0, secondsUntilStart = 0, secondsUntilEnd = 0, signer) => {
        if(tokensPerBuyer === 0) tokensPerBuyer = quantity
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)

        const run = async () => {
            if(!(await hasApproved(assetContract, signer))) {
                await approve(assetContract,signer)
            } 
                await contract.methods
                .list(assetContract,tokenId,currency,pricePerToken,quantity,tokensPerBuyer,secondsUntilStart, secondsUntilEnd)
                .send({from: signer})
                .on('receipt', (receipt) => {
                    toggleIsListing(false)
                    setConfirmed(true)
                })
                .on('error', (error) => {
                    toggleIsListing(false)
                    setError(error)
                })
            
        }

        run()

    
        return {
            confirmed,
            error,
            run
        }
    }

    const unlist = async (listingId, amount, currentUser) => {
        setIsUnlisting(true)
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        await contract.methods.unlist(listingId, amount).send({from : currentUser})
        .on('receipt', (receipt) => {
            setIsUnlisting(false)
            return receipt
        })
    }

    const buy = async (listingId, quantity, currency, pricePerToken, signer) => {
        setIsBuying(true)
        console.log(pricePerToken)
        try {
            if(currency !== "0x0000000000000000000000000000000000000000") {
            const erc20Token = await new web3.eth.Contract(erc20abi, currency)
            const hasApprovedErc20Token = await erc20Token.methods.allowance(signer, marketplaceAddress).call()
            if(!hasApprovedErc20Token) {
                alert('Token To buy does not exist')
                setIsBuying(false)
                return
            }
            if(hasApprovedErc20Token < pricePerToken) {
                await erc20Token.methods.approve(marketplaceAddress, pricePerToken).send({from: signer})
            }
            }
            const contract = await new web3.eth.Contract(abi, marketplaceAddress)
            await contract.methods.buy(listingId, quantity).send({from: signer})
            .on('receipt', () => {
                setIsBuying(false)
            })
            } catch (error) {
                setIsBuying(false)
            }
    }

    const updateListingParams = async (listingId,ppt,currency,tpb = 0,sus = 0,sue = 0,signer) => {
        setUpdating(true)
        const contract = await new web3.eth.Contract(abi, marketplaceAddress)
        await contract.methods.updateListingParams(listingId,ppt,currency,tpb,sus,sue).send({from: signer})
        .on('receipt', () => {
            setUpdating(false)
            setUpdated(true)
        })
    }

    return {
        listNFT,
        updateListingParams,
        isUpdating,
        isUpdated,
        getAllListings,
        getListingsByUser,
        currentUsersListings,
        getListingsByContract,
        isListing,
        loadingListings,
        unlist,
        isUnlisting,
        allListings,
        hasApproved,
        hasEnoughTokensToBuy,
        isApproved,
        buy,
        isBuying,
        getContractURI
    }
}

export const standardNFTAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

export const erc20abi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
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
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const abi = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_controlCenter",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_trustedForwarder",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
            },
            {
                "internalType": "uint128",
                "name": "_marketFeeBps",
                "type": "uint128"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "indexed": false,
                "internalType": "struct Market.Listing",
                "name": "listing",
                "type": "tuple"
            }
        ],
        "name": "ListingUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "newFee",
                "type": "uint128"
            }
        ],
        "name": "MarketFeeUpdate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "assetContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "indexed": false,
                "internalType": "struct Market.Listing",
                "name": "listing",
                "type": "tuple"
            }
        ],
        "name": "NewListing",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "assetContract",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "indexed": false,
                "internalType": "struct Market.Listing",
                "name": "listing",
                "type": "tuple"
            }
        ],
        "name": "NewSale",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "bool",
                "name": "restricted",
                "type": "bool"
            }
        ],
        "name": "RestrictedListerRoleUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "LISTER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "PAUSER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "_contractURI",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "addToListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "boughtFromListing",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contractURI",
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
        "name": "getAllListings",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Market.Listing[]",
                "name": "allListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingId",
                "type": "uint256"
            }
        ],
        "name": "getListing",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Market.Listing",
                "name": "listing",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_assetContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "getListingsByAsset",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Market.Listing[]",
                "name": "tokenListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_assetContract",
                "type": "address"
            }
        ],
        "name": "getListingsByAssetContract",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Market.Listing[]",
                "name": "tokenListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_seller",
                "type": "address"
            }
        ],
        "name": "getListingsBySeller",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "listingId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "seller",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "assetContract",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "quantity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currency",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pricePerToken",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "saleEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokensPerBuyer",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum Market.TokenType",
                        "name": "tokenType",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct Market.Listing[]",
                "name": "sellerListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getRoleMember",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleMemberCount",
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
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "forwarder",
                "type": "address"
            }
        ],
        "name": "isTrustedForwarder",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_assetContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_currency",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_tokensPerBuyer",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_secondsUntilStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_secondsUntilEnd",
                "type": "uint256"
            }
        ],
        "name": "list",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "listings",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "listingId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "seller",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "assetContract",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "currency",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "pricePerToken",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "saleStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "saleEnd",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokensPerBuyer",
                "type": "uint256"
            },
            {
                "internalType": "enum Market.TokenType",
                "name": "tokenType",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "marketFeeBps",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes[]",
                "name": "data",
                "type": "bytes[]"
            }
        ],
        "name": "multicall",
        "outputs": [
            {
                "internalType": "bytes[]",
                "name": "results",
                "type": "bytes[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC1155BatchReceived",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC1155Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "onERC721Received",
        "outputs": [
            {
                "internalType": "bytes4",
                "name": "",
                "type": "bytes4"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "restrictedListerRoleOnly",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_URI",
                "type": "string"
            }
        ],
        "name": "setContractURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint128",
                "name": "feeBps",
                "type": "uint128"
            }
        ],
        "name": "setMarketFeeBps",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "restricted",
                "type": "bool"
            }
        ],
        "name": "setRestrictedListerRoleOnly",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalListings",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "unlist",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_listingId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerToken",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_currency",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokensPerBuyer",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_secondsUntilStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_secondsUntilEnd",
                "type": "uint256"
            }
        ],
        "name": "updateListingParams",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]