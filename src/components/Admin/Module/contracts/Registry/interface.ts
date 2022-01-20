/**
 * collection of method interfaces of registry contract
 */
const registryInterface = () => {

    const deployProtocolAbi = {
        "inputs": [
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "deployProtocol",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const getProtocolControlAbi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_deployer",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "index",
                "type": "uint256"
            }
        ],
        "name": "getProtocolControl",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }

    const getForwarderAbi = {
        "inputs":[],
        "name":"forwarder",
        "outputs":[
            {
                "internalType":"address",
                "name":"",
                "type":"address"
            }
        ],
        "stateMutability":"view",
        "type":"function"
    }

    return {
        deployProtocolAbi,
        getProtocolControlAbi,
        getForwarderAbi
    }
}

export default registryInterface;