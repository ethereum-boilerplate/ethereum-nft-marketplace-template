const marketplaceInterface = () => {

    const output_component = [
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
        ]

    const getAllListingsAbi = {
        "inputs": [],
        "name": "getAllListings",
        "outputs": [
            {
                "components": output_component,
                "internalType": "struct Market.Listing[]",
                "name": "allListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
    const getListingsByUserAbi = {
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
                "components": output_component,
                "internalType": "struct Market.Listing[]",
                "name": "sellerListings",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

    return {
        getAllListingsAbi,
        getListingsByUserAbi
    }
}

export default marketplaceInterface;