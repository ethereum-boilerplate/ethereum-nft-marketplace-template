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

    return {
        addModuleAbi,
        getForwarderAbi,
    }
}

export default protocolInterface;