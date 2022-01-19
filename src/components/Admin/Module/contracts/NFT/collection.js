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
export const collectionBytecode = "60806040523480156200001157600080fd5b5060405162004d8e38038062004d8e8339810160408190526200003491620004e7565b6002805460ff191690556001600355600480546001600160a01b0319166001600160a01b03851617905581516200007390600790602085019062000424565b50600580546001600160a01b0319166001600160a01b038616179055620000a560006200009f62000118565b62000134565b620000d47ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c6200009f62000118565b620001037f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200009f62000118565b6200010e8162000144565b5050505062000670565b60006200012f6200027f60201b6200260d1760201c565b905090565b620001408282620002b8565b5050565b6200015a60006200015462000118565b620002fb565b620001c05760405162461bcd60e51b815260206004820152602b60248201527f6f6e6c792061206d6f64756c652061646d696e2063616e2063616c6c2074686960448201526a3990333ab731ba34b7b71760a91b60648201526084015b60405180910390fd5b6127106001600160801b03821611156200022b5760405162461bcd60e51b815260206004820152602560248201527f6270732070726f7669646564206d757374206265206c657373207468616e20316044820152640302c3030360dc1b6064820152608401620001b7565b600880546001600160801b0319166001600160801b0383169081179091556040519081527fd50e64e6eb05cd7ceafe1a28b1a7ad949edb90451106259c7117252d605178ef9060200160405180910390a150565b6004546000906001600160a01b0316331415620002a3575060131936013560601c90565b6200012f6200032660201b6200263a1760201c565b620002cf82826200032a60201b6200263e1760201c565b6000828152600160209081526040909120620002f6918390620026c3620003b4821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff165b92915050565b3390565b620003368282620002fb565b62000140576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200037062000118565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620003cb836001600160a01b038416620003d2565b9392505050565b60008181526001830160205260408120546200041b5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000320565b50600062000320565b828054620004329062000604565b90600052602060002090601f016020900481019282620004565760008555620004a1565b82601f106200047157805160ff1916838001178555620004a1565b82800160010185558215620004a1579182015b82811115620004a157825182559160200191906001019062000484565b50620004af929150620004b3565b5090565b5b80821115620004af5760008155600101620004b4565b80516001600160801b0381168114620004e257600080fd5b919050565b60008060008060808587031215620004fe57600080fd5b84516200050b8162000657565b80945050602080860151620005208162000657565b60408701519094506001600160401b03808211156200053e57600080fd5b818801915088601f8301126200055357600080fd5b81518181111562000568576200056862000641565b604051601f8201601f19908116603f0116810190838211818310171562000593576200059362000641565b816040528281528b86848701011115620005ac57600080fd5b600093505b82841015620005d05784840186015181850187015292850192620005b1565b82841115620005e25760008684830101525b809750505050505050620005f960608601620004ca565b905092959194509250565b600181811c908216806200061957607f821691505b602082108114156200063b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146200066d57600080fd5b50565b61470e80620006806000396000f3fe608060405234801561001057600080fd5b50600436106102275760003560e01c80639010d07c11610130578063c78b616c116100b8578063de74e57b1161007c578063de74e57b1461053f578063deb26b94146105cf578063e63ab1e9146105f6578063e8a3d4851461061d578063f23a6e611461062557600080fd5b8063c78b616c146104ea578063ca15c873146104f3578063d547741f14610506578063d6febde814610519578063d8cba2511461052c57600080fd5b8063a217fddf116100ff578063a217fddf14610486578063ac9650d81461048e578063ae73ccec146104ae578063bc197c81146104b6578063c0e72740146104d557600080fd5b80639010d07c1461042257806391d148541461044d578063938e3d7b146104605780639b782ff21461047357600080fd5b8063354c7ab6116101b35780634fd69f3c116101825780634fd69f3c146103bb578063572b6c05146103ce578063583e12b6146103f05780635c975abb1461040357806361096ec61461040e57600080fd5b8063354c7ab61461035757806336568abe1461036a5780633f5c3e871461037d5780634edeaa81146103a857600080fd5b80631d0cd75e116101fa5780631d0cd75e146102b557806320c7852c146102d5578063248a9ca31461030e5780632f2ff15d14610331578063318510121461034457600080fd5b806301ffc9a71461022c57806309679b3914610254578063107a274a14610269578063150b7a0214610289575b600080fd5b61023f61023a366004613ee9565b610644565b60405190151581526020015b60405180910390f35b610267610262366004613f54565b61067b565b005b61027c610277366004613e7e565b610774565b60405161024b919061441e565b61029c610297366004613c2e565b610845565b6040516001600160e01b0319909116815260200161024b565b6102c86102c3366004613d08565b610857565b60405161024b919061423d565b6103006102e3366004613e97565b600a60209081526000928352604080842090915290825290205481565b60405190815260200161024b565b61030061031c366004613e7e565b60009081526020819052604090206001015490565b61026761033f366004613e97565b610a77565b610267610352366004613f96565b610aa9565b610267610365366004613e44565b610d80565b610267610378366004613e97565b610df6565b600854610390906001600160801b031681565b6040516001600160801b03909116815260200161024b565b6102c86103b6366004613b47565b610e84565b6102676103c9366004613ec7565b61106b565b61023f6103dc366004613b47565b6004546001600160a01b0391821691161490565b6102676103fe366004613ec7565b61132d565b60025460ff1661023f565b60085461023f90600160801b900460ff1681565b610435610430366004613ec7565b6117a0565b6040516001600160a01b03909116815260200161024b565b61023f61045b366004613e97565b6117bf565b61026761046e366004613f13565b6117e8565b610267610481366004613d62565b61181d565b610300600081565b6104a161049c366004613dd0565b611b79565b60405161024b91906141db565b6102c8611c6d565b61029c6104c4366004613b81565b63bc197c8160e01b95945050505050565b6104dd611dca565b60405161024b919061428c565b61030060065481565b610300610501366004613e7e565b611e58565b610267610514366004613e97565b611e6f565b610267610527366004613ec7565b611e97565b6102c861053a366004613b47565b61239d565b6105b861054d366004613e7e565b600960208190526000918252604090912080546001820154600283015460038401546004850154600586015460068701546007880154600889015499890154600a9099015497996001600160a01b039788169996881698959794969490931694919390929160ff168b565b60405161024b9b9a9998979695949392919061442d565b6103007ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c81565b6103007f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6104dd61257b565b61029c610633366004613ca0565b63f23a6e6160e01b95945050505050565b60006001600160e01b03198216630271189760e51b148061067557506001600160e01b03198216630a85bd0160e11b145b92915050565b610688600061045b6126d8565b6106ad5760405162461bcd60e51b81526004016106a49061434c565b60405180910390fd5b6127106001600160801b03821611156107165760405162461bcd60e51b815260206004820152602560248201527f6270732070726f7669646564206d757374206265206c657373207468616e20316044820152640302c3030360dc1b60648201526084016106a4565b600880546fffffffffffffffffffffffffffffffff19166001600160801b0383169081179091556040519081527fd50e64e6eb05cd7ceafe1a28b1a7ad949edb90451106259c7117252d605178ef906020015b60405180910390a150565b61077c6138ed565b600082815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff169081111561082b5761082b614633565b600181111561083c5761083c614633565b90525092915050565b630a85bd0160e11b5b95945050505050565b6006546060906000805b828110156108ca576000818152600960205260409020600201546001600160a01b0387811691161480156108a5575060008181526009602052604090206003015485145b156108b8576108b5600183614514565b91505b6108c3600182614514565b9050610861565b50806001600160401b038111156108e3576108e3614675565b60405190808252806020026020018201604052801561091c57816020015b6109096138ed565b8152602001906001900390816109015790505b5092506000805b83811015610a6d576000818152600960205260409020600201546001600160a01b038881169116148015610967575060008181526009602052604090206003015486145b15610a5b57600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff1690811115610a1b57610a1b614633565b6001811115610a2c57610a2c614633565b81525050858381518110610a4257610a4261465f565b6020908102919091010152610a58600183614514565b91505b610a66600182614514565b9050610923565b5050505092915050565b600082815260208190526040902060010154610a9a81610a956126d8565b6126e2565b610aa48383612746565b505050565b60025460ff1615610acc5760405162461bcd60e51b81526004016106a490614397565b610ad46126d8565b60008781526009602052604090206001015487906001600160a01b03838116911614610b125760405162461bcd60e51b81526004016106a49061429f565b6000888152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff90911690811115610bc357610bc3614633565b6001811115610bd457610bd4614633565b8152505090508060800151861115610bfe5760405162461bcd60e51b81526004016106a4906143c1565b60c081018890526001600160a01b03871660a08201528515610c205785610c26565b80608001515b610120820152610c368542614514565b60e08201528315610c5057610c4b8442614514565b610c54565b6000195b610100820190815260008a8152600960208181526040928390208551815590850151600180830180546001600160a01b03199081166001600160a01b0394851617909155948701516002840180548716918416919091179055606087015160038401556080870151600484015560a087015160058401805490961692169190911790935560c0850151600682015560e085015160078201559251600884015561012084015190830155610140830151600a8301805485949360ff19909116908381811115610d2457610d24614633565b021790555090505088610d356126d8565b6001600160a01b03167fb4c8fd604ad229ddf17ffe34f0851a2abf5113b048f8235b12edbabcc6dd919383604051610d6d919061441e565b60405180910390a3505050505050505050565b610d8d600061045b6126d8565b610da95760405162461bcd60e51b81526004016106a49061434c565b60088054821515600160801b0260ff60801b199091161790556040517f56668abce4c06e28f52176150c07856e31ee073b9b62df62a5afbf1a22aec24c9061076990831515815260200190565b610dfe6126d8565b6001600160a01b0316816001600160a01b031614610e765760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016106a4565b610e808282612768565b5050565b6006546060906000805b82811015610edb576000818152600960205260409020600201546001600160a01b0386811691161415610ec957610ec6600183614514565b91505b610ed4600182614514565b9050610e8e565b50806001600160401b03811115610ef457610ef4614675565b604051908082528060200260200182016040528015610f2d57816020015b610f1a6138ed565b815260200190600190039081610f125790505b5092506000805b83811015611062576000818152600960205260409020600201546001600160a01b038781169116141561105057600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff169081111561101057611010614633565b600181111561102157611021614633565b815250508583815181106110375761103761465f565b602090810291909101015261104d600183614514565b91505b61105b600182614514565b9050610f34565b50505050919050565b6110736126d8565b60008381526009602052604090206001015483906001600160a01b038381169116146110b15760405162461bcd60e51b81526004016106a49061429f565b6000848152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff9091169081111561116257611162614633565b600181111561117357611173614633565b81525050905083816080015110156111e85760405162461bcd60e51b815260206004820152603260248201527f4d61726b65743a2063616e6e6f7420756e6c697374206d6f726520746f6b656e60448201527139903a3430b71030b932903634b9ba32b21760711b60648201526084016106a4565b83816080018181516111fa919061456d565b9052506000858152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054859460ff199091169083818111156112cb576112cb614633565b02179055509050506112dd818561278a565b846112e66126d8565b6001600160a01b03167fb4c8fd604ad229ddf17ffe34f0851a2abf5113b048f8235b12edbabcc6dd91938360405161131e919061441e565b60405180910390a35050505050565b60025460ff16156113505760405162461bcd60e51b81526004016106a490614397565b6113586126d8565b60008381526009602052604090206001015483906001600160a01b038381169116146113965760405162461bcd60e51b81526004016106a49061429f565b6000848152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff9091169081111561144757611447614633565b600181111561145857611458614633565b81525050905083816080018181516114709190614514565b9052506000858152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054859460ff1990911690838181111561154157611541614633565b02179055505050836115a15760405162461bcd60e51b8152602060048201526024808201527f4d61726b65743a206d75737420616464206174206c65617374206f6e6520746f60448201526335b2b71760e11b60648201526084016106a4565b600081610140015160018111156115ba576115ba614633565b1461161a5760405162461bcd60e51b815260206004820152602a60248201527f4d61726b65743a2043616e206f6e6c792061646420746f204552432031313535604482015269103634b9ba34b733b99760b11b60648201526084016106a4565b80604001516001600160a01b031663e985e9c56116356126d8565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260440160206040518083038186803b15801561167a57600080fd5b505afa15801561168e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b29190613e61565b6117245760405162461bcd60e51b815260206004820152603f60248201527f4d61726b65743a206d75737420617070726f766520746865206d61726b65742060448201527f746f207472616e7366657220746f6b656e73206265696e672061646465642e0060648201526084016106a4565b80604001516001600160a01b031663f242432a61173f6126d8565b308460600151886040518563ffffffff1660e01b81526004016117659493929190614176565b600060405180830381600087803b15801561177f57600080fd5b505af1158015611793573d6000803e3d6000fd5b50505050846112e66126d8565b60008281526001602052604081206117b89083612917565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6117f5600061045b6126d8565b6118115760405162461bcd60e51b81526004016106a49061434c565b610aa460078383613972565b60025460ff16156118405760405162461bcd60e51b81526004016106a490614397565b600854600160801b900460ff16158061188057506118807ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c61045b6126d8565b6118da5760405162461bcd60e51b815260206004820152602560248201527f6f6e6c792061206c69737465722063616e2063616c6c20746869732066756e636044820152643a34b7b71760d91b60648201526084016106a4565b600084116119385760405162461bcd60e51b815260206004820152602560248201527f4d61726b65743a206d757374206c697374206174206c65617374206f6e65207460448201526437b5b2b71760d91b60648201526084016106a4565b838311156119585760405162461bcd60e51b81526004016106a4906143c1565b6006805490600190600061196c8385614514565b90915550600090506119888a6119806126d8565b308c8a612923565b905060006040518061016001604052808481526020016119a66126d8565b6001600160a01b031681526020018c6001600160a01b031681526020018b81526020018881526020018a6001600160a01b0316815260200189815260200186426119f09190614514565b81526020018515611a0a57611a058642614514565b611a0e565b6000195b81526020018715611a1f5787611a21565b885b8152602001836001811115611a3857611a38614633565b90526000848152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054949550859492939192909160ff19909116908381811115611b1157611b11614633565b021790555090505082611b226126d8565b6001600160a01b03168c6001600160a01b03167f70c5741a020504dbda58d308c3efe5275326c456d3b00c541925222c40f7c62e84604051611b64919061441e565b60405180910390a45050505050505050505050565b6060816001600160401b03811115611b9357611b93614675565b604051908082528060200260200182016040528015611bc657816020015b6060815260200190600190039081611bb15790505b50905060005b82811015611c6657611c3630858584818110611bea57611bea61465f565b9050602002810190611bfc919061449e565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612d8992505050565b828281518110611c4857611c4861465f565b60200260200101819052508080611c5e90614602565b915050611bcc565b5092915050565b600654606090806001600160401b03811115611c8b57611c8b614675565b604051908082528060200260200182016040528015611cc457816020015b611cb16138ed565b815260200190600190039081611ca95790505b50915060005b81811015611dc557600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff1690811115611d8157611d81614633565b6001811115611d9257611d92614633565b81525050838281518110611da857611da861465f565b6020908102919091010152611dbe600182614514565b9050611cca565b505090565b60078054611dd7906145c7565b80601f0160208091040260200160405190810160405280929190818152602001828054611e03906145c7565b8015611e505780601f10611e2557610100808354040283529160200191611e50565b820191906000526020600020905b815481529060010190602001808311611e3357829003601f168201915b505050505081565b600081815260016020526040812061067590612dae565b600082815260208190526040902060010154611e8d81610a956126d8565b610aa48383612768565b60026003541415611eea5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106a4565b6002600355611efb60025460ff1690565b15611f185760405162461bcd60e51b81526004016106a490614397565b60008281526009602052604090206001015482906001600160a01b0316611f8d5760405162461bcd60e51b815260206004820152602360248201527f4d61726b65743a20546865206c697374696e6720646f6573206e6f742065786960448201526239ba1760e91b60648201526084016106a4565b6000838152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff9091169081111561203e5761203e614633565b600181111561204f5761204f614633565b9052509050600061205e6126d8565b9050600084118015612074575081608001518411155b6120da5760405162461bcd60e51b815260206004820152603160248201527f4d61726b65743a206d7573742062757920616e20617070726f7072696174652060448201527030b6b7bab73a1037b3103a37b5b2b7399760791b60648201526084016106a4565b81610100015142111580156120f357508160e001514210155b61215a5760405162461bcd60e51b815260206004820152603260248201527f4d61726b65743a207468652073616c652068617320656974686572206e6f742060448201527139ba30b93a32b21037b91031b637b9b2b21760711b60648201526084016106a4565b6101208201516000868152600a602090815260408083206001600160a01b038616845290915290205461218d9086614514565b11156121f85760405162461bcd60e51b815260206004820152603460248201527f4d61726b65743a2043616e6e6f7420627579206d6f72652066726f6d206c69736044820152733a34b733903a3430b7103832b936b4ba3a32b21760611b60648201526084016106a4565b6000858152600a602090815260408083206001600160a01b03851684529091528120805486929061222a908490614514565b925050819055508382608001818151612243919061456d565b9052506000858152600960208181526040928390208551815590850151600180830180546001600160a01b03199081166001600160a01b0394851617909155948701516002840180548716918416919091179055606087015160038401556080870151600484015560a087015160058401805490961692169190911790935560c0850151600682015560e08501516007820155610100850151600882015561012085015191810191909155610140840151600a82018054869460ff1990911690838181111561231457612314614633565b0217905550505060c08201511561232f5761232f8285612db8565b612339828561278a565b8482602001516001600160a01b031683604001516001600160a01b03167fc848190182320d1cb2ea6d8a80041c6780e56643bc41fe9060bb1f1349902cba848887604051612389939291906141ae565b60405180910390a450506001600355505050565b6006546060906000805b828110156123f4576000818152600960205260409020600101546001600160a01b03868116911614156123e2576123df600183614514565b91505b6123ed600182614514565b90506123a7565b50806001600160401b0381111561240d5761240d614675565b60405190808252806020026020018201604052801561244657816020015b6124336138ed565b81526020019060019003908161242b5790505b5092506000805b83811015611062576000818152600960205260409020600101546001600160a01b038781169116141561256957600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff169081111561252957612529614633565b600181111561253a5761253a614633565b815250508583815181106125505761255061465f565b6020908102919091010152612566600183614514565b91505b612574600182614514565b905061244d565b60606007805461258a906145c7565b80601f01602080910402602001604051908101604052809291908181526020018280546125b6906145c7565b80156126035780601f106125d857610100808354040283529160200191612603565b820191906000526020600020905b8154815290600101906020018083116125e657829003601f168201915b5050505050905090565b6004546000906001600160a01b0316331415612630575060131936013560601c90565b503390565b905090565b3390565b61264882826117bf565b610e80576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916600117905561267f6126d8565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006117b8836001600160a01b038416613441565b600061263561260d565b6126ec82826117bf565b610e8057612704816001600160a01b03166014613490565b61270f836020613490565b604051602001612720929190614101565b60408051601f198184030181529082905262461bcd60e51b82526106a49160040161428c565b612750828261263e565b6000828152600160205260409020610aa490826126c3565b612772828261362b565b6000828152600160205260409020610aa490826136ae565b600082610140015160018111156127a3576127a3614633565b14156128205781604001516001600160a01b031663f242432a306127c56126d8565b8560600151856040518563ffffffff1660e01b81526004016127ea9493929190614176565b600060405180830381600087803b15801561280457600080fd5b505af1158015612818573d6000803e3d6000fd5b505050505050565b6001826101400151600181111561283957612839614633565b1415610e8057806001146128ae5760405162461bcd60e51b815260206004820152603660248201527f4d61726b65743a2043616e6e6f7420756e6c697374206d6f7265207468616e2060448201527537b7329037b31030b71022a921901b99189027232a1760511b60648201526084016106a4565b81604001516001600160a01b031663b88d4fde306128ca6126d8565b60608601516040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152608060648201526000608482015260a4016127ea565b60006117b883836136c3565b6040516301ffc9a760e01b8152636cdb3d1360e11b60048201526000906001600160a01b038716906301ffc9a79060240160206040518083038186803b15801561296c57600080fd5b505afa158015612980573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129a49190613e61565b15612ab35760405163e985e9c560e01b81526001600160a01b038681166004830152858116602483015287169063e985e9c59060440160206040518083038186803b1580156129f257600080fd5b505afa158015612a06573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a2a9190613e61565b612a465760405162461bcd60e51b81526004016106a4906142ee565b50604051637921219560e11b81526000906001600160a01b0387169063f242432a90612a7c908890889088908890600401614176565b600060405180830381600087803b158015612a9657600080fd5b505af1158015612aaa573d6000803e3d6000fd5b5050505061084e565b6040516301ffc9a760e01b81526380ac58cd60e01b60048201526001600160a01b038716906301ffc9a79060240160206040518083038186803b158015612af957600080fd5b505afa158015612b0d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b319190613e61565b15612d1b5781600114612ba05760405162461bcd60e51b815260206004820152603160248201527f4d61726b65743a2043616e6e6f74206c697374206d6f7265207468616e20312060448201527037b31030b71022a9219b99189027232a1760791b60648201526084016106a4565b60405163e985e9c560e01b81526001600160a01b038681166004830152858116602483015287169063e985e9c59060440160206040518083038186803b158015612be957600080fd5b505afa158015612bfd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c219190613e61565b80612caf575060405163020604bf60e21b8152600481018490526001600160a01b03808616919088169063081812fc9060240160206040518083038186803b158015612c6c57600080fd5b505afa158015612c80573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ca49190613b64565b6001600160a01b0316145b612ccb5760405162461bcd60e51b81526004016106a4906142ee565b50604051635c46a7ef60e11b81526001600160a01b03858116600483015284811660248301526044820184905260806064830152600060848301526001919087169063b88d4fde9060a401612a7c565b60405162461bcd60e51b815260206004820152603860248201527f4d61726b65743a20746f6b656e206d75737420696d706c656d656e742065697460448201527f686572204552432031313535206f7220455243203732312e000000000000000060648201526084016106a4565b60606117b883836040518060600160405280602781526020016146b2602791396136ed565b6000610675825490565b6000818360c00151612dca919061454e565b9050808360a001516001600160a01b031663dd62ed3e612de86126d8565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260440160206040518083038186803b158015612e2d57600080fd5b505afa158015612e41573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612e659190613f7d565b1015612ed15760405162461bcd60e51b815260206004820152603560248201527f4d61726b65743a206d75737420617070726f7665204d61726b657420746f20746044820152743930b739b332b910383934b1b2903a37903830bc9760591b60648201526084016106a4565b60085460009061271090612eee906001600160801b03168461454e565b612ef8919061452c565b90508360a001516001600160a01b03166323b872dd612f156126d8565b60055460405163f2aab4b360e01b81523060048201526001600160a01b039091169063f2aab4b39060240160206040518083038186803b158015612f5857600080fd5b505afa158015612f6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612f909190613b64565b6040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b158015612fdf57600080fd5b505af1158015612ff3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130179190613e61565b6130745760405162461bcd60e51b815260206004820152602860248201527f4d61726b65743a206661696c656420746f207472616e736665722070726f746f60448201526731b7b61031baba1760c11b60648201526084016106a4565b6000613080828461456d565b60408087015190516301ffc9a760e01b815263152a902d60e11b60048201529192506001600160a01b0316906301ffc9a79060240160206040518083038186803b1580156130cd57600080fd5b505afa1580156130e1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131059190613e61565b156133385760008086604001516001600160a01b0316632a55205a8860600151876040518363ffffffff1660e01b815260040161314c929190918252602082015260400190565b604080518083038186803b15801561316357600080fd5b505afa158015613177573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061319b9190613d34565b90925090506001600160a01b038216158015906131b85750600081115b1561333557846131c88583614514565b111561322a5760405162461bcd60e51b815260206004820152602b60248201527f4d61726b65743a20546f74616c206d61726b657420666565732065786365656460448201526a103a343290383934b1b29760a91b60648201526084016106a4565b613234818461456d565b92508660a001516001600160a01b03166323b872dd6132516126d8565b6040516001600160e01b031960e084901b1681526001600160a01b039182166004820152908516602482015260448101849052606401602060405180830381600087803b1580156132a157600080fd5b505af11580156132b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132d99190613e61565b6133355760405162461bcd60e51b815260206004820152602760248201527f4d61726b65743a206661696c656420746f207472616e7366657220637265617460448201526637b91031baba1760c91b60648201526084016106a4565b50505b8460a001516001600160a01b03166323b872dd6133536126d8565b60208801516040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b1580156133a757600080fd5b505af11580156133bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906133df9190613e61565b61343a5760405162461bcd60e51b815260206004820152602660248201527f4d61726b65743a206661696c656420746f207472616e736665722073656c6c65604482015265391031baba1760d11b60648201526084016106a4565b5050505050565b600081815260018301602052604081205461348857508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610675565b506000610675565b6060600061349f83600261454e565b6134aa906002614514565b6001600160401b038111156134c1576134c1614675565b6040519080825280601f01601f1916602001820160405280156134eb576020820181803683370190505b509050600360fc1b816000815181106135065761350661465f565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106135355761353561465f565b60200101906001600160f81b031916908160001a905350600061355984600261454e565b613564906001614514565b90505b60018111156135dc576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106135985761359861465f565b1a60f81b8282815181106135ae576135ae61465f565b60200101906001600160f81b031916908160001a90535060049490941c936135d5816145b0565b9050613567565b5083156117b85760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106a4565b61363582826117bf565b15610e80576000828152602081815260408083206001600160a01b03851684529091529020805460ff1916905561366a6126d8565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006117b8836001600160a01b0384166137c1565b60008260000182815481106136da576136da61465f565b9060005260206000200154905092915050565b6060833b61374c5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016106a4565b600080856001600160a01b03168560405161376791906140e5565b600060405180830381855af49150503d80600081146137a2576040519150601f19603f3d011682016040523d82523d6000602084013e6137a7565b606091505b50915091506137b78282866138b4565b9695505050505050565b600081815260018301602052604081205480156138aa5760006137e560018361456d565b85549091506000906137f99060019061456d565b905081811461385e5760008660000182815481106138195761381961465f565b906000526020600020015490508087600001848154811061383c5761383c61465f565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061386f5761386f614649565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610675565b6000915050610675565b606083156138c35750816117b8565b8251156138d35782518084602001fd5b8160405162461bcd60e51b81526004016106a4919061428c565b6040518061016001604052806000815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160006001600160a01b03168152602001600081526020016000815260200160008152602001600081526020016000600181111561396d5761396d614633565b905290565b82805461397e906145c7565b90600052602060002090601f0160209004810192826139a057600085556139e6565b82601f106139b95782800160ff198235161785556139e6565b828001600101855582156139e6579182015b828111156139e65782358255916020019190600101906139cb565b506139f29291506139f6565b5090565b5b808211156139f257600081556001016139f7565b600082601f830112613a1c57600080fd5b813560206001600160401b03821115613a3757613a37614675565b8160051b613a468282016144e4565b838152828101908684018388018501891015613a6157600080fd5b600093505b85841015613a84578035835260019390930192918401918401613a66565b50979650505050505050565b60008083601f840112613aa257600080fd5b5081356001600160401b03811115613ab957600080fd5b602083019150836020828501011115613ad157600080fd5b9250929050565b600082601f830112613ae957600080fd5b81356001600160401b03811115613b0257613b02614675565b613b15601f8201601f19166020016144e4565b818152846020838601011115613b2a57600080fd5b816020850160208301376000918101602001919091529392505050565b600060208284031215613b5957600080fd5b81356117b88161468b565b600060208284031215613b7657600080fd5b81516117b88161468b565b600080600080600060a08688031215613b9957600080fd5b8535613ba48161468b565b94506020860135613bb48161468b565b935060408601356001600160401b0380821115613bd057600080fd5b613bdc89838a01613a0b565b94506060880135915080821115613bf257600080fd5b613bfe89838a01613a0b565b93506080880135915080821115613c1457600080fd5b50613c2188828901613ad8565b9150509295509295909350565b600080600080600060808688031215613c4657600080fd5b8535613c518161468b565b94506020860135613c618161468b565b93506040860135925060608601356001600160401b03811115613c8357600080fd5b613c8f88828901613a90565b969995985093965092949392505050565b600080600080600060a08688031215613cb857600080fd5b8535613cc38161468b565b94506020860135613cd38161468b565b9350604086013592506060860135915060808601356001600160401b03811115613cfc57600080fd5b613c2188828901613ad8565b60008060408385031215613d1b57600080fd5b8235613d268161468b565b946020939093013593505050565b60008060408385031215613d4757600080fd5b8251613d528161468b565b6020939093015192949293505050565b600080600080600080600080610100898b031215613d7f57600080fd5b8835613d8a8161468b565b9750602089013596506040890135613da18161468b565b979a96995096976060810135975060808101359660a0820135965060c0820135955060e0909101359350915050565b60008060208385031215613de357600080fd5b82356001600160401b0380821115613dfa57600080fd5b818501915085601f830112613e0e57600080fd5b813581811115613e1d57600080fd5b8660208260051b8501011115613e3257600080fd5b60209290920196919550909350505050565b600060208284031215613e5657600080fd5b81356117b8816146a3565b600060208284031215613e7357600080fd5b81516117b8816146a3565b600060208284031215613e9057600080fd5b5035919050565b60008060408385031215613eaa57600080fd5b823591506020830135613ebc8161468b565b809150509250929050565b60008060408385031215613eda57600080fd5b50508035926020909101359150565b600060208284031215613efb57600080fd5b81356001600160e01b0319811681146117b857600080fd5b60008060208385031215613f2657600080fd5b82356001600160401b03811115613f3c57600080fd5b613f4885828601613a90565b90969095509350505050565b600060208284031215613f6657600080fd5b81356001600160801b03811681146117b857600080fd5b600060208284031215613f8f57600080fd5b5051919050565b60008060008060008060c08789031215613faf57600080fd5b86359550602087013594506040870135613fc88161468b565b959894975094956060810135955060808101359460a0909101359350915050565b60008151808452614001816020860160208601614584565b601f01601f19169290920160200192915050565b6002811061403357634e487b7160e01b600052602160045260246000fd5b9052565b80518252602081015161405560208401826001600160a01b03169052565b50604081015161407060408401826001600160a01b03169052565b50606081015160608301526080810151608083015260a081015161409f60a08401826001600160a01b03169052565b5060c081015160c083015260e081015160e0830152610100808201518184015250610120808201518184015250610140808201516140df82850182614015565b50505050565b600082516140f7818460208701614584565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351614139816017850160208801614584565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161416a816028840160208801614584565b01602801949350505050565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b0384168152602081018390526101a081016141d36040830184614037565b949350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561423057603f1988860301845261421e858351613fe9565b94509285019290850190600101614202565b5092979650505050505050565b6020808252825182820181905260009190848201906040850190845b818110156142805761426c838551614037565b928401926101609290920191600101614259565b50909695505050505050565b6020815260006117b86020830184613fe9565b6020808252602f908201527f4d61726b65743a204f6e6c79207468652073656c6c65722063616e2063616c6c60408201526e103a3434b990333ab731ba34b7b71760891b606082015260800190565b602080825260409082018190527f4d61726b65743a206d75737420617070726f766520746865206d61726b657420908201527f746f207472616e7366657220746f6b656e73206265696e67206c69737465642e606082015260800190565b6020808252602b908201527f6f6e6c792061206d6f64756c652061646d696e2063616e2063616c6c2074686960408201526a3990333ab731ba34b7b71760a91b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526037908201527f4d61726b65743a2063616e6e6f74206c657420627579657220627579206d6f7260408201527f65207468616e206c6973746564207175616e746974792e000000000000000000606082015260800190565b61016081016106758284614037565b8b81526001600160a01b038b811660208301528a81166040830152606082018a905260808201899052871660a082015260c0810186905260e0810185905261010081018490526101208101839052610160810161448e610140830184614015565b9c9b505050505050505050505050565b6000808335601e198436030181126144b557600080fd5b8301803591506001600160401b038211156144cf57600080fd5b602001915036819003821315613ad157600080fd5b604051601f8201601f191681016001600160401b038111828210171561450c5761450c614675565b604052919050565b600082198211156145275761452761461d565b500190565b60008261454957634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156145685761456861461d565b500290565b60008282101561457f5761457f61461d565b500390565b60005b8381101561459f578181015183820152602001614587565b838111156140df5750506000910152565b6000816145bf576145bf61461d565b506000190190565b600181811c908216806145db57607f821691505b602082108114156145fc57634e487b7160e01b600052602260045260246000fd5b50919050565b60006000198214156146165761461661461d565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146146a057600080fd5b50565b80151581146146a057600080fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220746ec8e7d7be926968bfbfbb57883f14e972c98eadfd364ced9a0b2912b25a7164736f6c63430008070033"