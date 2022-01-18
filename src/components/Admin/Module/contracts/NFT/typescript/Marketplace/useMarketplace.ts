import {useChain, useMoralis, useMoralisWeb3Api, useWeb3ExecuteFunction} from "react-moralis";
import {useEffect, useState} from "react";
import marketplaceInterface from "./interface";
import useERC20 from "../../../../../../../hooks/useERC20";

const useMarketplace = (address: string) => {

    const { data: dataAllListings, fetch: fetchAllListings } = useWeb3ExecuteFunction();
    const { data: dataUserListings, fetch: fetchUserListings } = useWeb3ExecuteFunction();
    const { data: dataListNft, fetch: fetchListNft } = useWeb3ExecuteFunction();
    const { chainId } = useChain();
    const { approve, approvalResult, balance } = useERC20();
    const { getListingsByUserAbi, getAllListingsAbi } = marketplaceInterface()
    const { token } = useMoralisWeb3Api()
    const { account } = useMoralis()
    const [ allListings, setAllListings ] = useState<Array<object> | null>(null)

    useEffect(() => {
        if(dataAllListings) {
            setAllListings(allListings)
        }
    }, [ dataAllListings ])

    /**
     * approve NFTs
     */
    const approveNFTs = () => {

    }

    /**
     * check if marketplace has allowance
     */
    const hasApproved = () => {

    }

    /**
     * check if user has enough tokens to buy nft
     */
    const hasEnoughTokensToBuy = async (token_contract: string, amount: string): Promise<boolean> => {
        const req = await balance(token_contract, account);
        return req >= amount;
    }

    /**
     * check if marketplace has enough allowance
     */
    const hasApprovedToken = async (): Promise<boolean> => {
        return true;
    }

    /**
     * list NFT on marketplace
     */
    const list = (
        asset_contract: string,
        token_id: string,
        currency: string,
        pricePerToken: number = 0,
        quantity: number = 1,
        tokensPerBuyer: number = 0,
        secondsUntilStart: number = 0,
        secondsUntilEnd: number = 0,
    ) => {
        fetchListNft({
            params: {
                abi: [ ],
                contractAddress: address,
                functionName: "list",
                params: {
                     _assetContract: asset_contract,
                    _tokenId: token_id,
                    _currency: currency,
                    _pricePerToken: pricePerToken,
                    _quantity: quantity,
                    _tokensPerBuyer: tokensPerBuyer,
                    _secondsUntilStart: secondsUntilStart,
                    _secondsUntilEnd: secondsUntilEnd,
                }
            }
        }).then(() => {}).catch(() => {})
    }

    /**
     * un-list NFT from marketplace
     */
    const unlist = () => {

    }

    /**
     * buy NFT from marketplace
     */
    const buy = async (currency: string, amount: string,  listingId: string | number) => {
        if(!(await hasEnoughTokensToBuy(currency, amount))) return;
        if(!(await  hasApprovedToken())) {
            await approve(currency, address, amount)
        }
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
        allListings,
        getListingsByUser,
        dataListNft,
        list
    }
}

export default useMarketplace;

