// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../Module/contracts/NFT/useMarketplace';
import {Button, iconTypes, Illustration, LinkTo, Table} from 'web3uikit';
import { useChain, useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getExplorer } from '../../../../helpers/networks';
import { Image } from 'antd';
import { Flex } from 'uikit/Flex/Flex';

interface IMarketplace {
    ownListings?: boolean;
    admin?: any;
}

const Marketplace: React.FC<IMarketplace> = ({ ownListings = false, admin }) => {
    const { account, Moralis } = useMoralis();
    const { token } = useMoralisWeb3Api();
    const { chainId } = useChain();
    const [tableData, setTableData] = useState([]);
    const [isBuying, setIsBuying] = useState<boolean>(false);

    const { allListings, buy, unlist, loadingListings, setLoadingListings, getListingsByUser } = useMarketplace();
    useEffect(() => {
        if (allListings) {
            if (allListings.length === 0) return;
            const canBeBoughtList = allListings.filter((value) => {
                return value[4] > 0;
            });
            if (canBeBoughtList.length === 0) return;
            console.log(canBeBoughtList)
            setLoadingListings(true);
            if (!ownListings) {
                canBeBoughtList.forEach((nft, index) => {
                    onForEach(canBeBoughtList, nft, index);
                });
            } else {
                getListingsByUser(account).then((list) => {
                    const hasQuantity = list.filter((value) => {
                        return value.quantity > 0;
                    });
                    hasQuantity.forEach((nft, index) => {
                        onForEach(hasQuantity, nft, index);
                    });
                });
            }

            /*printTable().then();*/
        }
        return () => {
            setTableData([]);
        };
        // eslint-disable-next-line
    }, [allListings]);

    const onForEach = (canBeBoughtList, nft, index) => {
        token
            .getTokenIdMetadata({
                ['chain' as any]: chainId,
                address: nft[2],
                token_id: nft[3],
            })
            .then((metadataResult) => {
                console.log('trigger');
                const metadata = JSON.parse(metadataResult.metadata);
                console.log('trigger 2');
                token
                    .getTokenMetadata({
                        addresses: [nft[5]],
                        ['chain' as any]: chainId,
                    })
                    .then((tokenResult) => {
                        // @ts-ignore
                        const row = [
                            <div
                                style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <span style={{ color: '#041836', fontSize: '16px' }}>{nft[3]}</span>
                            </div>,
                            <div
                                style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '15px',
                                    marginTop: '-5px',
                                }}
                            >
                                <Image src={metadata.image ? metadata.image : ''} width={80} height={80} alt={''} />
                            </div>,
                            <div
                                style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <span style={{ color: '#041836', fontSize: '16px' }}>
                                    {metadata.name ? metadata.name : metadataResult.name ? metadataResult.name : ''}
                                </span>
                            </div>,
                            <div
                                style={{
                                    display: 'grid',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <LinkTo
                                    text={getEllipsisTxt(nft[1], 4)}
                                    address={`${getExplorer(chainId)}address/${nft[1]}`}
                                    type="external"
                                />
                            </div>,
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Image
                                    width={25}
                                    height={25}
                                    src={tokenResult[0].logo || 'https://ropsten.etherscan.io/images/main/empty-token.png'}
                                    alt={''}
                                />
                                <span
                                    style={{
                                        color: '#041836',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                    }}
                                >{`${Moralis.Units.FromWei(nft[6], Number(tokenResult[0].decimals))} ${
                                    tokenResult[0].symbol
                                }`}</span>
                            </div>,
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    height: '100%',
                                }}
                            >
                                <Button
                                    isLoading={isBuying}
                                    isFullWidth
                                    text={'Buy'}
                                    theme={'outline'}
                                    onClick={() => {
                                        setIsBuying(true);
                                        buy(nft[0], '1', nft[5], nft[6], account, setIsBuying);
                                    }}
                                />
                                {(account.toLowerCase() === nft[1].toLowerCase() ||
                                    (admin && account.toLowerCase() === admin.toLowerCase())) && (
                                    <Button
                                        icon={iconTypes.bin}
                                        iconLayout={'icon-only'}
                                        theme={'outline'}
                                        onClick={() => unlist(nft[0], '1', account)}
                                    />
                                )}
                            </div>,
                        ];
                        setTableData((prevState) => (prevState.length === 0 ? [row] : [...prevState, row]));
                        if (index === canBeBoughtList.length - 1) {
                            setLoadingListings(false);
                        }
                    });
            })
            .catch((e) => {
                console.log(e);
                return;
            });
    };

    return (
        <Flex maxWidth="900px" width="100%">
            <p style={{ fontSize: '24px', fontWeight: '600', alignItems: 'start' }}>{ownListings ? 'Your Listings' : 'Explore Market'}</p>
            <p style={{ marginBottom: '30px' }}>{`${
                loadingListings ? 'loading ...' : `${tableData.length} item${tableData.length > 1 ? 's' : ''} listed`
            }`}</p>
            <Table
                columnsConfig="50px 80px 2fr 0.75fr 1fr 1fr"
                data={tableData}
                header={[
                    <div style={{ ...columnNameStyle, marginLeft: '20px' }}>
                        <span>#</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Image</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Name</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Seller</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Price</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Actions</span>
                    </div>,
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                pageSize={5}
                customNoDataComponent={
                    loadingListings ? (
                        <div>
                            <Illustration logo={'servers'} />
                            <p>Loading ...</p>
                        </div>
                    ) : (
                        <div>
                            <Illustration logo={'lazyNft'} />
                            <p>No NFTs listed</p>
                        </div>
                    )
                }
            />
        </Flex>
    );
};

const columnNameStyle = {
    color: '#68738D',
    fontWeight: '500',
    fontSize: '14px',
    display: 'grid',
    placeItems: 'flex-start',
    width: '100%',
    marginTop: '5px',
    marginBottom: '-5px',
};

export default Marketplace;
