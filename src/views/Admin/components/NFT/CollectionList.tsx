// @ts-nocheck
import { useChain, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis';
import { Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { Table, Button, Illustration, Breadcrumbs } from 'web3uikit';
import NFTMinterForm from '../../Forms/NFTMinter';
import useProtocol from '../../Module/contracts/Protocol/useProtocol';
import NFTLister from '../../Forms/NFTLister';
import { RouteComponentProps } from 'react-router-dom';
import { HeaderStyled } from 'uikit/HeaderStyled';

export const CollectionList: React.FC = (props: RouteComponentProps<{ address: string }>) => {
    const { chainId } = useChain();
    const [showMinter, setShowMinter] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [tableData, setTableData] = useState([]);
    const { marketplaceAddress } = useProtocol();
    const [nftToList, setNftToList] = useState({});
    const [showLister, setShowLister] = useState<boolean>(false);

    const {
        match: {
            params: { address },
        },
    } = props;

    const Web3Api = useMoralisWeb3Api();

    const { data } = useMoralisWeb3ApiCall(
        Web3Api.token.getAllTokenIds,
        {
            address: address,
            ['chain' as any]: chainId,
        },
        { autoFetch: true }
    );

    useEffect(() => {
        if (data && data.result.length > 0) {
            setIsEmpty(false);
            const temp = [];
            data.result.forEach((result, index) => {
                const metadata = JSON.parse(result.metadata);
                console.log(result);
                temp.push([
                    <span>{result.token_id}</span>,
                    // @ts-ignore
                    <Image
                        height={80}
                        width={80}
                        style={{ borderRadius: '15px' }}
                        src={
                            metadata && metadata.image && metadata.image.includes('://' | 'https' | 'ipfs')
                                ? metadata.image
                                : 'https://i.ibb.co/FzDBLqk/Image.png'
                        }
                    />,
                    <div>
                        <p>{metadata && metadata.name ? metadata.name : result.name}</p>
                        <span
                            style={{
                                fontSize: 'small',
                                color: 'gray',
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '50ch',
                            }}
                        >
                            {metadata && metadata.description ? metadata.description : 'No Description'}
                        </span>
                    </div>,
                    <div style={{ display: 'flex', width: '100%', gap: '15px' }}>
                        <Button
                            theme={'outline'}
                            isFullWidth
                            onClick={() => {
                                console.log('Transfer');
                            }}
                            text={'Transfer'}
                        />
                        <Button
                            theme={'outline'}
                            isFullWidth
                            onClick={() => {
                                setNftToList({
                                    token_address: result.token_address,
                                    token_id: result.token_id,
                                    metadata: metadata,
                                    name: result.name,
                                    type: result.contract_type,
                                });
                                setShowLister(true);
                            }}
                            text={'List'}
                        />
                    </div>,
                ]);
                if (index === data.result.length - 1) {
                    setTableData(temp);
                }
            });
        }
        if (data && data.result.length === 0) {
            setIsEmpty(true);
        }
        // eslint-disable-next-line
    }, [data]);

    return (
        <>
            <HeaderStyled>
                <Breadcrumbs
                    routes={[
                        {
                            breadcrumb: 'Admin Panel',
                            path: '/admin',
                        },
                        {
                            breadcrumb: 'Manage NFT Collection',
                            path: 'current',
                        },
                    ]}
                    currentLocation="current"
                    style={{ marginBottom: '24px' }}
                />

                <div style={{ position: 'absolute', right: 0, top: 0 }}>
                    <Button theme={'primary'} text={'Mint NFT'} icon={'plus'} iconLayout={'leading'} onClick={() => setShowMinter(true)} />
                </div>
            </HeaderStyled>
            {!showMinter && (
                <Table
                    columnsConfig="80px 90px 1fr 1fr"
                    data={tableData}
                    header={[
                        <div style={{ ...columnNameStyle, marginLeft: '15px' }}>
                            <span>#</span>
                        </div>,
                        <div style={columnNameStyle}>
                            <span>Logo</span>
                        </div>,
                        <div style={columnNameStyle}>
                            <span>Name</span>
                        </div>,
                        <div style={columnNameStyle}>
                            <span>Actions</span>
                        </div>,
                    ]}
                    maxPages={3}
                    onPageNumberChanged={function noRefCheck() {}}
                    pageSize={5}
                    customNoDataComponent={
                        <div>
                            <Illustration logo={'servers'} width={'150'} height={'150'} />
                            <span>{!isEmpty ? 'Loading ...' : 'Collection is empty'}</span>
                            {!isEmpty ? (
                                ''
                            ) : (
                                <Button
                                    theme={'primary'}
                                    text={'Mint First NFT'}
                                    icon={'plus'}
                                    iconLayout={'leading'}
                                    onClick={() => setShowMinter(true)}
                                />
                            )}
                        </div>
                    }
                />
            )}
            {showMinter && <NFTMinterForm address={address} />}
            {showLister && (
                <NFTLister
                    modalActive={showLister}
                    setModalActive={setShowLister}
                    marketplaceAddress={marketplaceAddress}
                    nft={nftToList}
                />
            )}
        </>
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
