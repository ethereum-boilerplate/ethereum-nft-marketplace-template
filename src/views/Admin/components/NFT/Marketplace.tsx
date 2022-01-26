import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../Module/contracts/NFT/useMarketplace';
import { Button, LinkTo, Table } from 'web3uikit';
import {useChain, useMoralis, useMoralisWeb3Api} from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getExplorer } from '../../../../helpers/networks';
import {Image} from "antd";

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
    admin?: any;
}
const Marketplace: React.FC<IMarketplace> = ({ address, web3, ownListings = false, admin }) => {
    const { account, Moralis } = useMoralis();
    const { allListings, currentUsersListings, buy, unlist, getAllListings } = useMarketplace(web3, address, account);
    const { token } = useMoralisWeb3Api()
    const { chainId } = useChain();
    const [nftsForSale, setNftsForSale] = useState<Array<NftForSaleType>>([]);
    const [tableData, setTableData] = useState([]);
    const [isEmpty, setEmpty] = useState<boolean>(false);


/*    useEffect(() => {
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
    }, [currentUsersListings]);*/

    useEffect(() => {
        if (allListings) {
            if(allListings.length === 0) return;
            const canBeBoughtList = allListings.filter( value => {
                return value.quantity > 0
            })
            canBeBoughtList.forEach((nft) => {
                token.getTokenIdMetadata({
                    ["chain" as any]: chainId,
                    address: nft.assetContract,
                    token_id: nft.tokenId
                })
                    .then((metadataResult) => {
                        console.log('trigger')
                            const metadata = JSON.parse(metadataResult.metadata)
                        console.log('trigger 2')
                            const row = [
                                <span style={{fontSize: "16px", fontWeight: "600"}}>{nft.tokenId}</span>,
                                <Image src={metadata.image ? metadata.image : ""} width={80} height={80} alt={""}/>,
                                <span style={{fontSize: "16px", fontWeight: "600"}}>{metadata.name ? metadata.name : metadataResult.name ? metadataResult.name : ""}</span>,
                                <LinkTo text={getEllipsisTxt(nft.seller, 4)} address={`${getExplorer(chainId)}address/${nft.seller}`} type="external" />,
                                <span style={{textAlign: "center", fontSize: "16px", fontWeight: "600"}}>{`${Moralis.Units.FromWei(nft.pricePerToken)} ${nft.tokenInfo ? nft.tokenInfo.symbol ? nft.tokenInfo.symbol : "" : ""}`}</span>,
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Button text={'Buy'} theme={'outline'} onClick={() => buy(nft.listingId, '1', nft.currency, nft.pricePerToken, account)} />
                                    { ((account.toLowerCase() === nft.seller.toLowerCase()) || (admin && (account.toLowerCase() === admin.toLowerCase()))) && <Button text={'Unlist'} theme={'outline'} onClick={() => unlist(nft.listingId, '1', account)}/>}
                                </div>,
                            ]
                            setTableData(prevState => prevState.length === 0 ? [ row ] : [...prevState, row])

                    })
                    .catch((e) => {
                        console.log(e)
                        return;
                    })
            })

            /*printTable().then();*/
        }
        // eslint-disable-next-line
    }, [allListings]);

    const printTable = async () => {
        let p = [];
        await allListings.forEach((nft) => {
            p.push([
                <span style={{fontSize: "16px", fontWeight: "600"}}>{nft.tokenId}</span>,
                '',
                <span style={{fontSize: "16px", fontWeight: "600"}}>{nft.metadata.name}</span>,
                <LinkTo text={getEllipsisTxt(nft.seller, 4)} address={`${getExplorer(chainId)}address/${nft.seller}`} type="external" />,
                <span style={{textAlign: "center", fontSize: "16px", fontWeight: "600"}}>{`${Moralis.Units.FromWei(nft.price)}`}</span>,
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Button text={'Buy'} theme={'outline'} onClick={() => buy(nft.listingId, '1', nft.currency, nft.pricePerToken, account)} />
                    { ((account.toLowerCase() === nft.seller.toLowerCase()) || (admin && (account.toLowerCase() === admin.toLowerCase()))) && <Button text={'Unlist'} theme={'outline'} onClick={() => unlist(nft.listingId, '1', account)}/>}
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
            customNoDataText={!isEmpty ? 'Loading ...' : 'No Items listed yet'}
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
