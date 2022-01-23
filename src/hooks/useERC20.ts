import {useChain, useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";

const approveAbi = {"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}

const useERC20 = () => {

    const { fetch: fetchApprove, data: approvalResult } = useWeb3ExecuteFunction()
    const { account } = useMoralisWeb3Api()
    const { chainId } = useChain()

    const balance = async (contractAddress: string, userAddress: string): Promise<string> => {
        const req = await  account.getTokenBalances({
            address: userAddress,
            ["chain" as any]: chainId,
            token_addresses: [ contractAddress ]
        })
        return req[0].balance
    }

    const approve = (contractAddress: string, spender: string, amount: string) => {
        fetchApprove({
            params:{
                abi: [ approveAbi ],
                contractAddress: contractAddress,
                functionName: "approve",
                params: {
                    spender: spender,
                    value: amount
                }
            }
        }).then(() => {}).catch(() => {})
    }

    return {
        approve,
        approvalResult,
        balance
    }
}

export default  useERC20;