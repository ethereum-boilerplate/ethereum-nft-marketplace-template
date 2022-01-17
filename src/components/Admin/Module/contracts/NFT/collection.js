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
export const collectionBytecode = "60806040523480156200001157600080fd5b5060405162003d7138038062003d718339810160408190526200003491620005c6565b82858584828281600290805190602001906200005292919062000469565b5080516200006890600390602084019062000469565b5050600c805460ff191690555080516200008a90600e90602084019062000469565b50620000a160006200009b6200018e565b620001aa565b620000d07f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66200009b6200018e565b620000ff7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200009b6200018e565b5050600f80546001600160a01b03199081166001600160a01b039485161790915560108054909116928916929092179091555081516200014790601290602085019062000469565b50620001777f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c6200009b6200018e565b6200018281620001ba565b505050505050620006f7565b6000620001a5620002c460201b620018761760201c565b905090565b620001b68282620002fd565b5050565b620001d06000620001ca6200018e565b62000340565b620002225760405162461bcd60e51b815260206004820152601660248201527f6f6e6c79206d6f64756c652061646d696e20726f6c650000000000000000000060448201526064015b60405180910390fd5b612710811115620002895760405162461bcd60e51b815260206004820152602a60248201527f4e46543a204270732070726f7669646564206d757374206265206c6573732074604482015269068616e2031302c3030360b41b606482015260840162000219565b60158190556040518181527f244ea8d7627f5a08f4299862bd5a45752842c183aee5b0fb0d1e4887bfa605b39060200160405180910390a150565b600f546000906001600160a01b0316331415620002e8575060131936013560601c90565b620001a56200036b60201b620018a31760201c565b6200031482826200036f60201b620018a71760201c565b60008281526001602090815260409091206200033b9183906200192c620003f9821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff165b92915050565b3390565b6200037b828262000340565b620001b6576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620003b56200018e565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600062000410836001600160a01b03841662000417565b9392505050565b6000818152600183016020526040812054620004605750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000365565b50600062000365565b82805462000477906200068b565b90600052602060002090601f0160209004810192826200049b5760008555620004e6565b82601f10620004b657805160ff1916838001178555620004e6565b82800160010185558215620004e6579182015b82811115620004e6578251825591602001919060010190620004c9565b50620004f4929150620004f8565b5090565b5b80821115620004f45760008155600101620004f9565b600082601f8301126200052157600080fd5b81516001600160401b03808211156200053e576200053e620006c8565b604051601f8301601f19908116603f01168101908282118183101715620005695762000569620006c8565b816040528381526020925086838588010111156200058657600080fd5b600091505b83821015620005aa57858201830151818301840152908201906200058b565b83821115620005bc5760008385830101525b9695505050505050565b60008060008060008060c08789031215620005e057600080fd5b8651620005ed81620006de565b60208801519096506001600160401b03808211156200060b57600080fd5b620006198a838b016200050f565b965060408901519150808211156200063057600080fd5b6200063e8a838b016200050f565b9550606089015191506200065282620006de565b6080890151919450808211156200066857600080fd5b506200067789828a016200050f565b92505060a087015190509295509295509295565b600181811c90821680620006a057607f821691505b60208210811415620006c257634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114620006f457600080fd5b50565b61366a80620007076000396000f3fe608060405234801561001057600080fd5b50600436106102955760003560e01c806370a0823111610167578063b88d4fde116100ce578063d547741f11610087578063d547741f1461060c578063e63ab1e91461061f578063e8a3d48514610646578063e985e9c51461064e578063eacabe141461068a578063efe476871461069d57600080fd5b8063b88d4fde1461059b578063c0e72740146105ae578063c63adb2b146105b6578063c87b56dd146105bf578063ca15c873146105d2578063d5391393146105e557600080fd5b806391d148541161012057806391d1485414610532578063938e3d7b1461054557806395d89b4114610558578063a217fddf14610560578063a22cb46514610568578063ac9650d81461057b57600080fd5b806370a08231146104d457806375794a3c146104e75780638423df79146104f05780638456cb59146105045780638ba448c21461050c5780639010d07c1461051f57600080fd5b80632f745c591161020b5780634f6ccce7116101c45780634f6ccce714610445578063510b515814610458578063572b6c05146104815780635c975abb146104a35780636352211e146104ae5780636a627842146104c157600080fd5b80632f745c59146103de57806336568abe146103f15780633f4ba83a1461040457806342842e0e1461040c57806342966c681461041f57806349a33a2f1461043257600080fd5b80631f72d8311161025d5780631f72d83114610329578063206b60f91461033c57806323b872dd14610363578063248a9ca3146103765780632a55205a146103995780632f2ff15d146103cb57600080fd5b806301ffc9a71461029a57806306fdde03146102c2578063081812fc146102d7578063095ea7b31461030257806318160ddd14610317575b600080fd5b6102ad6102a8366004613028565b6106b0565b60405190151581526020015b60405180910390f35b6102ca6106dc565b6040516102b991906132e7565b6102ea6102e5366004612faf565b61076e565b6040516001600160a01b0390911681526020016102b9565b610315610310366004612f07565b610808565b005b600a545b6040519081526020016102b9565b610315610337366004612faf565b610930565b61031b7f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c81565b610315610371366004612d1b565b610a23565b61031b610384366004612faf565b60009081526020819052604090206001015490565b6103ac6103a7366004613006565b610a5b565b604080516001600160a01b0390931683526020830191909152016102b9565b6103156103d9366004612fe1565b610b02565b61031b6103ec366004612f07565b610b2f565b6103156103ff366004612fe1565b610bc5565b610315610c53565b61031561041a366004612d1b565b610cfd565b61031561042d366004612faf565b610d18565b610315610440366004612e3c565b610d94565b61031b610453366004612faf565b610f6d565b6102ea610466366004612faf565b6014602052600090815260409020546001600160a01b031681565b6102ad61048f366004612ca8565b600f546001600160a01b0391821691161490565b600c5460ff166102ad565b6102ea6104bc366004612faf565b611000565b6103156104cf366004612ca8565b611077565b61031b6104e2366004612ca8565b6110bf565b61031b60115481565b600f546102ad90600160a01b900460ff1681565b610315611146565b61031561051a366004612f75565b6111ec565b6102ea61052d366004613006565b61128b565b6102ad610540366004612fe1565b6112aa565b610315610553366004613062565b6112d3565b6102ca611450565b61031b600081565b610315610576366004612e91565b61145f565b61058e610589366004612f33565b611471565b6040516102b991906131b1565b6103156105a9366004612d5c565b611566565b6102ca6115a5565b61031b60155481565b6102ca6105cd366004612faf565b611633565b61031b6105e0366004612faf565b6116d5565b61031b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b61031561061a366004612fe1565b6116ec565b61031b7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6102ca611714565b6102ad61065c366004612ce2565b6001600160a01b03918216600090815260076020908152604080832093909416825291909152205460ff1690565b610315610698366004612ebf565b611723565b6102ca6106ab366004612faf565b61185d565b60006106bb82611941565b806106d657506001600160e01b0319821663152a902d60e11b145b92915050565b6060600280546106eb90613526565b80601f016020809104026020016040519081016040528092919081815260200182805461071790613526565b80156107645780601f1061073957610100808354040283529160200191610764565b820191906000526020600020905b81548152906001019060200180831161074757829003601f168201915b5050505050905090565b6000818152600460205260408120546001600160a01b03166107ec5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600660205260409020546001600160a01b031690565b600061081382611000565b9050806001600160a01b0316836001600160a01b031614156108815760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016107e3565b806001600160a01b031661089361194c565b6001600160a01b031614806108af57506108af8161065c61194c565b6109215760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016107e3565b61092b8383611956565b505050565b61093d600061054061194c565b6109825760405162461bcd60e51b81526020600482015260166024820152756f6e6c79206d6f64756c652061646d696e20726f6c6560501b60448201526064016107e3565b6127108111156109e75760405162461bcd60e51b815260206004820152602a60248201527f4e46543a204270732070726f7669646564206d757374206265206c6573732074604482015269068616e2031302c3030360b41b60648201526084016107e3565b60158190556040518181527f244ea8d7627f5a08f4299862bd5a45752842c183aee5b0fb0d1e4887bfa605b3906020015b60405180910390a150565b610a34610a2e61194c565b826119c4565b610a505760405162461bcd60e51b81526004016107e3906133b8565b61092b838383611abb565b60105460405163f2aab4b360e01b815230600482015260009182916001600160a01b039091169063f2aab4b39060240160206040518083038186803b158015610aa357600080fd5b505afa158015610ab7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610adb9190612cc5565b60155490925061271090610aef90856134ad565b610af9919061348b565b90509250929050565b600082815260208190526040902060010154610b2581610b2061194c565b611c66565b61092b8383611cca565b6000610b3a836110bf565b8210610b9c5760405162461bcd60e51b815260206004820152602b60248201527f455243373231456e756d657261626c653a206f776e657220696e646578206f7560448201526a74206f6620626f756e647360a81b60648201526084016107e3565b506001600160a01b03919091166000908152600860209081526040808320938352929052205490565b610bcd61194c565b6001600160a01b0316816001600160a01b031614610c455760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016107e3565b610c4f8282611cec565b5050565b610c7f7f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61054061194c565b610cf3576040805162461bcd60e51b81526020600482015260248101919091527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f20756e706175736560648201526084016107e3565b610cfb611d0e565b565b61092b83838360405180602001604052806000815250611566565b610d23610a2e61194c565b610d885760405162461bcd60e51b815260206004820152603060248201527f4552433732314275726e61626c653a2063616c6c6572206973206e6f74206f7760448201526f1b995c881b9bdc88185c1c1c9bdd995960821b60648201526084016107e3565b610d9181611da7565b50565b600c5460ff1615610db75760405162461bcd60e51b81526004016107e39061334c565b610de37f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661054061194c565b610dff5760405162461bcd60e51b81526004016107e390613376565b60008167ffffffffffffffff811115610e1a57610e1a6135be565b604051908082528060200260200182016040528015610e43578160200160208202803683370190505b506011549091506000610e5461194c565b905060005b84811015610f0e5782848281518110610e7457610e746135a8565b602002602001018181525050858582818110610e9257610e926135a8565b9050602002810190610ea4919061342c565b6000858152601360205260409020610ebd929091612b81565b50600083815260146020526040902080546001600160a01b0319166001600160a01b038416179055610eef8784611e4e565b610efa600184613473565b925080610f0681613561565b915050610e59565b5081601181905550856001600160a01b0316816001600160a01b03167f2a7af4d3b262c3e3d51c600cdf7a940c9aba3fedcc85148aeda266cc4c4a2f33858888604051610f5d93929190613213565b60405180910390a3505050505050565b6000610f78600a5490565b8210610fdb5760405162461bcd60e51b815260206004820152602c60248201527f455243373231456e756d657261626c653a20676c6f62616c20696e646578206f60448201526b7574206f6620626f756e647360a01b60648201526084016107e3565b600a8281548110610fee57610fee6135a8565b90600052602060002001549050919050565b6000818152600460205260408120546001600160a01b0316806106d65760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b60648201526084016107e3565b60405162461bcd60e51b815260206004820152601d60248201527f4e46543732313a2043616c6c206d696e744e465420696e73746561642e00000060448201526064016107e3565b60006001600160a01b03821661112a5760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b60648201526084016107e3565b506001600160a01b031660009081526005602052604090205490565b6111727f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a61054061194c565b6111e45760405162461bcd60e51b815260206004820152603e60248201527f4552433732315072657365744d696e7465725061757365724175746f49643a2060448201527f6d75737420686176652070617573657220726f6c6520746f207061757365000060648201526084016107e3565b610cfb611f9c565b6111f9600061054061194c565b61123e5760405162461bcd60e51b81526020600482015260166024820152756f6e6c79206d6f64756c652061646d696e20726f6c6560501b60448201526064016107e3565b600f8054821515600160a01b0260ff60a01b199091161790556040517ffb4ba02cee22486df888d7ffb97c6100ec3193781e025cb9a4bc6fc358d626cc90610a1890831515815260200190565b60008281526001602052604081206112a39083611ff5565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6010546040805163a217fddf60e01b815290516001600160a01b03909216916391d1485491839163a217fddf91600480820192602092909190829003018186803b15801561132057600080fd5b505afa158015611334573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113589190612fc8565b61136061194c565b6040516001600160e01b031960e085901b16815260048101929092526001600160a01b0316602482015260440160206040518083038186803b1580156113a557600080fd5b505afa1580156113b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113dd9190612f92565b6114445760405162461bcd60e51b815260206004820152603260248201527f4e46543a206f6e6c7920612070726f746f636f6c2061646d696e2063616e206360448201527130b636103a3434b990333ab731ba34b7b71760711b60648201526084016107e3565b61092b60128383612b81565b6060600380546106eb90613526565b610c4f61146a61194c565b8383612001565b60608167ffffffffffffffff81111561148c5761148c6135be565b6040519080825280602002602001820160405280156114bf57816020015b60608152602001906001900390816114aa5790505b50905060005b8281101561155f5761152f308585848181106114e3576114e36135a8565b90506020028101906114f5919061342c565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152506120d092505050565b828281518110611541576115416135a8565b6020026020010181905250808061155790613561565b9150506114c5565b5092915050565b61157761157161194c565b836119c4565b6115935760405162461bcd60e51b81526004016107e3906133b8565b61159f848484846120f5565b50505050565b601280546115b290613526565b80601f01602080910402602001604051908101604052809291908181526020018280546115de90613526565b801561162b5780601f106116005761010080835404028352916020019161162b565b820191906000526020600020905b81548152906001019060200180831161160e57829003601f168201915b505050505081565b600081815260136020526040902080546060919061165090613526565b80601f016020809104026020016040519081016040528092919081815260200182805461167c90613526565b80156116c95780601f1061169e576101008083540402835291602001916116c9565b820191906000526020600020905b8154815290600101906020018083116116ac57829003601f168201915b50505050509050919050565b60008181526001602052604081206106d690612128565b60008281526020819052604090206001015461170a81610b2061194c565b61092b8383611cec565b6060601280546106eb90613526565b600c5460ff16156117465760405162461bcd60e51b81526004016107e39061334c565b6117727f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a661054061194c565b61178e5760405162461bcd60e51b81526004016107e390613376565b60115460008181526013602052604090206117aa908484612b81565b506117b361194c565b600082815260146020526040902080546001600160a01b0319166001600160a01b03929092169190911790556117e98482611e4e565b6001601160008282546117fc9190613473565b90915550506001600160a01b03841661181361194c565b6001600160a01b03167fafe8c5a4c36942a61550534b714a0076ab46ef8ef23e361572aad8b7ca2ac27d83868660405161184f93929190613409565b60405180910390a350505050565b601360205260009081526040902080546115b290613526565b600f546000906001600160a01b0316331415611899575060131936013560601c90565b503390565b905090565b3390565b6118b182826112aa565b610c4f576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556118e861194c565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006112a3836001600160a01b038416612132565b60006106d682612181565b600061189e611876565b600081815260066020526040902080546001600160a01b0319166001600160a01b038416908117909155819061198b82611000565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600460205260408120546001600160a01b0316611a3d5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016107e3565b6000611a4883611000565b9050806001600160a01b0316846001600160a01b03161480611a835750836001600160a01b0316611a788461076e565b6001600160a01b0316145b80611ab357506001600160a01b0380821660009081526007602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b0316611ace82611000565b6001600160a01b031614611b365760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b60648201526084016107e3565b6001600160a01b038216611b985760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016107e3565b611ba38383836121a6565b611bae600082611956565b6001600160a01b0383166000908152600560205260408120805460019290611bd79084906134cc565b90915550506001600160a01b0382166000908152600560205260408120805460019290611c05908490613473565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b611c7082826112aa565b610c4f57611c88816001600160a01b031660146122b0565b611c938360206122b0565b604051602001611ca4929190613109565b60408051601f198184030181529082905262461bcd60e51b82526107e3916004016132e7565b611cd482826118a7565b600082815260016020526040902061092b908261192c565b611cf6828261244c565b600082815260016020526040902061092b90826124cf565b600c5460ff16611d575760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016107e3565b600c805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa611d8a61194c565b6040516001600160a01b03909116815260200160405180910390a1565b6000611db282611000565b9050611dc0816000846121a6565b611dcb600083611956565b6001600160a01b0381166000908152600560205260408120805460019290611df49084906134cc565b909155505060008281526004602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b038216611ea45760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016107e3565b6000818152600460205260409020546001600160a01b031615611f095760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016107e3565b611f15600083836121a6565b6001600160a01b0382166000908152600560205260408120805460019290611f3e908490613473565b909155505060008181526004602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600c5460ff1615611fbf5760405162461bcd60e51b81526004016107e39061334c565b600c805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258611d8a61194c565b60006112a383836124e4565b816001600160a01b0316836001600160a01b031614156120635760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016107e3565b6001600160a01b03838116600081815260076020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b60606112a3838360405180606001604052806027815260200161360e6027913961250e565b612100848484611abb565b61210c848484846125e2565b61159f5760405162461bcd60e51b81526004016107e3906132fa565b60006106d6825490565b6000818152600183016020526040812054612179575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556106d6565b5060006106d6565b60006001600160e01b0319821663780e9d6360e01b14806106d657506106d6826126f6565b6121b1838383612736565b600f54600160a01b900460ff1680156121d257506001600160a01b03831615155b80156121e657506001600160a01b03821615155b1561092b576122157f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c846112aa565b8061224557506122457f8502233096d909befbda0999bb8ea2f3a6be3c138b9fbf003752a4c8bce86f6c836112aa565b61092b5760405162461bcd60e51b815260206004820152603660248201527f4e46543a205472616e736665727320617265207265737472696374656420746f604482015275205452414e534645525f524f4c4520686f6c6465727360501b60648201526084016107e3565b606060006122bf8360026134ad565b6122ca906002613473565b67ffffffffffffffff8111156122e2576122e26135be565b6040519080825280601f01601f19166020018201604052801561230c576020820181803683370190505b509050600360fc1b81600081518110612327576123276135a8565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612356576123566135a8565b60200101906001600160f81b031916908160001a905350600061237a8460026134ad565b612385906001613473565b90505b60018111156123fd576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106123b9576123b96135a8565b1a60f81b8282815181106123cf576123cf6135a8565b60200101906001600160f81b031916908160001a90535060049490941c936123f68161350f565b9050612388565b5083156112a35760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016107e3565b61245682826112aa565b15610c4f576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916905561248b61194c565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006112a3836001600160a01b038416612741565b60008260000182815481106124fb576124fb6135a8565b9060005260206000200154905092915050565b6060833b61256d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016107e3565b600080856001600160a01b03168560405161258891906130ed565b600060405180830381855af49150503d80600081146125c3576040519150601f19603f3d011682016040523d82523d6000602084013e6125c8565b606091505b50915091506125d8828286612834565b9695505050505050565b60006001600160a01b0384163b156126eb57836001600160a01b031663150b7a0261260b61194c565b8786866040518563ffffffff1660e01b815260040161262d949392919061317e565b602060405180830381600087803b15801561264757600080fd5b505af1925050508015612677575060408051601f3d908101601f1916820190925261267491810190613045565b60015b6126d1573d8080156126a5576040519150601f19603f3d011682016040523d82523d6000602084013e6126aa565b606091505b5080516126c95760405162461bcd60e51b81526004016107e3906132fa565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611ab3565b506001949350505050565b60006001600160e01b031982166380ac58cd60e01b148061272757506001600160e01b03198216635b5e139f60e01b145b806106d657506106d68261286d565b61092b838383612892565b6000818152600183016020526040812054801561282a5760006127656001836134cc565b8554909150600090612779906001906134cc565b90508181146127de576000866000018281548110612799576127996135a8565b90600052602060002001549050808760000184815481106127bc576127bc6135a8565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806127ef576127ef613592565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506106d6565b60009150506106d6565b606083156128435750816112a3565b8251156128535782518084602001fd5b8160405162461bcd60e51b81526004016107e391906132e7565b60006001600160e01b03198216635a05180f60e01b14806106d657506106d682612904565b61289d838383612939565b600c5460ff161561092b5760405162461bcd60e51b815260206004820152602b60248201527f4552433732315061757361626c653a20746f6b656e207472616e73666572207760448201526a1a1a5b19481c185d5cd95960aa1b60648201526084016107e3565b60006001600160e01b03198216637965db0b60e01b14806106d657506301ffc9a760e01b6001600160e01b03198316146106d6565b6001600160a01b0383166129945761298f81600a80546000838152600b60205260408120829055600182018355919091527fc65a7bb8d6351c1cf70c95a316cc6a92839c986682d98bc35f958f4883f9d2a80155565b6129b7565b816001600160a01b0316836001600160a01b0316146129b7576129b783826129f1565b6001600160a01b0382166129ce5761092b81612a8e565b826001600160a01b0316826001600160a01b03161461092b5761092b8282612b3d565b600060016129fe846110bf565b612a0891906134cc565b600083815260096020526040902054909150808214612a5b576001600160a01b03841660009081526008602090815260408083208584528252808320548484528184208190558352600990915290208190555b5060009182526009602090815260408084208490556001600160a01b039094168352600881528383209183525290812055565b600a54600090612aa0906001906134cc565b6000838152600b6020526040812054600a8054939450909284908110612ac857612ac86135a8565b9060005260206000200154905080600a8381548110612ae957612ae96135a8565b6000918252602080832090910192909255828152600b9091526040808220849055858252812055600a805480612b2157612b21613592565b6001900381819060005260206000200160009055905550505050565b6000612b48836110bf565b6001600160a01b039093166000908152600860209081526040808320868452825280832085905593825260099052919091209190915550565b828054612b8d90613526565b90600052602060002090601f016020900481019282612baf5760008555612bf5565b82601f10612bc85782800160ff19823516178555612bf5565b82800160010185558215612bf5579182015b82811115612bf5578235825591602001919060010190612bda565b50612c01929150612c05565b5090565b5b80821115612c015760008155600101612c06565b60008083601f840112612c2c57600080fd5b50813567ffffffffffffffff811115612c4457600080fd5b6020830191508360208260051b8501011115612c5f57600080fd5b9250929050565b60008083601f840112612c7857600080fd5b50813567ffffffffffffffff811115612c9057600080fd5b602083019150836020828501011115612c5f57600080fd5b600060208284031215612cba57600080fd5b81356112a3816135d4565b600060208284031215612cd757600080fd5b81516112a3816135d4565b60008060408385031215612cf557600080fd5b8235612d00816135d4565b91506020830135612d10816135d4565b809150509250929050565b600080600060608486031215612d3057600080fd5b8335612d3b816135d4565b92506020840135612d4b816135d4565b929592945050506040919091013590565b60008060008060808587031215612d7257600080fd5b8435612d7d816135d4565b93506020850135612d8d816135d4565b925060408501359150606085013567ffffffffffffffff80821115612db157600080fd5b818701915087601f830112612dc557600080fd5b813581811115612dd757612dd76135be565b604051601f8201601f19908116603f01168101908382118183101715612dff57612dff6135be565b816040528281528a6020848701011115612e1857600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b600080600060408486031215612e5157600080fd5b8335612e5c816135d4565b9250602084013567ffffffffffffffff811115612e7857600080fd5b612e8486828701612c1a565b9497909650939450505050565b60008060408385031215612ea457600080fd5b8235612eaf816135d4565b91506020830135612d10816135e9565b600080600060408486031215612ed457600080fd5b8335612edf816135d4565b9250602084013567ffffffffffffffff811115612efb57600080fd5b612e8486828701612c66565b60008060408385031215612f1a57600080fd5b8235612f25816135d4565b946020939093013593505050565b60008060208385031215612f4657600080fd5b823567ffffffffffffffff811115612f5d57600080fd5b612f6985828601612c1a565b90969095509350505050565b600060208284031215612f8757600080fd5b81356112a3816135e9565b600060208284031215612fa457600080fd5b81516112a3816135e9565b600060208284031215612fc157600080fd5b5035919050565b600060208284031215612fda57600080fd5b5051919050565b60008060408385031215612ff457600080fd5b823591506020830135612d10816135d4565b6000806040838503121561301957600080fd5b50508035926020909101359150565b60006020828403121561303a57600080fd5b81356112a3816135f7565b60006020828403121561305757600080fd5b81516112a3816135f7565b6000806020838503121561307557600080fd5b823567ffffffffffffffff81111561308c57600080fd5b612f6985828601612c66565b600081518084526130b08160208601602086016134e3565b601f01601f19169290920160200192915050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600082516130ff8184602087016134e3565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516131418160178501602088016134e3565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516131728160288401602088016134e3565b01602801949350505050565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906125d890830184613098565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561320657603f198886030184526131f4858351613098565b945092850192908501906001016131d8565b5092979650505050505050565b604080825284519082018190526000906020906060840190828801845b8281101561324c57815184529284019290840190600101613230565b50505083810382850152848152818101600586901b820183018760005b888110156132d857848303601f190184528135368b9003601e1901811261328f57600080fd5b8a01803567ffffffffffffffff8111156132a857600080fd5b8036038c13156132b757600080fd5b6132c485828a85016130c4565b958801959450505090850190600101613269565b50909998505050505050505050565b6020815260006112a36020830184613098565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526022908201527f4e46543a206d7573742068617665206d696e74657220726f6c6520746f206d696040820152611b9d60f21b606082015260800190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b8381526040602082015260006134236040830184866130c4565b95945050505050565b6000808335601e1984360301811261344357600080fd5b83018035915067ffffffffffffffff82111561345e57600080fd5b602001915036819003821315612c5f57600080fd5b600082198211156134865761348661357c565b500190565b6000826134a857634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156134c7576134c761357c565b500290565b6000828210156134de576134de61357c565b500390565b60005b838110156134fe5781810151838201526020016134e6565b8381111561159f5750506000910152565b60008161351e5761351e61357c565b506000190190565b600181811c9082168061353a57607f821691505b6020821081141561355b57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156135755761357561357c565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b0381168114610d9157600080fd5b8015158114610d9157600080fd5b6001600160e01b031981168114610d9157600080fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a26469706673582212201151591a3cbc090aaa3e091909041dc2c2420dea78686a484d0cc7c3897cd8b464736f6c63430008070033"