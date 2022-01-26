import {useWeb3ExecuteFunction, useWeb3Transfer} from "react-moralis";
import {useState} from "react";

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
    const { fetch: transferNft } = useWeb3Transfer();
    const [ transferSuccess, setTransferSuccess ] = useState<boolean | Error>(false);
    const [ isTransferring, setIsTransferring ] = useState<boolean>(false);

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

    const transfer = (tokenId: string, contractAddress: string, receiver: string) => {
        setIsTransferring(true)
        transferNft({
            params: {
                type: "erc721",
                tokenId,
                contractAddress,
                receiver,
            },
            onSuccess: results => {
                (results as any).wait().then(() => {
                    setIsTransferring(false)
                    setTransferSuccess(true)
                })
            },
            onError: error => {
                setTransferSuccess(error)
                setIsTransferring(false)
            }
        }).then()
    }

    return {
        approve,
        isApproved,
        isApprovedResult,
        isTransferring,
        transferSuccess,
        transfer
    }
}

export default useERC721;