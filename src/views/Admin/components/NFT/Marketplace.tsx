import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../Module/contracts/NFT/useMarketplace';
import { Button, LinkTo, Table } from 'web3uikit';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getExplorer } from '../../../../helpers/networks';

interface NftForSaleType {
    listingId: string;
    contract: string;
    metadata: {
        description?: string;
        name: string;
        symbol: string;
    };
    seller: string;
    price: string | number;
    currency: string;
    tokenId: string;
}
interface IMarketplace {
    address?: string;
    web3?: any;
    ownListings?: boolean;
}
const Marketplace: React.FC<IMarketplace> = ({ address, web3, ownListings = false }) => {
    const { allListings, currentUsersListings, buy, unlist } = useMarketplace(web3, address);
    const { account, Moralis } = useMoralis();
    const { token } = useMoralisWeb3Api();
    const { chainId } = useChain();
    const [nftsForSale, setNftsForSale] = useState<Array<NftForSaleType>>([]);
    const [tableData, setTableData] = useState([]);
    const [isEmpty, setEmpty] = useState<boolean>(false);

    useEffect(() => {
        if (allListings && !ownListings) {
            setNftsForSale([]);
            allListings.forEach((listing) => {
                if (listing.quantity === '0') return;
                const listingId = listing.listingId;
                const contract = listing.assetContract;
                const metadata = listing.metadata;
                const seller = listing.seller;
                const price = listing.pricePerToken;
                const currency = listing.currency;
                const tokenId = listingId.token_id;

                const nftToSell: NftForSaleType = {
                    listingId,
                    contract,
                    tokenId,
                    metadata,
                    seller,
                    price,
                    currency,
                };

                setNftsForSale((prev) => (prev.length > 0 ? [...prev, nftToSell] : [nftToSell]));
            });
        }
    }, [allListings]);

    useEffect(() => {
        if (currentUsersListings) {
            setNftsForSale([]);
            currentUsersListings.forEach((listing) => {
                if (listing.quantity === '0') return;
                const listingId = listing.listingId;
                const contract = listing.assetContract;
                const metadata = listing.metadata;
                const seller = listing.seller;
                const price = listing.pricePerToken;
                const currency = listing.currency;
                const tokenId = listing.token_id;

                const nftToSell: NftForSaleType = {
                    listingId,
                    contract,
                    tokenId,
                    metadata,
                    seller,
                    price,
                    currency,
                };

                setNftsForSale((prev) => (prev.length > 0 ? [...prev, nftToSell] : [nftToSell]));
            });
        }
    }, [currentUsersListings]);

    useEffect(() => {
        if (nftsForSale) {
            if (nftsForSale.length === 0) {
                setEmpty(true);
                return;
            }
            printTable().then();
        }
        // eslint-disable-next-line
    }, [nftsForSale]);

    const printTable = async () => {
        let p = [];
        console.log(nftsForSale);
        await nftsForSale.forEach((nft) => {
            console.log(nft);
            p.push([
                <span>{nft.tokenId}</span>,
                '',
                <span>{nft.metadata.name}</span>,
                <LinkTo text={getEllipsisTxt(nft.seller, 4)} address={`${getExplorer(chainId)}address/${nft.seller}`} type="external" />,
                <span>{`${Moralis.Units.FromWei(nft.price)}`}</span>,
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button text={'Buy'} theme={'outline'} onClick={() => buy(nft.listingId, '1', nft.currency, nft.price, account)} />
                    <Button text={'Unlist'} theme={'outline'} onClick={() => unlist(nft.listingId, '1', account)} />
                </div>,
            ]);
        });
        setTableData(p);
    };

    return (
        <Table
            columnsConfig="80px 1fr 1fr 1fr 1fr 1.25fr"
            data={tableData}
            header={['#', <span>Image</span>, <span>Name</span>, <span>Seller</span>, <span>Price</span>, <span>Actions</span>]}
            maxPages={3}
            onPageNumberChanged={function noRefCheck() {}}
            pageSize={5}
            customNoDataText={!isEmpty ? 'Loading ...' : 'No Items listed'}
        />
    );
};

export default Marketplace;
