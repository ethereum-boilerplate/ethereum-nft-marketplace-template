const generateContractOptions = (abi: object, contractAddress: string, functionName: string, params: object) => {
    return {
        params: {
            abi: [
                abi
            ],
            contractAddress: contractAddress,
            functionName: functionName,
            params: params
        }
    }

}
export default generateContractOptions;