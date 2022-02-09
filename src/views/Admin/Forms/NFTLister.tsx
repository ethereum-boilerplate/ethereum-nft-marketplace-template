// @ts-nocheck

import React, { useState } from 'react';
import { getWrappedNative, Input, Modal, Select } from 'web3uikit';
import { useMoralis } from 'react-moralis';
import { getWrappedNativeLogo, getWrappedNativeSymbol } from '../../../helpers/networks';
import { useMarketplace } from '../Module/contracts/NFT/useMarketplace';
import { Image } from 'antd';

const NFTLister: React.FC = ({ nft, marketplaceAddress, modalActive, setModalActive }) => {
    const { chainId, Moralis, account } = useMoralis();
    const { listNFT, isListing } = useMarketplace(marketplaceAddress, account);
    const [currency, setCurrency] = useState<string>('');
    const [price, setPrice] = useState<string | number>();

    return (
        <Modal
            isVisible={modalActive}
            okText={'List NFT'}
            title={`List ${nft.metadata ? nft.metadata.name : nft.name} #${nft.token_id} For Sale`}
            hasCancel={false}
            onCloseButtonPressed={() => {
                setModalActive(false)
            }}
            onOk={() => listNFT(nft.token_address, nft.token_id, currency.toLowerCase(), price, 1, 1, 0, 0, account)}
            isOkDisabled={!price || isListing}
            children={[
                <div key={1} style={{ display: 'grid', gap: '30px', placeItems: 'center' }}>
                    <div
                        style={{
                            maxWidth: '250px',
                            maxHeight: '250px',
                            borderRadius: '15px',
                            overflow: 'hidden',
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    >
                        {
                            // @ts-ignore
                            <Image src={nft.metadata && nft.metadata.image ? nft.metadata.image : 'https://i.ibb.co/FzDBLqk/Image.png'} />
                        }
                    </div>
                    <div style={{ color: 'black', fontSize: '18px', display: 'grid', placeItems: 'center' }}>
                        <p style={{ fontWeight: 600 }}>{`${nft.metadata ? nft.metadata.name : nft.name} #${nft.token_id}`}</p>
                        <p style={{ fontSize: '12px' }}>{nft.type}</p>
                    </div>
                    <Input
                        width={'100%'}
                        onChange={(e) => {
                            setCurrency(e.target.value);
                        }}
                        value={getWrappedNative(chainId) || ''}
                        label="Currency Address"
                    />
                    <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                        {getWrappedNativeLogo(chainId) && (
                            <Select
                                defaultOptionIndex={0}
                                label={'Currency'}
                                onChange={(e) => {
                                    setCurrency(e.id);
                                }}
                                options={[
                                    {
                                        id: getWrappedNative(chainId),
                                        label: getWrappedNativeSymbol(chainId),
                                        prefix: <img src={getWrappedNativeLogo(chain)} alt={''} />,
                                    },
                                ]}
                            />
                        )}
                        <Input
                            width={'100%'}
                            onChange={(e) =>
                                (e as any).target.value > 0 ? setPrice(Moralis.Units.ETH(String((e as any).target.value))) : null
                            }
                            label={'Price'}
                            type={'number'}
                        />
                    </div>
                </div>,
            ]}
        />
    );
};

export default NFTLister;
