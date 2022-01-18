const protocolInterface = () => {

    const addModuleAbi = {
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
    }

    const getForwarderAbi = {
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
    }

    const getModulesAbi = {
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
    }

    return {
        addModuleAbi,
        getModulesAbi,
        getForwarderAbi,
    }
}

export default protocolInterface;