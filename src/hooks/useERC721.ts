import {useWeb3ExecuteFunction} from "react-moralis";

const approveAbi = {
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
}
const isApprovedAbi = {
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
}

const useERC721 = () => {

    const { fetch: fetchApprove } = useWeb3ExecuteFunction();
    const { fetch: fetchIsApprove, data: isApprovedResult } = useWeb3ExecuteFunction();

    const approve = (contractAddress: string, operator: string) => {
        fetchApprove({
            params: {
                abi: [ approveAbi ],
                contractAddress: contractAddress,
                functionName: "setApprovalForAll",
                params: {
                    operator: operator,
                    approved: true
                }
            }
        }).then(() => {}).catch(() => {})
    }

    const isApproved = (contractAddress: string, owner: string, operator: string) => {
        fetchIsApprove({
            params: {
                abi: [ isApprovedAbi ],
                contractAddress: contractAddress,
                functionName: "isApprovedForAll",
                params: {
                    owner: owner,
                    operator: operator
                }
            }
        }).then(() => {}).catch(() => {})
    }

    return {
        approve,
        isApproved,
        isApprovedResult
    }
}

export default useERC721;