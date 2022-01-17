export const marketplaceAbi = [
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
export const marketplaceBytecode = "60806040523480156200001157600080fd5b5060405162004ed938038062004ed98339810160408190526200003491620004e7565b6002805460ff191690556001600355600480546001600160a01b0319166001600160a01b03851617905581516200007390600790602085019062000424565b50600580546001600160a01b0319166001600160a01b038616179055620000a560006200009f62000118565b62000134565b620000d47ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c6200009f62000118565b620001037f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a6200009f62000118565b6200010e8162000144565b5050505062000670565b60006200012f6200027f60201b620027581760201c565b905090565b620001408282620002b8565b5050565b6200015a60006200015462000118565b620002fb565b620001c05760405162461bcd60e51b815260206004820152602b60248201527f6f6e6c792061206d6f64756c652061646d696e2063616e2063616c6c2074686960448201526a3990333ab731ba34b7b71760a91b60648201526084015b60405180910390fd5b6127106001600160801b03821611156200022b5760405162461bcd60e51b815260206004820152602560248201527f6270732070726f7669646564206d757374206265206c657373207468616e20316044820152640302c3030360dc1b6064820152608401620001b7565b600880546001600160801b0319166001600160801b0383169081179091556040519081527fd50e64e6eb05cd7ceafe1a28b1a7ad949edb90451106259c7117252d605178ef9060200160405180910390a150565b6004546000906001600160a01b0316331415620002a3575060131936013560601c90565b6200012f6200032660201b620027851760201c565b620002cf82826200032a60201b620027891760201c565b6000828152600160209081526040909120620002f69183906200280e620003b4821b17901c565b505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff165b92915050565b3390565b620003368282620002fb565b62000140576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200037062000118565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000620003cb836001600160a01b038416620003d2565b9392505050565b60008181526001830160205260408120546200041b5750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000320565b50600062000320565b828054620004329062000604565b90600052602060002090601f016020900481019282620004565760008555620004a1565b82601f106200047157805160ff1916838001178555620004a1565b82800160010185558215620004a1579182015b82811115620004a157825182559160200191906001019062000484565b50620004af929150620004b3565b5090565b5b80821115620004af5760008155600101620004b4565b80516001600160801b0381168114620004e257600080fd5b919050565b60008060008060808587031215620004fe57600080fd5b84516200050b8162000657565b80945050602080860151620005208162000657565b60408701519094506001600160401b03808211156200053e57600080fd5b818801915088601f8301126200055357600080fd5b81518181111562000568576200056862000641565b604051601f8201601f19908116603f0116810190838211818310171562000593576200059362000641565b816040528281528b86848701011115620005ac57600080fd5b600093505b82841015620005d05784840186015181850187015292850192620005b1565b82841115620005e25760008684830101525b809750505050505050620005f960608601620004ca565b905092959194509250565b600181811c908216806200061957607f821691505b602082108114156200063b57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146200066d57600080fd5b50565b61485980620006806000396000f3fe608060405234801561001057600080fd5b50600436106102275760003560e01c80639010d07c11610130578063c78b616c116100b8578063de74e57b1161007c578063de74e57b1461053f578063deb26b94146105cf578063e63ab1e9146105f6578063e8a3d4851461061d578063f23a6e611461062557600080fd5b8063c78b616c146104ea578063ca15c873146104f3578063d547741f14610506578063d6febde814610519578063d8cba2511461052c57600080fd5b8063a217fddf116100ff578063a217fddf14610486578063ac9650d81461048e578063ae73ccec146104ae578063bc197c81146104b6578063c0e72740146104d557600080fd5b80639010d07c1461042257806391d148541461044d578063938e3d7b146104605780639b782ff21461047357600080fd5b8063354c7ab6116101b35780634fd69f3c116101825780634fd69f3c146103bb578063572b6c05146103ce578063583e12b6146103f05780635c975abb1461040357806361096ec61461040e57600080fd5b8063354c7ab61461035757806336568abe1461036a5780633f5c3e871461037d5780634edeaa81146103a857600080fd5b80631d0cd75e116101fa5780631d0cd75e146102b557806320c7852c146102d5578063248a9ca31461030e5780632f2ff15d14610331578063318510121461034457600080fd5b806301ffc9a71461022c57806309679b3914610254578063107a274a14610269578063150b7a0214610289575b600080fd5b61023f61023a36600461404d565b610644565b60405190151581526020015b60405180910390f35b6102676102623660046140b8565b61067b565b005b61027c610277366004613fc9565b610774565b60405161024b9190614569565b61029c610297366004613d79565b610845565b6040516001600160e01b0319909116815260200161024b565b6102c86102c3366004613e53565b610857565b60405161024b9190614388565b6103006102e3366004613ffb565b600a60209081526000928352604080842090915290825290205481565b60405190815260200161024b565b61030061031c366004613fc9565b60009081526020819052604090206001015490565b61026761033f366004613ffb565b610a77565b6102676103523660046140e1565b610aa9565b610267610365366004613f8f565b610d80565b610267610378366004613ffb565b610df6565b600854610390906001600160801b031681565b6040516001600160801b03909116815260200161024b565b6102c86103b6366004613c92565b610e84565b6102676103c936600461402b565b61106b565b61023f6103dc366004613c92565b6004546001600160a01b0391821691161490565b6102676103fe36600461402b565b61132d565b60025460ff1661023f565b60085461023f90600160801b900460ff1681565b61043561043036600461402b565b6117a0565b6040516001600160a01b03909116815260200161024b565b61023f61045b366004613ffb565b6117bf565b61026761046e366004614077565b6117e8565b610267610481366004613ead565b611968565b610300600081565b6104a161049c366004613f1b565b611cc4565b60405161024b9190614326565b6102c8611db8565b61029c6104c4366004613ccc565b63bc197c8160e01b95945050505050565b6104dd611f15565b60405161024b91906143d7565b61030060065481565b610300610501366004613fc9565b611fa3565b610267610514366004613ffb565b611fba565b61026761052736600461402b565b611fe2565b6102c861053a366004613c92565b6124e8565b6105b861054d366004613fc9565b600960208190526000918252604090912080546001820154600283015460038401546004850154600586015460068701546007880154600889015499890154600a9099015497996001600160a01b039788169996881698959794969490931694919390929160ff168b565b60405161024b9b9a99989796959493929190614578565b6103007ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c81565b6103007f65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a81565b6104dd6126c6565b61029c610633366004613deb565b63f23a6e6160e01b95945050505050565b60006001600160e01b03198216630271189760e51b148061067557506001600160e01b03198216630a85bd0160e11b145b92915050565b610688600061045b612823565b6106ad5760405162461bcd60e51b81526004016106a490614497565b60405180910390fd5b6127106001600160801b03821611156107165760405162461bcd60e51b815260206004820152602560248201527f6270732070726f7669646564206d757374206265206c657373207468616e20316044820152640302c3030360dc1b60648201526084016106a4565b600880546fffffffffffffffffffffffffffffffff19166001600160801b0383169081179091556040519081527fd50e64e6eb05cd7ceafe1a28b1a7ad949edb90451106259c7117252d605178ef906020015b60405180910390a150565b61077c613a38565b600082815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff169081111561082b5761082b61477e565b600181111561083c5761083c61477e565b90525092915050565b630a85bd0160e11b5b95945050505050565b6006546060906000805b828110156108ca576000818152600960205260409020600201546001600160a01b0387811691161480156108a5575060008181526009602052604090206003015485145b156108b8576108b560018361465f565b91505b6108c360018261465f565b9050610861565b50806001600160401b038111156108e3576108e36147c0565b60405190808252806020026020018201604052801561091c57816020015b610909613a38565b8152602001906001900390816109015790505b5092506000805b83811015610a6d576000818152600960205260409020600201546001600160a01b038881169116148015610967575060008181526009602052604090206003015486145b15610a5b57600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff1690811115610a1b57610a1b61477e565b6001811115610a2c57610a2c61477e565b81525050858381518110610a4257610a426147aa565b6020908102919091010152610a5860018361465f565b91505b610a6660018261465f565b9050610923565b5050505092915050565b600082815260208190526040902060010154610a9a81610a95612823565b61282d565b610aa48383612891565b505050565b60025460ff1615610acc5760405162461bcd60e51b81526004016106a4906144e2565b610ad4612823565b60008781526009602052604090206001015487906001600160a01b03838116911614610b125760405162461bcd60e51b81526004016106a4906143ea565b6000888152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff90911690811115610bc357610bc361477e565b6001811115610bd457610bd461477e565b8152505090508060800151861115610bfe5760405162461bcd60e51b81526004016106a49061450c565b60c081018890526001600160a01b03871660a08201528515610c205785610c26565b80608001515b610120820152610c36854261465f565b60e08201528315610c5057610c4b844261465f565b610c54565b6000195b610100820190815260008a8152600960208181526040928390208551815590850151600180830180546001600160a01b03199081166001600160a01b0394851617909155948701516002840180548716918416919091179055606087015160038401556080870151600484015560a087015160058401805490961692169190911790935560c0850151600682015560e085015160078201559251600884015561012084015190830155610140830151600a8301805485949360ff19909116908381811115610d2457610d2461477e565b021790555090505088610d35612823565b6001600160a01b03167fb4c8fd604ad229ddf17ffe34f0851a2abf5113b048f8235b12edbabcc6dd919383604051610d6d9190614569565b60405180910390a3505050505050505050565b610d8d600061045b612823565b610da95760405162461bcd60e51b81526004016106a490614497565b60088054821515600160801b0260ff60801b199091161790556040517f56668abce4c06e28f52176150c07856e31ee073b9b62df62a5afbf1a22aec24c9061076990831515815260200190565b610dfe612823565b6001600160a01b0316816001600160a01b031614610e765760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016106a4565b610e8082826128b3565b5050565b6006546060906000805b82811015610edb576000818152600960205260409020600201546001600160a01b0386811691161415610ec957610ec660018361465f565b91505b610ed460018261465f565b9050610e8e565b50806001600160401b03811115610ef457610ef46147c0565b604051908082528060200260200182016040528015610f2d57816020015b610f1a613a38565b815260200190600190039081610f125790505b5092506000805b83811015611062576000818152600960205260409020600201546001600160a01b038781169116141561105057600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff16908111156110105761101061477e565b60018111156110215761102161477e565b81525050858381518110611037576110376147aa565b602090810291909101015261104d60018361465f565b91505b61105b60018261465f565b9050610f34565b50505050919050565b611073612823565b60008381526009602052604090206001015483906001600160a01b038381169116146110b15760405162461bcd60e51b81526004016106a4906143ea565b6000848152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff909116908111156111625761116261477e565b60018111156111735761117361477e565b81525050905083816080015110156111e85760405162461bcd60e51b815260206004820152603260248201527f4d61726b65743a2063616e6e6f7420756e6c697374206d6f726520746f6b656e60448201527139903a3430b71030b932903634b9ba32b21760711b60648201526084016106a4565b83816080018181516111fa91906146b8565b9052506000858152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054859460ff199091169083818111156112cb576112cb61477e565b02179055509050506112dd81856128d5565b846112e6612823565b6001600160a01b03167fb4c8fd604ad229ddf17ffe34f0851a2abf5113b048f8235b12edbabcc6dd91938360405161131e9190614569565b60405180910390a35050505050565b60025460ff16156113505760405162461bcd60e51b81526004016106a4906144e2565b611358612823565b60008381526009602052604090206001015483906001600160a01b038381169116146113965760405162461bcd60e51b81526004016106a4906143ea565b6000848152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff909116908111156114475761144761477e565b60018111156114585761145861477e565b8152505090508381608001818151611470919061465f565b9052506000858152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054859460ff199091169083818111156115415761154161477e565b02179055505050836115a15760405162461bcd60e51b8152602060048201526024808201527f4d61726b65743a206d75737420616464206174206c65617374206f6e6520746f60448201526335b2b71760e11b60648201526084016106a4565b600081610140015160018111156115ba576115ba61477e565b1461161a5760405162461bcd60e51b815260206004820152602a60248201527f4d61726b65743a2043616e206f6e6c792061646420746f204552432031313535604482015269103634b9ba34b733b99760b11b60648201526084016106a4565b80604001516001600160a01b031663e985e9c5611635612823565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260440160206040518083038186803b15801561167a57600080fd5b505afa15801561168e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116b29190613fac565b6117245760405162461bcd60e51b815260206004820152603f60248201527f4d61726b65743a206d75737420617070726f766520746865206d61726b65742060448201527f746f207472616e7366657220746f6b656e73206265696e672061646465642e0060648201526084016106a4565b80604001516001600160a01b031663f242432a61173f612823565b308460600151886040518563ffffffff1660e01b815260040161176594939291906142c1565b600060405180830381600087803b15801561177f57600080fd5b505af1158015611793573d6000803e3d6000fd5b50505050846112e6612823565b60008281526001602052604081206117b89083612a62565b9392505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b6005546040805163a217fddf60e01b815290516001600160a01b03909216916391d1485491839163a217fddf91600480820192602092909190829003018186803b15801561183557600080fd5b505afa158015611849573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061186d9190613fe2565b611875612823565b6040516001600160e01b031960e085901b16815260048101929092526001600160a01b0316602482015260440160206040518083038186803b1580156118ba57600080fd5b505afa1580156118ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118f29190613fac565b61195c5760405162461bcd60e51b815260206004820152603560248201527f4d61726b65743a206f6e6c7920612070726f746f636f6c2061646d696e206361604482015274371031b0b636103a3434b990333ab731ba34b7b71760591b60648201526084016106a4565b610aa460078383613abd565b60025460ff161561198b5760405162461bcd60e51b81526004016106a4906144e2565b600854600160801b900460ff1615806119cb57506119cb7ff94103142c1baabe9ac2b5d1487bf783de9e69cfeea9a72f5c9c94afd7877b8c61045b612823565b611a255760405162461bcd60e51b815260206004820152602560248201527f6f6e6c792061206c69737465722063616e2063616c6c20746869732066756e636044820152643a34b7b71760d91b60648201526084016106a4565b60008411611a835760405162461bcd60e51b815260206004820152602560248201527f4d61726b65743a206d757374206c697374206174206c65617374206f6e65207460448201526437b5b2b71760d91b60648201526084016106a4565b83831115611aa35760405162461bcd60e51b81526004016106a49061450c565b60068054906001906000611ab7838561465f565b9091555060009050611ad38a611acb612823565b308c8a612a6e565b90506000604051806101600160405280848152602001611af1612823565b6001600160a01b031681526020018c6001600160a01b031681526020018b81526020018881526020018a6001600160a01b031681526020018981526020018642611b3b919061465f565b81526020018515611b5557611b50864261465f565b611b59565b6000195b81526020018715611b6a5787611b6c565b885b8152602001836001811115611b8357611b8361477e565b90526000848152600960208181526040928390208451815590840151600180830180546001600160a01b03199081166001600160a01b0394851617909155948601516002840180548716918416919091179055606086015160038401556080860151600484015560a086015160058401805490961692169190911790935560c0840151600682015560e08401516007820155610100840151600882015561012084015191810191909155610140830151600a82018054949550859492939192909160ff19909116908381811115611c5c57611c5c61477e565b021790555090505082611c6d612823565b6001600160a01b03168c6001600160a01b03167f70c5741a020504dbda58d308c3efe5275326c456d3b00c541925222c40f7c62e84604051611caf9190614569565b60405180910390a45050505050505050505050565b6060816001600160401b03811115611cde57611cde6147c0565b604051908082528060200260200182016040528015611d1157816020015b6060815260200190600190039081611cfc5790505b50905060005b82811015611db157611d8130858584818110611d3557611d356147aa565b9050602002810190611d4791906145e9565b8080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250612ed492505050565b828281518110611d9357611d936147aa565b60200260200101819052508080611da99061474d565b915050611d17565b5092915050565b600654606090806001600160401b03811115611dd657611dd66147c0565b604051908082528060200260200182016040528015611e0f57816020015b611dfc613a38565b815260200190600190039081611df45790505b50915060005b81811015611f1057600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff1690811115611ecc57611ecc61477e565b6001811115611edd57611edd61477e565b81525050838281518110611ef357611ef36147aa565b6020908102919091010152611f0960018261465f565b9050611e15565b505090565b60078054611f2290614712565b80601f0160208091040260200160405190810160405280929190818152602001828054611f4e90614712565b8015611f9b5780601f10611f7057610100808354040283529160200191611f9b565b820191906000526020600020905b815481529060010190602001808311611f7e57829003601f168201915b505050505081565b600081815260016020526040812061067590612ef9565b600082815260208190526040902060010154611fd881610a95612823565b610aa483836128b3565b600260035414156120355760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016106a4565b600260035561204660025460ff1690565b156120635760405162461bcd60e51b81526004016106a4906144e2565b60008281526009602052604090206001015482906001600160a01b03166120d85760405162461bcd60e51b815260206004820152602360248201527f4d61726b65743a20546865206c697374696e6720646f6573206e6f742065786960448201526239ba1760e91b60648201526084016106a4565b6000838152600960208181526040808420815161016081018352815481526001808301546001600160a01b039081169583019590955260028301548516938201939093526003820154606082015260048201546080820152600582015490931660a0840152600681015460c0840152600781015460e0840152600881015461010084015292830154610120830152600a83015491929161014084019160ff909116908111156121895761218961477e565b600181111561219a5761219a61477e565b905250905060006121a9612823565b90506000841180156121bf575081608001518411155b6122255760405162461bcd60e51b815260206004820152603160248201527f4d61726b65743a206d7573742062757920616e20617070726f7072696174652060448201527030b6b7bab73a1037b3103a37b5b2b7399760791b60648201526084016106a4565b816101000151421115801561223e57508160e001514210155b6122a55760405162461bcd60e51b815260206004820152603260248201527f4d61726b65743a207468652073616c652068617320656974686572206e6f742060448201527139ba30b93a32b21037b91031b637b9b2b21760711b60648201526084016106a4565b6101208201516000868152600a602090815260408083206001600160a01b03861684529091529020546122d8908661465f565b11156123435760405162461bcd60e51b815260206004820152603460248201527f4d61726b65743a2043616e6e6f7420627579206d6f72652066726f6d206c69736044820152733a34b733903a3430b7103832b936b4ba3a32b21760611b60648201526084016106a4565b6000858152600a602090815260408083206001600160a01b03851684529091528120805486929061237590849061465f565b92505081905550838260800181815161238e91906146b8565b9052506000858152600960208181526040928390208551815590850151600180830180546001600160a01b03199081166001600160a01b0394851617909155948701516002840180548716918416919091179055606087015160038401556080870151600484015560a087015160058401805490961692169190911790935560c0850151600682015560e08501516007820155610100850151600882015561012085015191810191909155610140840151600a82018054869460ff1990911690838181111561245f5761245f61477e565b0217905550505060c08201511561247a5761247a8285612f03565b61248482856128d5565b8482602001516001600160a01b031683604001516001600160a01b03167fc848190182320d1cb2ea6d8a80041c6780e56643bc41fe9060bb1f1349902cba8488876040516124d4939291906142f9565b60405180910390a450506001600355505050565b6006546060906000805b8281101561253f576000818152600960205260409020600101546001600160a01b038681169116141561252d5761252a60018361465f565b91505b61253860018261465f565b90506124f2565b50806001600160401b03811115612558576125586147c0565b60405190808252806020026020018201604052801561259157816020015b61257e613a38565b8152602001906001900390816125765790505b5092506000805b83811015611062576000818152600960205260409020600101546001600160a01b03878116911614156126b457600081815260096020818152604092839020835161016081018552815481526001808301546001600160a01b039081169483019490945260028301548416958201959095526003820154606082015260048201546080820152600582015490921660a0830152600681015460c0830152600781015460e0830152600881015461010083015291820154610120820152600a820154909261014084019160ff16908111156126745761267461477e565b60018111156126855761268561477e565b8152505085838151811061269b5761269b6147aa565b60209081029190910101526126b160018361465f565b91505b6126bf60018261465f565b9050612598565b6060600780546126d590614712565b80601f016020809104026020016040519081016040528092919081815260200182805461270190614712565b801561274e5780601f106127235761010080835404028352916020019161274e565b820191906000526020600020905b81548152906001019060200180831161273157829003601f168201915b5050505050905090565b6004546000906001600160a01b031633141561277b575060131936013560601c90565b503390565b905090565b3390565b61279382826117bf565b610e80576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556127ca612823565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006117b8836001600160a01b03841661358c565b6000612780612758565b61283782826117bf565b610e805761284f816001600160a01b031660146135db565b61285a8360206135db565b60405160200161286b92919061424c565b60408051601f198184030181529082905262461bcd60e51b82526106a4916004016143d7565b61289b8282612789565b6000828152600160205260409020610aa4908261280e565b6128bd8282613776565b6000828152600160205260409020610aa490826137f9565b600082610140015160018111156128ee576128ee61477e565b141561296b5781604001516001600160a01b031663f242432a30612910612823565b8560600151856040518563ffffffff1660e01b815260040161293594939291906142c1565b600060405180830381600087803b15801561294f57600080fd5b505af1158015612963573d6000803e3d6000fd5b505050505050565b600182610140015160018111156129845761298461477e565b1415610e8057806001146129f95760405162461bcd60e51b815260206004820152603660248201527f4d61726b65743a2043616e6e6f7420756e6c697374206d6f7265207468616e2060448201527537b7329037b31030b71022a921901b99189027232a1760511b60648201526084016106a4565b81604001516001600160a01b031663b88d4fde30612a15612823565b60608601516040516001600160e01b031960e086901b1681526001600160a01b0393841660048201529290911660248301526044820152608060648201526000608482015260a401612935565b60006117b8838361380e565b6040516301ffc9a760e01b8152636cdb3d1360e11b60048201526000906001600160a01b038716906301ffc9a79060240160206040518083038186803b158015612ab757600080fd5b505afa158015612acb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612aef9190613fac565b15612bfe5760405163e985e9c560e01b81526001600160a01b038681166004830152858116602483015287169063e985e9c59060440160206040518083038186803b158015612b3d57600080fd5b505afa158015612b51573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b759190613fac565b612b915760405162461bcd60e51b81526004016106a490614439565b50604051637921219560e11b81526000906001600160a01b0387169063f242432a90612bc79088908890889088906004016142c1565b600060405180830381600087803b158015612be157600080fd5b505af1158015612bf5573d6000803e3d6000fd5b5050505061084e565b6040516301ffc9a760e01b81526380ac58cd60e01b60048201526001600160a01b038716906301ffc9a79060240160206040518083038186803b158015612c4457600080fd5b505afa158015612c58573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c7c9190613fac565b15612e665781600114612ceb5760405162461bcd60e51b815260206004820152603160248201527f4d61726b65743a2043616e6e6f74206c697374206d6f7265207468616e20312060448201527037b31030b71022a9219b99189027232a1760791b60648201526084016106a4565b60405163e985e9c560e01b81526001600160a01b038681166004830152858116602483015287169063e985e9c59060440160206040518083038186803b158015612d3457600080fd5b505afa158015612d48573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612d6c9190613fac565b80612dfa575060405163020604bf60e21b8152600481018490526001600160a01b03808616919088169063081812fc9060240160206040518083038186803b158015612db757600080fd5b505afa158015612dcb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612def9190613caf565b6001600160a01b0316145b612e165760405162461bcd60e51b81526004016106a490614439565b50604051635c46a7ef60e11b81526001600160a01b03858116600483015284811660248301526044820184905260806064830152600060848301526001919087169063b88d4fde9060a401612bc7565b60405162461bcd60e51b815260206004820152603860248201527f4d61726b65743a20746f6b656e206d75737420696d706c656d656e742065697460448201527f686572204552432031313535206f7220455243203732312e000000000000000060648201526084016106a4565b60606117b883836040518060600160405280602781526020016147fd60279139613838565b6000610675825490565b6000818360c00151612f159190614699565b9050808360a001516001600160a01b031663dd62ed3e612f33612823565b6040516001600160e01b031960e084901b1681526001600160a01b03909116600482015230602482015260440160206040518083038186803b158015612f7857600080fd5b505afa158015612f8c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612fb09190613fe2565b101561301c5760405162461bcd60e51b815260206004820152603560248201527f4d61726b65743a206d75737420617070726f7665204d61726b657420746f20746044820152743930b739b332b910383934b1b2903a37903830bc9760591b60648201526084016106a4565b60085460009061271090613039906001600160801b031684614699565b6130439190614677565b90508360a001516001600160a01b03166323b872dd613060612823565b60055460405163f2aab4b360e01b81523060048201526001600160a01b039091169063f2aab4b39060240160206040518083038186803b1580156130a357600080fd5b505afa1580156130b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906130db9190613caf565b6040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b15801561312a57600080fd5b505af115801561313e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906131629190613fac565b6131bf5760405162461bcd60e51b815260206004820152602860248201527f4d61726b65743a206661696c656420746f207472616e736665722070726f746f60448201526731b7b61031baba1760c11b60648201526084016106a4565b60006131cb82846146b8565b60408087015190516301ffc9a760e01b815263152a902d60e11b60048201529192506001600160a01b0316906301ffc9a79060240160206040518083038186803b15801561321857600080fd5b505afa15801561322c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132509190613fac565b156134835760008086604001516001600160a01b0316632a55205a8860600151876040518363ffffffff1660e01b8152600401613297929190918252602082015260400190565b604080518083038186803b1580156132ae57600080fd5b505afa1580156132c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906132e69190613e7f565b90925090506001600160a01b038216158015906133035750600081115b156134805784613313858361465f565b11156133755760405162461bcd60e51b815260206004820152602b60248201527f4d61726b65743a20546f74616c206d61726b657420666565732065786365656460448201526a103a343290383934b1b29760a91b60648201526084016106a4565b61337f81846146b8565b92508660a001516001600160a01b03166323b872dd61339c612823565b6040516001600160e01b031960e084901b1681526001600160a01b039182166004820152908516602482015260448101849052606401602060405180830381600087803b1580156133ec57600080fd5b505af1158015613400573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906134249190613fac565b6134805760405162461bcd60e51b815260206004820152602760248201527f4d61726b65743a206661696c656420746f207472616e7366657220637265617460448201526637b91031baba1760c91b60648201526084016106a4565b50505b8460a001516001600160a01b03166323b872dd61349e612823565b60208801516040516001600160e01b031960e085901b1681526001600160a01b0392831660048201529116602482015260448101849052606401602060405180830381600087803b1580156134f257600080fd5b505af1158015613506573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061352a9190613fac565b6135855760405162461bcd60e51b815260206004820152602660248201527f4d61726b65743a206661696c656420746f207472616e736665722073656c6c65604482015265391031baba1760d11b60648201526084016106a4565b5050505050565b60008181526001830160205260408120546135d357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610675565b506000610675565b606060006135ea836002614699565b6135f590600261465f565b6001600160401b0381111561360c5761360c6147c0565b6040519080825280601f01601f191660200182016040528015613636576020820181803683370190505b509050600360fc1b81600081518110613651576136516147aa565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110613680576136806147aa565b60200101906001600160f81b031916908160001a90535060006136a4846002614699565b6136af90600161465f565b90505b6001811115613727576f181899199a1a9b1b9c1cb0b131b232b360811b85600f16601081106136e3576136e36147aa565b1a60f81b8282815181106136f9576136f96147aa565b60200101906001600160f81b031916908160001a90535060049490941c93613720816146fb565b90506136b2565b5083156117b85760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016106a4565b61378082826117bf565b15610e80576000828152602081815260408083206001600160a01b03851684529091529020805460ff191690556137b5612823565b6001600160a01b0316816001600160a01b0316837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45050565b60006117b8836001600160a01b03841661390c565b6000826000018281548110613825576138256147aa565b9060005260206000200154905092915050565b6060833b6138975760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016106a4565b600080856001600160a01b0316856040516138b29190614230565b600060405180830381855af49150503d80600081146138ed576040519150601f19603f3d011682016040523d82523d6000602084013e6138f2565b606091505b50915091506139028282866139ff565b9695505050505050565b600081815260018301602052604081205480156139f55760006139306001836146b8565b8554909150600090613944906001906146b8565b90508181146139a9576000866000018281548110613964576139646147aa565b9060005260206000200154905080876000018481548110613987576139876147aa565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806139ba576139ba614794565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610675565b6000915050610675565b60608315613a0e5750816117b8565b825115613a1e5782518084602001fd5b8160405162461bcd60e51b81526004016106a491906143d7565b6040518061016001604052806000815260200160006001600160a01b0316815260200160006001600160a01b03168152602001600081526020016000815260200160006001600160a01b031681526020016000815260200160008152602001600081526020016000815260200160006001811115613ab857613ab861477e565b905290565b828054613ac990614712565b90600052602060002090601f016020900481019282613aeb5760008555613b31565b82601f10613b045782800160ff19823516178555613b31565b82800160010185558215613b31579182015b82811115613b31578235825591602001919060010190613b16565b50613b3d929150613b41565b5090565b5b80821115613b3d5760008155600101613b42565b600082601f830112613b6757600080fd5b813560206001600160401b03821115613b8257613b826147c0565b8160051b613b9182820161462f565b838152828101908684018388018501891015613bac57600080fd5b600093505b85841015613bcf578035835260019390930192918401918401613bb1565b50979650505050505050565b60008083601f840112613bed57600080fd5b5081356001600160401b03811115613c0457600080fd5b602083019150836020828501011115613c1c57600080fd5b9250929050565b600082601f830112613c3457600080fd5b81356001600160401b03811115613c4d57613c4d6147c0565b613c60601f8201601f191660200161462f565b818152846020838601011115613c7557600080fd5b816020850160208301376000918101602001919091529392505050565b600060208284031215613ca457600080fd5b81356117b8816147d6565b600060208284031215613cc157600080fd5b81516117b8816147d6565b600080600080600060a08688031215613ce457600080fd5b8535613cef816147d6565b94506020860135613cff816147d6565b935060408601356001600160401b0380821115613d1b57600080fd5b613d2789838a01613b56565b94506060880135915080821115613d3d57600080fd5b613d4989838a01613b56565b93506080880135915080821115613d5f57600080fd5b50613d6c88828901613c23565b9150509295509295909350565b600080600080600060808688031215613d9157600080fd5b8535613d9c816147d6565b94506020860135613dac816147d6565b93506040860135925060608601356001600160401b03811115613dce57600080fd5b613dda88828901613bdb565b969995985093965092949392505050565b600080600080600060a08688031215613e0357600080fd5b8535613e0e816147d6565b94506020860135613e1e816147d6565b9350604086013592506060860135915060808601356001600160401b03811115613e4757600080fd5b613d6c88828901613c23565b60008060408385031215613e6657600080fd5b8235613e71816147d6565b946020939093013593505050565b60008060408385031215613e9257600080fd5b8251613e9d816147d6565b6020939093015192949293505050565b600080600080600080600080610100898b031215613eca57600080fd5b8835613ed5816147d6565b9750602089013596506040890135613eec816147d6565b979a96995096976060810135975060808101359660a0820135965060c0820135955060e0909101359350915050565b60008060208385031215613f2e57600080fd5b82356001600160401b0380821115613f4557600080fd5b818501915085601f830112613f5957600080fd5b813581811115613f6857600080fd5b8660208260051b8501011115613f7d57600080fd5b60209290920196919550909350505050565b600060208284031215613fa157600080fd5b81356117b8816147ee565b600060208284031215613fbe57600080fd5b81516117b8816147ee565b600060208284031215613fdb57600080fd5b5035919050565b600060208284031215613ff457600080fd5b5051919050565b6000806040838503121561400e57600080fd5b823591506020830135614020816147d6565b809150509250929050565b6000806040838503121561403e57600080fd5b50508035926020909101359150565b60006020828403121561405f57600080fd5b81356001600160e01b0319811681146117b857600080fd5b6000806020838503121561408a57600080fd5b82356001600160401b038111156140a057600080fd5b6140ac85828601613bdb565b90969095509350505050565b6000602082840312156140ca57600080fd5b81356001600160801b03811681146117b857600080fd5b60008060008060008060c087890312156140fa57600080fd5b86359550602087013594506040870135614113816147d6565b959894975094956060810135955060808101359460a0909101359350915050565b6000815180845261414c8160208601602086016146cf565b601f01601f19169290920160200192915050565b6002811061417e57634e487b7160e01b600052602160045260246000fd5b9052565b8051825260208101516141a060208401826001600160a01b03169052565b5060408101516141bb60408401826001600160a01b03169052565b50606081015160608301526080810151608083015260a08101516141ea60a08401826001600160a01b03169052565b5060c081015160c083015260e081015160e08301526101008082015181840152506101208082015181840152506101408082015161422a82850182614160565b50505050565b600082516142428184602087016146cf565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516142848160178501602088016146cf565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516142b58160288401602088016146cf565b01602801949350505050565b6001600160a01b0394851681529290931660208301526040820152606081019190915260a06080820181905260009082015260c00190565b6001600160a01b0384168152602081018390526101a0810161431e6040830184614182565b949350505050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561437b57603f19888603018452614369858351614134565b9450928501929085019060010161434d565b5092979650505050505050565b6020808252825182820181905260009190848201906040850190845b818110156143cb576143b7838551614182565b9284019261016092909201916001016143a4565b50909695505050505050565b6020815260006117b86020830184614134565b6020808252602f908201527f4d61726b65743a204f6e6c79207468652073656c6c65722063616e2063616c6c60408201526e103a3434b990333ab731ba34b7b71760891b606082015260800190565b602080825260409082018190527f4d61726b65743a206d75737420617070726f766520746865206d61726b657420908201527f746f207472616e7366657220746f6b656e73206265696e67206c69737465642e606082015260800190565b6020808252602b908201527f6f6e6c792061206d6f64756c652061646d696e2063616e2063616c6c2074686960408201526a3990333ab731ba34b7b71760a91b606082015260800190565b60208082526010908201526f14185d5cd8589b194e881c185d5cd95960821b604082015260600190565b60208082526037908201527f4d61726b65743a2063616e6e6f74206c657420627579657220627579206d6f7260408201527f65207468616e206c6973746564207175616e746974792e000000000000000000606082015260800190565b61016081016106758284614182565b8b81526001600160a01b038b811660208301528a81166040830152606082018a905260808201899052871660a082015260c0810186905260e081018590526101008101849052610120810183905261016081016145d9610140830184614160565b9c9b505050505050505050505050565b6000808335601e1984360301811261460057600080fd5b8301803591506001600160401b0382111561461a57600080fd5b602001915036819003821315613c1c57600080fd5b604051601f8201601f191681016001600160401b0381118282101715614657576146576147c0565b604052919050565b6000821982111561467257614672614768565b500190565b60008261469457634e487b7160e01b600052601260045260246000fd5b500490565b60008160001904831182151516156146b3576146b3614768565b500290565b6000828210156146ca576146ca614768565b500390565b60005b838110156146ea5781810151838201526020016146d2565b8381111561422a5750506000910152565b60008161470a5761470a614768565b506000190190565b600181811c9082168061472657607f821691505b6020821081141561474757634e487b7160e01b600052602260045260246000fd5b50919050565b600060001982141561476157614761614768565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b03811681146147eb57600080fd5b50565b80151581146147eb57600080fdfe416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a2646970667358221220d6cd698c9a1716e4fffb805a6baa394a95eda54b11e0478e21643fa9883307f564736f6c63430008070033"