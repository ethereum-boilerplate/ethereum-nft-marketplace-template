export const collectionAbi = [
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_controlCenter",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
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
                "internalType": "uint256",
                "name": "_royaltyBps",
                "type": "uint256"
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
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "approved",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "tokenURI",
                "type": "string"
            }
        ],
        "name": "Minted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "tokenIds",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "string[]",
                "name": "tokenURI",
                "type": "string[]"
            }
        ],
        "name": "MintedBatch",
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
                "name": "transferable",
                "type": "bool"
            }
        ],
        "name": "RestrictedTransferUpdated",
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
                "internalType": "uint256",
                "name": "royaltyBps",
                "type": "uint256"
            }
        ],
        "name": "RoyaltyUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
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
        "name": "MINTER_ROLE",
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
        "name": "TRANSFER_ROLE",
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
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
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
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
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
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "creator",
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
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "getApproved",
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
                "name": "",
                "type": "address"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
            }
        ],
        "name": "mintNFT",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "string[]",
                "name": "_uris",
                "type": "string[]"
            }
        ],
        "name": "mintNFTBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [],
        "name": "name",
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
        "name": "nextTokenId",
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
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "nftURI",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
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
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
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
        "inputs": [],
        "name": "royaltyBps",
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
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "salePrice",
                "type": "uint256"
            }
        ],
        "name": "royaltyInfo",
        "outputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "royaltyAmount",
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
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "bool",
                "name": "_restrictedTransfer",
                "type": "bool"
            }
        ],
        "name": "setRestrictedTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_royaltyBps",
                "type": "uint256"
            }
        ],
        "name": "setRoyaltyBps",
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
        "name": "symbol",
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
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenByIndex",
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
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "tokenOfOwnerByIndex",
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
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
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
        "name": "totalSupply",
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
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "transfersRestricted",
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
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
export const collectionBytecode = "60806040523480156200001157600080fd5b5060405162003d5138038062003d518339810160408190526200003491620005f0565b82858584828281600290805190602001906200005292919062000493565b5080516200006890600390602084019062000493565b5050600c805460ff191690555080516200008a90600e90602084019062000493565b50620000a160006200009b620001b8565b620001d4565b620000d07f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66200009b620001b8565b620000ff7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200009b620001b8565b5050600f80546001600160a01b03199081166001600160a01b039485161790915560118054909116928916929092179091555081516200014790601390602085019062000493565b5062000152620001b8565b601080546001600160a01b0319166001600160a01b0392909216919091179055620001a17f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c6200009b620001b8565b620001ac81620001e4565b50505050505062000721565b6000620001cf620002ee60201b620018341760201c565b905090565b620001e0828262000327565b5050565b620001fa6000620001f4620001b8565b6200036a565b6200024c5760405162461bcd60e51b815260206004820152601660248201527f6f6e6c79206d6f64756c652061646d696e20726f6c650000000000000000000060448201526064015b60405180910390fd5b612710811115620002b35760405162461bcd60e51b815260206004820152602a60248201527f4e46543a204270732070726f7669646564206d757374206265206c6573732074604482015269068616e2031302c3030360b41b606482015260840162000243565b60168190556040518181527f244ea8d7627f5a08f4299862bd5a45752842c183aee5b0fb0d1e4887bfa605b39060200160405180910390a150565b600f546000906001600160a01b031633141562000312575060131936013560601c90565b620001cf6200039560201b6200185c1760201c565b6200033e82826200039960201b620018601760201c565b600082815260016020908152604090912062000365918390620018e562000423821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff165b92915050565b3390565b620003a582826200036a565b620001e0576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620003df620001b8565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006200043a836001600160a01b03841662000441565b9392505050565b60008181526001830160205260408120546200048a575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556200038f565b5060006200038f565b828054620004a190620006b5565b90600052602060002090601f016020900481019282620004c5576000855562000510565b82601f10620004e057805160ff191683800117855562000510565b8280016001018555821562000510579182015b8281111562000510578251825591602001919060010190620004f3565b506200051e92915062000522565b5090565b5b808211156200051e576000815560010162000523565b600082601f8301126200054b57600080fd5b81516001600160401b0380821115620005685762000568620006f2565b604051601f8301601f19908116603f01168101908282118183101715620005935762000593620006f2565b81604052838152602092508683858801011115620005b057600080fd5b600091505b83821015620005d45785820183015181830184015290820190620005b5565b83821115620005e65760008385830101525b9695505050505050565b60008060008060008060c087890312156200060a57600080fd5b8651620006178162000708565b60208801519096506001600160401b03808211156200063557600080fd5b620006438a838b0162000539565b965060408901519150808211156200065a57600080fd5b620006688a838b0162000539565b9550606089015191506200067c8262000708565b6080890151919450808211156200069257600080fd5b50620006a189828a0162000539565b92505060a087015190509295509295509295565b600181811c90821680620006ca57607f821691505b60208210811415620006ec57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146200071e57600080fd5b50565b61362080620007316000396000f3fe608060405234801561001057600080fd5b50600436106102bb5760003560e01c806370a0823111610182578063ac9650d8116100e9578063d5391393116100a2578063e8a3d4851161007c578063e8a3d48514610687578063e985e9c51461068f578063eacabe14146106cb578063efe47687146106de57600080fd5b8063d539139314610626578063d547741f1461064d578063e63ab1e91461066057600080fd5b8063ac9650d8146105bc578063b88d4fde146105dc578063c0e72740146105ef578063c63adb2b146105f7578063c87b56dd14610600578063ca15c8731461061357600080fd5b80639010d07c1161013b5780639010d07c1461056057806391d1485414610573578063938e3d7b1461058657806395d89b4114610599578063a217fddf146105a1578063a22cb465146105a957600080fd5b806370a082311461050d57806375794a3c146105205780638423df79146105295780638456cb591461053d5780638ba448c2146105455780638da5cb5b1461055857600080fd5b80632f745c59116102265780634f6ccce7116101df5780634f6ccce71461047e578063510b515814610491578063572b6c05146104ba5780635c975abb146104dc5780636352211e146104e75780636a627842146104fa57600080fd5b80632f745c591461041757806336568abe1461042a5780633f4ba83a1461043d57806342842e0e1461044557806342966c681461045857806349a33a2f1461046b57600080fd5b80631f72d831116102785780631f72d83114610362578063206b60f91461037557806323b872dd1461039c578063248a9ca3146103af5780632a55205a146103d25780632f2ff15d1461040457600080fd5b806301ffc9a7146102c057806306fdde03146102e8578063081812fc146102fd578063095ea7b31461032857806313af40351461033d57806318160ddd14610350575b600080fd5b6102d36102ce366004612fbc565b6106f1565b60405190151581526020015b60405180910390f35b6102f061071d565b6040516102df919061327b565b61031061030b366004612f5c565b6107af565b6040516001600160a01b0390911681526020016102df565b61033b610336366004612ed3565b610849565b005b61033b61034b366004612c76565b610971565b600a545b6040519081526020016102df565b61033b610370366004612f5c565b610a52565b6103547f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c81565b61033b6103aa366004612ce9565b610b1c565b6103546103bd366004612f5c565b60009081526020819052604090206001015490565b6103e56103e0366004612f9a565b610b54565b604080516001600160a01b0390931683526020830191909152016102df565b61033b610412366004612f75565b610bfb565b610354610425366004612ed3565b610c28565b61033b610438366004612f75565b610cbe565b61033b610d4c565b61033b610453366004612ce9565b610df6565b61033b610466366004612f5c565b610e11565b61033b610479366004612e0a565b610e8d565b61035461048c366004612f5c565b611066565b61031061049f366004612f5c565b6015602052600090815260409020546001600160a01b031681565b6102d36104c8366004612c76565b600f546001600160a01b0391821691161490565b600c5460ff166102d3565b6103106104f5366004612f5c565b6110f9565b61033b610508366004612c76565b611170565b61035461051b366004612c76565b6111b8565b61035460125481565b600f546102d390600160a01b900460ff1681565b61033b61123f565b61033b610553366004612f41565b6112e5565b61031061135b565b61031061056e366004612f9a565b611391565b6102d3610581366004612f75565b6113b0565b61033b610594366004612ff6565b6113d9565b6102f061140e565b610354600081565b61033b6105b7366004612e5f565b61141d565b6105cf6105ca366004612eff565b61142f565b6040516102df9190613145565b61033b6105ea366004612d2a565b611524565b6102f0611563565b61035460165481565b6102f061060e366004612f5c565b6115f1565b610354610621366004612f5c565b611693565b6103547f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61033b61065b366004612f75565b6116aa565b6103547f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102f06116d2565b6102d361069d366004612cb0565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b61033b6106d9366004612e8b565b6116e1565b6102f06106ec366004612f5c565b61181b565b60006106fc826118fa565b8061071757506001600160e01b0319821663152a902d60e11b145b92915050565b60606002805461072c906134ea565b80601f0160208091040260200160405190810160405280929190818152602001828054610758906134ea565b80156107a55780601f1061077a576101008083540402835291602001916107a5565b820191906000526020600020905b81548152906001019060200180831161078857829003601f168201915b5050505050905090565b6000818152600460205260408120546001600160a01b031661082d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600660205260409020546001600160a01b031690565b6000610854826110f9565b9050806001600160a01b0316836001600160a01b031614156108c25760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610824565b806001600160a01b03166108d4611905565b6001600160a01b031614806108f057506108f08161069d611905565b6109625760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610824565b61096c838361190f565b505050565b61097e6000610581611905565b61099a5760405162461bcd60e51b8152600401610824906132e0565b6109a56000826113b0565b6109f15760405162461bcd60e51b815260206004820152601b60248201527f6e6577206f776e6572206e6f74206d6f64756c652061646d696e2e00000000006044820152606401610824565b601080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f70aea8d848e8a90fb7661b227dc522eb6395c3dac71b63cb59edd5c9899b2364910160405180910390a15050565b610a5f6000610581611905565b610a7b5760405162461bcd60e51b8152600401610824906132e0565b612710811115610ae05760405162461bcd60e51b815260206004820152602a60248201527f4e46543a204270732070726f7669646564206d757374206265206c6573732074604482015269068616e2031302c3030360b41b6064820152608401610824565b60168190556040518181527f244ea8d7627f5a08f4299862bd5a45752842c183aee5b0fb0d1e4887bfa605b3906020015b60405180910390a150565b610b2d610b27611905565b8261197d565b610b495760405162461bcd60e51b81526004016108249061337c565b61096c838383611a74565b60115460405163f2aab4b360e01b815230600482015260009182916001600160a01b039091169063f2aab4b39060240160206040518083038186803b158015610b9c57600080fd5b505afa158015610bb0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bd49190612c93565b60165490925061271090610be89085613471565b610bf2919061344f565b90509250929050565b600082815260208190526040902060010154610c1e81610c19611905565b611c1f565b61096c8383611c83565b6000610c33836111b8565b8210610c955760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b6064820152608401610824565b506001600160a01b03919091166000908152600860209081526040808320938352929052205490565b610cc6611905565b6001600160a01b0316816001600160a01b031614610d3e5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b6064820152608401610824565b610d488282611ca5565b5050565b610d787f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610581611905565b610dec576040805162461bcd60e51b81526020600482015260248101919091527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f20756e70617573656064820152608401610824565b610df4611cc7565b565b61096c83838360405180602001604052806000815250611524565b610e1c610b27611905565b610e815760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201526f1b995c881b9bdc88185c1c1c9bdd995960821b6064820152608401610824565b610e8a81611d60565b50565b600c5460ff1615610eb05760405162461bcd60e51b815260040161082490613310565b610edc7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610581611905565b610ef85760405162461bcd60e51b81526004016108249061333a565b60008167ffffffffffffffff811115610f1357610f13613582565b604051908082528060200260200182016040528015610f3c578160200160208202803683370190505b506012549091506000610f4d611905565b905060005b848110156110075782848281518110610f6d57610f6d61356c565b602002602001018181525050858582818110610f8b57610f8b61356c565b9050602002810190610f9d91906133f0565b6000858152601460205260409020610fb6929091612b3a565b50600083815260156020526040902080546001600160a01b0319166001600160a01b038416179055610fe88784611e07565b610ff3600184613437565b925080610fff81613525565b915050610f52565b5081601281905550856001600160a01b0316816001600160a01b03167f2a7af4d3b262c3e3d51c600cdf7a940c9aba3fedcc85148aeda266cc4c4a2f33858888604051611056939291906131a7565b60405180910390a3505050505050565b6000611071600a5490565b82106110d45760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b6064820152608401610824565b600a82815481106110e7576110e761356c565b90600052602060002001549050919050565b6000818152600460205260408120546001600160a01b0316806107175760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610824565b60405162461bcd60e51b815260206004820152601d60248201527f4e46543732313a2043616c6c206d696e744e465420696e73746561642e0000006044820152606401610824565b60006001600160a01b0382166112235760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610824565b506001600160a01b031660009081526005602052604090205490565b61126b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a610581611905565b6112dd5760405162461bcd60e51b815260206004820152603e60248201527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f20706175736500006064820152608401610824565b610df4611f55565b6112f26000610581611905565b61130e5760405162461bcd60e51b8152600401610824906132e0565b600f8054821515600160a01b0260ff60a01b199091161790556040517ffb4ba02cee22486df888d7ffb97c6100ec3193781e025cb9a4bc6fc358d626cc90610b1190831515815260200190565b6010546000906113759082906001600160a01b03166113b0565b61137f5750600090565b6010546001600160a01b03165b905090565b60008281526001602052604081206113a99083611fae565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6113e66000610581611905565b6114025760405162461bcd60e51b8152600401610824906132e0565b61096c60138383612b3a565b60606003805461072c906134ea565b610d48611428611905565b8383611fba565b60608167ffffffffffffffff81111561144a5761144a613582565b60405190808252806020026020018201604052801561147d57816020015b60608152602001906001900390816114685790505b50905060005b8281101561151d576114ed308585848181106114a1576114a161356c565b90506020028101906114b391906133f0565b8080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061208992505050565b8282815181106114ff576114ff61356c565b6020026020010181905250808061151590613525565b915050611483565b5092915050565b61153561152f611905565b8361197d565b6115515760405162461bcd60e51b81526004016108249061337c565b61155d848484846120ae565b50505050565b60138054611570906134ea565b80601f016020809104026020016040519081016040528092919081815260200182805461159c906134ea565b80156115e95780601f106115be576101008083540402835291602001916115e9565b820191906000526020600020905b8154815290600101906020018083116115cc57829003601f168201915b505050505081565b600081815260146020526040902080546060919061160e906134ea565b80601f016020809104026020016040519081016040528092919081815260200182805461163a906134ea565b80156116875780601f1061165c57610100808354040283529160200191611687565b820191906000526020600020905b81548152906001019060200180831161166a57829003601f168201915b50505050509050919050565b6000818152600160205260408120610717906120e1565b6000828152602081905260409020600101546116c881610c19611905565b61096c8383611ca5565b60606013805461072c906134ea565b600c5460ff16156117045760405162461bcd60e51b815260040161082490613310565b6117307f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610581611905565b61174c5760405162461bcd60e51b81526004016108249061333a565b6012546000818152601460205260409020611768908484612b3a565b50611771611905565b600082815260156020526040902080546001600160a01b0319166001600160a01b03929092169190911790556117a78482611e07565b6001601260008282546117ba9190613437565b90915550506001600160a01b0384166117d1611905565b6001600160a01b03167fafe8c5a4c36942a61550534b714a0076ab46ef8ef23e361572aad8b7ca2ac27d83868660405161180d939291906133cd565b60405180910390a350505050565b60146020526000908152604090208054611570906134ea565b600f546000906001600160a01b0316331415611857575060131936013560601c90565b503390565b3390565b61186a82826113b0565b610d48576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556118a1611905565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006113a9836001600160a01b0384166120eb565b60006107178261213a565b600061138c611834565b600081815260066020526040902080546001600160a01b0319166001600160a01b0384169081179091558190611944826110f9565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600460205260408120546001600160a01b03166119f65760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610824565b6000611a01836110f9565b9050806001600160a01b0316846001600160a01b03161480611a3c5750836001600160a01b0316611a31846107af565b6001600160a01b0316145b80611a6c57506001600160a01b0380821660009081526007602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316611a87826110f9565b6001600160a01b031614611aef5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610824565b6001600160a01b038216611b515760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610824565b611b5c83838361215f565b611b6760008261190f565b6001600160a01b0383166000908152600560205260408120805460019290611b90908490613490565b90915550506001600160a01b0382166000908152600560205260408120805460019290611bbe908490613437565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b611c2982826113b0565b610d4857611c41816001600160a01b03166014612269565b611c4c836020612269565b604051602001611c5d92919061309d565b60408051601f198184030181529082905262461bcd60e51b82526108249160040161327b565b611c8d8282611860565b600082815260016020526040902061096c90826118e5565b611caf8282612405565b600082815260016020526040902061096c9082612488565b600c5460ff16611d105760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610824565b600c805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611d43611905565b6040516001600160a01b03909116815260200160405180910390a1565b6000611d6b826110f9565b9050611d798160008461215f565b611d8460008361190f565b6001600160a01b0381166000908152600560205260408120805460019290611dad908490613490565b909155505060008281526004602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b038216611e5d5760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610824565b6000818152600460205260409020546001600160a01b031615611ec25760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610824565b611ece6000838361215f565b6001600160a01b0382166000908152600560205260408120805460019290611ef7908490613437565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600c5460ff1615611f785760405162461bcd60e51b815260040161082490613310565b600c805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611d43611905565b60006113a9838361249d565b816001600160a01b0316836001600160a01b0316141561201c5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610824565b6001600160a01b03838116600081815260076020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60606113a983836040518060600160405280602781526020016135c4602791396124c7565b6120b9848484611a74565b6120c58484848461259b565b61155d5760405162461bcd60e51b81526004016108249061328e565b6000610717825490565b600081815260018301602052604081205461213257508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610717565b506000610717565b60006001600160e01b0319821663780e9d6360e01b14806107175750610717826126af565b61216a8383836126ef565b600f54600160a01b900460ff16801561218b57506001600160a01b03831615155b801561219f57506001600160a01b03821615155b1561096c576121ce7f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c846113b0565b806121fe57506121fe7f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c836113b0565b61096c5760405162461bcd60e51b815260206004820152603660248201527f4e46543a205472616e736665727320617265207265737472696374656420746f604482015275205452414e534645525f524f4c4520686f6c6465727360501b6064820152608401610824565b60606000612278836002613471565b612283906002613437565b67ffffffffffffffff81111561229b5761229b613582565b6040519080825280601f01601f1916602001820160405280156122c5576020820181803683370190505b509050600360fc1b816000815181106122e0576122e061356c565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061230f5761230f61356c565b60200101906001600160f81b031916908160001a9053506000612333846002613471565b61233e906001613437565b90505b60018111156123b6576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106123725761237261356c565b1a60f81b8282815181106123885761238861356c565b60200101906001600160f81b031916908160001a90535060049490941c936123af816134d3565b9050612341565b5083156113a95760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610824565b61240f82826113b0565b15610d48576000828152602081815260408083206001600160a01b03851684529091529020805460ff19169055612444611905565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006113a9836001600160a01b0384166126fa565b60008260000182815481106124b4576124b461356c565b9060005260206000200154905092915050565b6060833b6125265760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610824565b600080856001600160a01b0316856040516125419190613081565b600060405180830381855af49150503d806000811461257c576040519150601f19603f3d011682016040523d82523d6000602084013e612581565b606091505b50915091506125918282866127ed565b9695505050505050565b60006001600160a01b0384163b156126a457836001600160a01b031663150b7a026125c4611905565b8786866040518563ffffffff1660e01b81526004016125e69493929190613112565b602060405180830381600087803b15801561260057600080fd5b505af1925050508015612630575060408051601f3d908101601f1916820190925261262d91810190612fd9565b60015b61268a573d80801561265e576040519150601f19603f3d011682016040523d82523d6000602084013e612663565b606091505b5080516126825760405162461bcd60e51b81526004016108249061328e565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611a6c565b506001949350505050565b60006001600160e01b031982166380ac58cd60e01b14806126e057506001600160e01b03198216635b5e139f60e01b145b80610717575061071782612826565b61096c83838361284b565b600081815260018301602052604081205480156127e357600061271e600183613490565b855490915060009061273290600190613490565b90508181146127975760008660000182815481106127525761275261356c565b90600052602060002001549050808760000184815481106127755761277561356c565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806127a8576127a8613556565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610717565b6000915050610717565b606083156127fc5750816113a9565b82511561280c5782518084602001fd5b8160405162461bcd60e51b8152600401610824919061327b565b60006001600160e01b03198216635a05180f60e01b14806107175750610717826128bd565b6128568383836128f2565b600c5460ff161561096c5760405162461bcd60e51b815260206004820152602b60248201527f4552433732315061757361626c653a20746f6b656e207472616e73666572207760448201526a1a1a5b19481c185d5cd95960aa1b6064820152608401610824565b60006001600160e01b03198216637965db0b60e01b148061071757506301ffc9a760e01b6001600160e01b0319831614610717565b6001600160a01b03831661294d5761294881600a80546000838152600b60205260408120829055600182018355919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80155565b612970565b816001600160a01b0316836001600160a01b0316146129705761297083826129aa565b6001600160a01b0382166129875761096c81612a47565b826001600160a01b0316826001600160a01b03161461096c5761096c8282612af6565b600060016129b7846111b8565b6129c19190613490565b600083815260096020526040902054909150808214612a14576001600160a01b03841660009081526008602090815260408083208584528252808320548484528184208190558352600990915290208190555b5060009182526009602090815260408084208490556001600160a01b039094168352600881528383209183525290812055565b600a54600090612a5990600190613490565b6000838152600b6020526040812054600a8054939450909284908110612a8157612a8161356c565b9060005260206000200154905080600a8381548110612aa257612aa261356c565b6000918252602080832090910192909255828152600b9091526040808220849055858252812055600a805480612ada57612ada613556565b6001900381819060005260206000200160009055905550505050565b6000612b01836111b8565b6001600160a01b039093166000908152600860209081526040808320868452825280832085905593825260099052919091209190915550565b828054612b46906134ea565b90600052602060002090601f016020900481019282612b685760008555612bae565b82601f10612b815782800160ff19823516178555612bae565b82800160010185558215612bae579182015b82811115612bae578235825591602001919060010190612b93565b50612bba929150612bbe565b5090565b5b80821115612bba5760008155600101612bbf565b60008083601f840112612be557600080fd5b50813567ffffffffffffffff811115612bfd57600080fd5b6020830191508360208260051b8501011115612c1857600080fd5b9250929050565b80358015158114612c2f57600080fd5b919050565b60008083601f840112612c4657600080fd5b50813567ffffffffffffffff811115612c5e57600080fd5b602083019150836020828501011115612c1857600080fd5b600060208284031215612c8857600080fd5b81356113a981613598565b600060208284031215612ca557600080fd5b81516113a981613598565b60008060408385031215612cc357600080fd5b8235612cce81613598565b91506020830135612cde81613598565b809150509250929050565b600080600060608486031215612cfe57600080fd5b8335612d0981613598565b92506020840135612d1981613598565b929592945050506040919091013590565b60008060008060808587031215612d4057600080fd5b8435612d4b81613598565b93506020850135612d5b81613598565b925060408501359150606085013567ffffffffffffffff80821115612d7f57600080fd5b818701915087601f830112612d9357600080fd5b813581811115612da557612da5613582565b604051601f8201601f19908116603f01168101908382118183101715612dcd57612dcd613582565b816040528281528a6020848701011115612de657600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080600060408486031215612e1f57600080fd5b8335612e2a81613598565b9250602084013567ffffffffffffffff811115612e4657600080fd5b612e5286828701612bd3565b9497909650939450505050565b60008060408385031215612e7257600080fd5b8235612e7d81613598565b9150610bf260208401612c1f565b600080600060408486031215612ea057600080fd5b8335612eab81613598565b9250602084013567ffffffffffffffff811115612ec757600080fd5b612e5286828701612c34565b60008060408385031215612ee657600080fd5b8235612ef181613598565b946020939093013593505050565b60008060208385031215612f1257600080fd5b823567ffffffffffffffff811115612f2957600080fd5b612f3585828601612bd3565b90969095509350505050565b600060208284031215612f5357600080fd5b6113a982612c1f565b600060208284031215612f6e57600080fd5b5035919050565b60008060408385031215612f8857600080fd5b823591506020830135612cde81613598565b60008060408385031215612fad57600080fd5b50508035926020909101359150565b600060208284031215612fce57600080fd5b81356113a9816135ad565b600060208284031215612feb57600080fd5b81516113a9816135ad565b6000806020838503121561300957600080fd5b823567ffffffffffffffff81111561302057600080fd5b612f3585828601612c34565b600081518084526130448160208601602086016134a7565b601f01601f19169290920160200192915050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600082516130938184602087016134a7565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516130d58160178501602088016134a7565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516131068160288401602088016134a7565b01602801949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906125919083018461302c565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561319a57603f1988860301845261318885835161302c565b9450928501929085019060010161316c565b5092979650505050505050565b604080825284519082018190526000906020906060840190828801845b828110156131e0578151845292840192908401906001016131c4565b50505083810382850152848152818101600586901b820183018760005b8881101561326c57848303601f190184528135368b9003601e1901811261322357600080fd5b8a01803567ffffffffffffffff81111561323c57600080fd5b8036038c131561324b57600080fd5b61325885828a8501613058565b9588019594505050908501906001016131fd565b50909998505050505050505050565b6020815260006113a9602083018461302c565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6020808252601690820152756f6e6c79206d6f64756c652061646d696e20726f6c6560501b604082015260600190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526022908201527f4e46543a206d7573742068617665206d696e74657220726f6c6520746f206d696040820152611b9d60f21b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b8381526040602082015260006133e7604083018486613058565b95945050505050565b6000808335601e1984360301811261340757600080fd5b83018035915067ffffffffffffffff82111561342257600080fd5b602001915036819003821315612c1857600080fd5b6000821982111561344a5761344a613540565b500190565b60008261346c57634e487b7160e01b600052601260045260246000fd5b500490565b600081600019048311821515161561348b5761348b613540565b500290565b6000828210156134a2576134a2613540565b500390565b60005b838110156134c25781810151838201526020016134aa565b8381111561155d5750506000910152565b6000816134e2576134e2613540565b506000190190565b600181811c908216806134fe57607f821691505b6020821081141561351f57634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561353957613539613540565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610e8a57600080fd5b6001600160e01b031981168114610e8a57600080fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220d92a6a92ad1fb1017eb33bb6f4b42e4c86f970086e7cfb208dea8cb87a93d35c64736f6c63430008070033"