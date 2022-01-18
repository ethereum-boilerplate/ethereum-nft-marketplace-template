import {useChain, useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import {useEffect, useState} from "react";
import marketplaceInterface from "./interface";

const useMarketplace = (address: string) => {

    const { data: dataAllListings, fetch: fetchAllListings } = useWeb3ExecuteFunction();
    const { data: dataUserListings, fetch: fetchUserListings } = useWeb3ExecuteFunction();
    const { chainId } = useChain();
    const { getListingsByUserAbi, getAllListingsAbi } = marketplaceInterface()
    const { token } = useMoralisWeb3Api()
    const [ allListings, setAllListings ] = useState<Array<object> | null>(null)

    useEffect(() => {
        if(dataAllListings) {
            setAllListings(allListings)
        }
    }, [ dataAllListings ])

    /**
     * approve NFTs
     */
    const approve = () => {

    }

    const getAllListings = () => {
        fetchAllListings({
            params: {
                abi: [ getAllListingsAbi ],
                contractAddress: address,
                functionName: "getAllListings",
            }
        }).then(() => {}).catch(() => {})
    }

    const getListingsByUser = (account: string) => {
        fetchUserListings({
            params: {
                abi: [ getListingsByUserAbi ],
                contractAddress: address,
                functionName: "getListingsBySeller",
                params: {
                    account: account
                }
            }
        }).then(() => {}).catch(() => {})
    }

    getAllListings()

    return {
        approve,
        allListings,
        getListingsByUser
    }
}

export default useMarketplace;

