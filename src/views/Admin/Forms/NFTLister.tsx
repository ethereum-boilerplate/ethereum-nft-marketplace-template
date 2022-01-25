// @ts-nocheck

import React, { useState } from 'react';
import { Input, Modal, Select } from 'web3uikit';
import { useMoralis } from 'react-moralis';
import { getNativeByChain } from '../../../helpers/networks';
import { useMarketplace } from '../Module/contracts/NFT/useMarketplace';
import { Image } from 'antd';

const NFTLister: React.FC = ({ nft, web3, marketplaceAddress }) => {
    const { chainId, Moralis, account } = useMoralis();
    const { listNFT } = useMarketplace(web3, marketplaceAddress, account);
    const [currency, setCurrency] = useState<string>('0x0000000000000000000000000000000000000000');
    const [price, setPrice] = useState<string | number>();

    return (
        <Modal
            isVisible={true}
            okText={'List NFT'}
            title={`List ${nft.metadata.name} #${nft.token_id} For Sale`}
            onOk={() =>
                listNFT(
                    nft.token_address,
                    nft.token_id,
                    currency.toLowerCase(),
                    price,
                    1,
                    1,
                    0,
                    0,
                    account
                )
            }
            isOkDisabled={!price}
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
                            <Image src={nft.metadata.image ? nft.metadata.image : 'https://i.ibb.co/FzDBLqk/Image.png'} />
                        }
                    </div>
                    <div style={{color: "black", fontSize: "18px", display: "grid", placeItems: "center"}}>
                        <p style={{fontWeight: 600}}>{`${nft.metadata.name} #${nft.token_id}`}</p>
                        <p style={{fontSize: "12px"}}>{nft.type}</p>
                    </div>
                    <Input
                        width={'100%'}
                        onChange={(e) => {
                            console.log(e)
                            setCurrency(e.target.value);
                        }}
                        label="Currency Address"
                    />
                    <div style={{ width: '100%', display: 'flex', gap: '10px' }}>
                        <Select
                            defaultOptionIndex={0}
                            label={'Currency'}
                            onChange={() => {
                            }}
                            options={[
                                {
                                    id: getNativeByChain(chainId),
                                    label: getNativeByChain(chainId),
                                    tokenAddress: '0x0000000000000000000000000000000000000000',
                                },
                            ]}
                        />
                        <Input
                            width={'70%'}
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
