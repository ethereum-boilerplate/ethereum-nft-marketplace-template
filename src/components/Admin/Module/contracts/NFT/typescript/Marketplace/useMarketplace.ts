import {useMoralis, useWeb3ExecuteFunction} from "react-moralis";
import {useEffect, useState} from "react";
import marketplaceInterface from "./interface";
import useERC20 from "../../../../../../../hooks/useERC20";
import useERC721 from "../../../../../../../hooks/useERC721";

const useMarketplace = (marketplaceAddress: string) => {

    const { data: dataAllListings, fetch: fetchAllListings } = useWeb3ExecuteFunction();
    const {fetch: fetchUserListings } = useWeb3ExecuteFunction();
    const { data: dataListNft, fetch: fetchListNft } = useWeb3ExecuteFunction();
    const { data: dataBuyNft, fetch: fetchBuyNft } = useWeb3ExecuteFunction();
    const { approve, balance } = useERC20();
    const { approve: approveErc721, isApproved: checkForApproval, isApprovedResult } = useERC721()
    const { getListingsByUserAbi, getAllListingsAbi, buyAbi, listNftAbi } = marketplaceInterface()
    const { account } = useMoralis()
    const [ allListings, setAllListings ] = useState<Array<object> | null>(null)
    const [ isUnlisting, setUnlisting ] = useState<boolean>(false)

    useEffect(() => {
        if(dataAllListings) {
            setAllListings(allListings)
        }
    }, [ dataAllListings ])

    /**
     * approve NFTs
     */
    const approveNFT = async (contractAddress: string) => {
        await approveErc721(contractAddress,marketplaceAddress);
    }

    /**
     * check if marketplace has NFT allowance
     */
    const hasApproved = async (contractAddress: string, owner: string) => {
        await checkForApproval(contractAddress,owner,marketplaceAddress)
        return isApprovedResult;
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
        return false;
    }

    /**
     * list NFT on marketplace
     */
    const list = async (
        asset_contract: string,
        token_id: string,
        currency: string,
        pricePerToken: number = 0,
        quantity: number = 1,
        tokensPerBuyer: number = 0,
        secondsUntilStart: number = 0,
        secondsUntilEnd: number = 0,
    ) => {
        if(!(await hasApproved(asset_contract,account))) {
           await approveNFT(asset_contract)
        }
        if(quantity <= 0) {
            alert("Quantity cannot be 0 or lower")
            throw Error("Quantity cannot be 0 or lower")
        }
        if(tokensPerBuyer >= quantity) {
            alert("Cannot let buyer buy more than or all listed nft")
            throw Error("Cannot let buyer buy more than or all listed nft")
        }

        if(tokensPerBuyer === 0) tokensPerBuyer = quantity
        fetchListNft({
            params: {
                abi: [ listNftAbi ],
                contractAddress: marketplaceAddress,
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
        setUnlisting(true)
        setUnlisting(false)
    }

    /**
     * buy NFT from marketplace
     */
    const buy = async (currency: string, amount: string,  listingId: string | number) => {
        if(!(await hasEnoughTokensToBuy(currency, amount))) return;
        if(!(await hasApprovedToken())) {
            await approve(currency, marketplaceAddress, amount)
        }
        await fetchBuyNft({
            params: {
                abi: [ buyAbi ],
                contractAddress: marketplaceAddress,
                functionName: "buy",
                params: {
                    _listingId: listingId,
                    _quantity: amount
                }
            }
        })
    }

    const getAllListings = () => {
        fetchAllListings({
            params: {
                abi: [ getAllListingsAbi ],
                contractAddress: marketplaceAddress,
                functionName: "getAllListings",
            }
        }).then(() => {}).catch(() => {})
    }

    const getListingsByUser = (account: string) => {
        fetchUserListings({
            params: {
                abi: [ getListingsByUserAbi ],
                contractAddress: marketplaceAddress,
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
        approveNFT,
        buy,
        getListingsByUser,
        dataAllListings,
        list,
        unlist,
        isUnlisting
    }
}

export default useMarketplace;

