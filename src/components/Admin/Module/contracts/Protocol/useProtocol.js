/* eslint-disable react-hooks/exhaustive-deps */
import { DEFAULT_ADMIN_ROLE } from "components/Admin"
import { useEffect,useState } from "react"
import { useMoralis } from "react-moralis"
import { useRegistry } from "../Registry/useRegistry"


export const useProtocol = (web3, isEnabled) => {
    const [ hasMarketplace, setMarketplace ] = useState(false)
    const [ isAdmin, setAdmin ] = useState(false)
    const [ marketplaceAddress, setMarketplaceAddress ] = useState(false)
    const [ isWithdrawing, setWithdrawing ] = useState(false)
    const [ approvedRegistry ] = useState(false)
    const[ forwarder, setForwarder] = useState(false)
    const [ isCheckingForMarketplace, setCheckingForMarketplace ] = useState(false)
    const { isInitialized} = useMoralis()
    const { protocolAddress } = useRegistry(web3, isEnabled)
    // const { data } = useMoralisQuery("NoCode")

    useEffect(() => {
        if(web3 && isEnabled && isInitialized && protocolAddress) {
            setCheckingForMarketplace(true)
            getModuleById("0x54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f8")
            .then(() => setCheckingForMarketplace(false))
            
        }
    }, [web3, isEnabled, isInitialized, protocolAddress])

    useEffect(() => {
        if(approvedRegistry) {
            withdrawFunds()
        }
    }, [approvedRegistry])

    useEffect(() => {
        if(protocolAddress && protocolAbi) {
            getForwarder()
        }
    }, [protocolAbi,protocolAddress])

    const getForwarder = async () => {
        const protocolControl = await new web3.eth.Contract(protocolAbi, protocolAddress)
        await protocolControl.methods.getForwarder().call().then(setForwarder)
    }

    const getModuleById = async (moduleId) => {
        const protocolControl = await new web3.eth.Contract(protocolAbi, protocolAddress)
        await protocolControl.methods.modules(moduleId).call().then((address) => {
            if(address === "0x0000000000000000000000000000000000000000") {
                console.log('has No Marketplace yet')
                
            }
            setMarketplaceAddress(address)
            setMarketplace(true)
            console.log('has marketplace at', address)
        })
        return await protocolControl.methods.modules(moduleId).call()
    }

    const checkRole = async (address) => {
        const protocolControl = await new web3.eth.Contract(protocolAbi, protocolAddress)
        await protocolControl.methods.hasRole(DEFAULT_ADMIN_ROLE, address).call().then(setAdmin)
    }

    const addModule = async (moduleType, address, signer) => {    
        const protocolControl = await new web3.eth.Contract(protocolAbi, protocolAddress)
        await protocolControl.methods.addModule(address, moduleType).send({from: signer})
    }

    const withdrawFunds = async (to, currency, amount, signer) => {
        const protocolControl = await new web3.eth.Contract(protocolAbi, protocolAddress)
        setWithdrawing(true)
        console.log(amount)
        const registry = await protocolControl.methods.registry().call()
        const registryContract = await new web3.eth.Contract([{
            "inputs": [],
            "name": "treasury",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }], registry)
        const treasury = await registryContract.methods.treasury().call()
        console.log(treasury)
        await protocolControl.methods.withdrawFunds(to, currency).send({from: signer})

    }

    return {
        protocolAddress,
        isAdmin,
        forwarder,
        addModule,
        getModuleById,
        isWithdrawing,
        withdrawFunds,
        isCheckingForMarketplace,
        marketplaceAddress,
        hasMarketplace,
        setMarketplace,
        getForwarder,
        checkRole
    }
}

export const protocolAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_registry",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_admin",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_uri",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "EtherReceived",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_newForwarder",
                "type": "address"
            }
        ],
        "name": "ForwarderUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "currency",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "fee",
                "type": "uint256"
            }
        ],
        "name": "FundsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "moduleId",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "module",
                "type": "address"
            }
        ],
        "name": "ModuleUpdated",
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
                "indexed": true,
                "internalType": "address",
                "name": "protocolControlAddress",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "moduleAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "treasury",
                "type": "address"
            }
        ],
        "name": "RoyaltyTreasuryUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "_newTreasury",
                "type": "address"
            }
        ],
        "name": "TreasuryUpdated",
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
        "name": "MAX_BPS",
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
                "internalType": "address",
                "name": "_newModuleAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_moduleType",
                "type": "uint256"
            }
        ],
        "name": "addModule",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "moduleId",
                "type": "bytes32"
            }
        ],
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
                "name": "_moduleType",
                "type": "uint256"
            }
        ],
        "name": "getAllModulesOfType",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "allModules",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getForwarder",
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
                "internalType": "address",
                "name": "moduleAddress",
                "type": "address"
            }
        ],
        "name": "getRoyaltyTreasury",
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
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "modules",
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
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "numOfModuleType",
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
        "inputs": [],
        "name": "registry",
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
        "name": "royaltyTreasury",
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
                "internalType": "address",
                "name": "forwarder",
                "type": "address"
            }
        ],
        "name": "setForwarder",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "moduleAddress",
                "type": "address"
            },
            {
                "internalType": "address payable",
                "name": "_treasury",
                "type": "address"
            }
        ],
        "name": "setModuleRoyaltyTreasury",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_treasury",
                "type": "address"
            }
        ],
        "name": "setRoyaltyTreasury",
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
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "_moduleId",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "_newModuleAddress",
                "type": "address"
            }
        ],
        "name": "updateModule",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                "internalType": "address",
                "name": "currency",
                "type": "address"
            }
        ],
        "name": "withdrawFunds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]