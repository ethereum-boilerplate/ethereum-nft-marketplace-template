import { useState, useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import marketplaceInterface from "./Marketplace/interface";
import Web3 from "web3";
export const useMarketplace = (marketplaceAddress) => {
    const [confirmed, setConfirmed] = useState(false);
    const [isListing, toggleIsListing] = useState(false);
    const [isUnlisting, setIsUnlisting] = useState(false);
    const [error, setError] = useState(null);
    const [isApproved, setApproved] = useState(false);
    const [allListings, setAllListings] = useState([]);
    const [ loadingListings, setLoadingListings ] = useState(true);
    const { buyAbi, contractUriAbi, getAllListingsAbi, getListingsByUserAbi, listNftAbi, unlistAbi } = marketplaceInterface();
    const { provider } = useMoralis();
    const [web3, setWeb3] = useState();

    useEffect(() => {
        if(provider) {
            setWeb3(new Web3(provider))
        }
    }, [ provider ])

    useEffect(() => {
            if(web3 && marketplaceAddress) {
                getAllListings().then((listings) => {
                    setAllListings(listings)
                    setLoadingListings(false)
                });
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, marketplaceAddress]);
    // DONE
    const getAllListings = async () => {
        console.log('marketplaceAddress', marketplaceAddress);
        const contract = await new web3.eth.Contract([getAllListingsAbi], marketplaceAddress);
        return await contract.methods.getAllListings().call();
    };
    /*
     * done
     */
    const getListingsByUser = async (user) => {
        const contract = await new web3.eth.Contract([getListingsByUserAbi], marketplaceAddress);
        const listings = await contract.methods.getListingsBySeller(user).call();
        setLoadingListings(false);
        return listings
    };

    const getContractURI = async () => {
        const contract = await new web3.eth.Contract([contractUriAbi], marketplaceAddress);
        return await contract.methods._contractURI().call();

    };

    const approve = async (assetContract, signer) => {
        toggleIsListing(true);
        const contract = await new web3.eth.Contract(standardNFTAbi, assetContract);
        await contract.methods
            .setApprovalForAll(marketplaceAddress, true)
            .send({ from: signer })
            .on('receipt', () => {
                setApproved(true);
            });
    };

    const hasApproved = async (assetContract, signer) => {
        const contract = await new web3.eth.Contract(standardNFTAbi, assetContract);
        const result = await contract.methods.isApprovedForAll(signer, marketplaceAddress).call();
        setApproved(result);
        return result;
    };

    const hasEnoughTokensToBuy = async (currency, amount, wallet) => {
        if (currency === '0x0000000000000000000000000000000000000000') return true;
        const contract = await new web3.eth.Contract(erc20abi, currency);
        console.log(wallet);
        return (await contract.methods.balanceOf(wallet).call()) >= amount;
    };

    const listNFT = async (
        assetContract,
        tokenId,
        currency,
        pricePerToken = '0',
        quantity = 1,
        tokensPerBuyer = 0,
        secondsUntilStart = 0,
        secondsUntilEnd = 0,
        signer
    ) => {
        toggleIsListing(true);
        if (tokensPerBuyer === 0) tokensPerBuyer = quantity;
        const contract = await new web3.eth.Contract([listNftAbi], marketplaceAddress);
        console.log(assetContract, marketplaceAddress, tokenId, currency, signer);
        const run = async () => {
            if (!(await hasApproved(assetContract, signer))) {
                await approve(assetContract, signer);
            }
            await contract.methods
                .list(assetContract, tokenId, currency, pricePerToken, quantity, tokensPerBuyer, secondsUntilStart, secondsUntilEnd)
                .send({ from: signer })
                .on('receipt', () => {
                    toggleIsListing(false);
                    setConfirmed(true);
                })
                .on('error', (error) => {
                    toggleIsListing(false);
                    setError(error);
                });
        };

        await run();

        return {
            confirmed,
            error,
            run,
        };
    };

    const unlist = async (listingId, amount, currentUser) => {
        setIsUnlisting(true);
        const contract = await new web3.eth.Contract([unlistAbi], marketplaceAddress);
        await contract.methods
            .unlist(listingId, amount)
            .send({ from: currentUser })
            .on('receipt', (receipt) => {
                setIsUnlisting(false);
                return receipt;
            });
    };

    const buy = async (listingId, quantity, currency, pricePerToken, signer, setIsBuying) => {
        setIsBuying(true);
        try {
            if (currency !== '0x0000000000000000000000000000000000000000') {
                const erc20Token = await new web3.eth.Contract(erc20abi, currency);
                const hasApprovedErc20Token = await erc20Token.methods.allowance(signer, marketplaceAddress).call();
                if (!hasApprovedErc20Token) {
                    alert('Token To buy does not exist');
                    setIsBuying(false);
                    return;
                }
                if (hasApprovedErc20Token < pricePerToken) {
                    await erc20Token.methods.approve(marketplaceAddress, pricePerToken).send({ from: signer })
                }
            }
            const contract = await new web3.eth.Contract([buyAbi], marketplaceAddress);
            await contract.methods
                .buy(listingId, quantity)
                .send({ from: signer })
                .on('receipt', () => {
                    setIsBuying(false);
                });
        } catch (error) {
            setIsBuying(false);
        }
    };

    return {
        listNFT,
        getAllListings,
        getListingsByUser,
        isListing,
        loadingListings,
        setLoadingListings,
        unlist,
        isUnlisting,
        allListings,
        hasApproved,
        hasEnoughTokensToBuy,
        isApproved,
        buy,
        getContractURI,
    };
};

export const standardNFTAbi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'operator',
                type: 'address',
            },
            {
                internalType: 'bool',
                name: 'approved',
                type: 'bool',
            },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

export const erc20abi = [
    {
        inputs: [
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'owner',
                type: 'address',
            },
            {
                internalType: 'address',
                name: 'spender',
                type: 'address',
            },
        ],
        name: 'allowance',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
