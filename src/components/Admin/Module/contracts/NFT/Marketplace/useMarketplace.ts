import {useMoralis, useWeb3ExecuteFunction} from "react-moralis";
import { useState} from "react";
import marketplaceInterface from "./interface";
import useERC20 from "../../../../../../hooks/useERC20";
import useERC721 from "../../../../../../hooks/useERC721";

const useMarketplace = (marketplaceAddress: string) => {


    const { data: dataAllListings, fetch: fetchAllListings } = useWeb3ExecuteFunction();
    const { fetch: fetchUserListings } = useWeb3ExecuteFunction();
    const { fetch: fetchListNft } = useWeb3ExecuteFunction();
    const { fetch: fetchUnlistNft } = useWeb3ExecuteFunction();
    const { fetch: fetchBuyNft } = useWeb3ExecuteFunction();
    const { approve, balance } = useERC20();
    const { approve: approveErc721, isApproved: checkForApproval, isApprovedResult } = useERC721()
    const { getListingsByUserAbi, getAllListingsAbi, buyAbi, listNftAbi, unlistAbi } = marketplaceInterface()
    const { account } = useMoralis()
    const [ allListings, setAllListings ] = useState<Array<object> | null>(null)
    const [ isUnlisting, setUnlisting ] = useState<boolean>(false)
    const [ isListing, setIsListing ] = useState<boolean>(false)
    const [ unlistSuccess, setUnlistSuccess ] = useState<boolean>(false)
    const [ unlistError, setUnlistError ] = useState()

    /**
     * approve NFTs
     */
    const approveNFT = async (contractAddress: string) => {
        await approveErc721(contractAddress,marketplaceAddress);
    }

    /**
     * check if marketplace has NFT allowance
     */
    const hasApprovedNFT = async (contractAddress: string, owner: string) => {
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
        setIsListing(true)
        if(!(await hasApprovedNFT(asset_contract,account))) {
           await approveNFT(asset_contract)
        }
        if(quantity <= 0) {
            alert("Quantity cannot be 0 or lower")
            setIsListing(false)
            throw Error("Quantity cannot be 0 or lower")
        }
        if(tokensPerBuyer >= quantity) {
            alert("Cannot let buyer buy more than or all listed nft")
            setIsListing(false)
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
            },
            onSuccess: () => {
                setUnlistSuccess(true);
                setUnlisting(false);
            },
            onError: (error) => {
                setUnlistError(error);
                setUnlisting(false);
            }
        }).then(() => {}).catch(() => {})
    }

    /**
     * un-list NFT from marketplace
     */
    const unlist = (listingId: string | number, quantity: string | number) => {
        setUnlisting(true)
        fetchUnlistNft({
            params: {
                abi: [ unlistAbi ],
                contractAddress: marketplaceAddress,
                functionName: "unlist",
                params: {
                    _listingId: listingId,
                    _quantity: quantity
                }
            },
            onSuccess: (results) => {
                console.log(results)
                setUnlisting(false)
            },
            onError: () => {setUnlisting(false)},
            onComplete: () => {console.log('finished unlisting')}
        }).then(() => {}).catch(() => {})
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
            },
            onSuccess: results => {
                setAllListings(results)
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

    return {
        allListings,
        approveNFT,
        buy,
        getAllListings,
        getListingsByUser,
        dataAllListings,
        list,
        unlist,
        isListing,
        isUnlisting,
        unlistError,
        unlistSuccess
    }
}

export default useMarketplace;

