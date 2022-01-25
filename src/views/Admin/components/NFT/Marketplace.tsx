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
        await nftsForSale.forEach((nft) => {
            p.push([
                <span style={{fontSize: "16px", fontWeight: "600"}}>{nft.listingId}</span>,
                '',
                <span style={{fontSize: "16px", fontWeight: "600"}}>{nft.metadata.name}</span>,
                <LinkTo text={getEllipsisTxt(nft.seller, 4)} address={`${getExplorer(chainId)}address/${nft.seller}`} type="external" />,
                <span style={{textAlign: "center", fontSize: "16px", fontWeight: "600"}}>{`${Moralis.Units.FromWei(nft.price)}`}</span>,
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button text={'Buy'} theme={'outline'} onClick={() => buy(nft.listingId, '1', nft.currency, nft.price, account)} />
                    { (account.toLowerCase() === nft.seller.toLowerCase()) && <Button text={'Unlist'} theme={'outline'} onClick={() => unlist(nft.listingId, '1', account)}/>}
                </div>,
            ]);
        });
        setTableData(p);
    };

    return (
        <Table
            columnsConfig="80px 80px 2fr 1fr 1fr 1fr"
            data={tableData}
            header={[
                <div style={{...columnNameStyle, marginLeft: "20px"}}><span>#</span></div>,
                <div style={columnNameStyle}><span>Image</span></div>,
                <div style={columnNameStyle}><span>Name</span></div>,
                <div style={columnNameStyle}><span>Seller</span></div>,
                <div style={columnNameStyle}><span>Price</span></div>,
                <div style={columnNameStyle}><span>Actions</span></div>
            ]}
            maxPages={3}
            onPageNumberChanged={function noRefCheck() {}}
            pageSize={5}
            customNoDataText={!isEmpty ? 'Loading ...' : 'No Items listed'}
        />
    );
};

const columnNameStyle = {
    color: "#68738D",
    fontWeight: "500",
    fontSize: "14px",
    display: 'grid',
    placeItems: "flex-start",
    width: "100%",
    marginTop: "5px",
    marginBottom: "-5px"
}

export default Marketplace;
