// @ts-nocheck
import { Form, Notification } from 'web3uikit';
import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useCollection } from '../Module/contracts/NFT/useCollection';
import Web3 from 'web3';

interface INFTMinterForm {
    address?: string;
}

const NFTMinterForm: React.FC<INFTMinterForm> = ({ address }) => {
    const { account, provider } = useMoralis();
    const { saveFile, isUploading } = useMoralisFile();
    const [web3, setWeb3] = useState<any>();
    const { mint, isMinting, mintingError, mintingSuccess } = useCollection(web3, address);

    useEffect(() => {
        if (provider) {
            setWeb3(new Web3(provider as any));
        }
    }, [provider]);

    const getButtonText = (): string => {
        if (isUploading) {
            return 'Uploading Metadata';
        }
        if (isMinting) {
            return 'Minting';
        }
        return 'Mint NFT';
    };

    const mintNFT = (e: any) => {
        let metadata = {
            name: e.name,
            image: e.image,
            symbol: e.symbol,
            description: e.description,
        };
        saveFile(
            'metadata.json',
            { base64: btoa(unescape(encodeURIComponent(JSON.stringify(metadata)))) },
            {
                type: 'json',
                metadata,
                saveIPFS: true,
            }
        ).then(async (file) => {
            const hash = (file as any)['_hash'];
            await mint(e.to, `ipfs://${hash}`, account);
        });
    };

    return (
        <>
            <Notification
                position={'topR'}
                isPositionRelative={true}
                isVisible={mintingError || mintingSuccess}
                message={mintingError ? mintingError.message : mintingSuccess ? 'Minted!' : ''}
                title={mintingError ? 'Error' : 'Success'}
            />
            <Form
                id={'form-mint-nft'}
                buttonConfig={{
                    isFullWidth: true,
                    text: getButtonText(),
                    isLoading: isUploading || isMinting,
                    theme: !isMinting ? 'primary' : 'secondary',
                    onClick: () => console.log('submitting ...'),
                }}
                data={[
                    {
                        name: 'Name',
                        type: 'text',
                        value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Image URL',
                        type: 'text',
                        value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Symbol',
                        type: 'text',
                        value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Description',
                        type: 'text',
                        value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'To Address',
                        type: 'text',
                        inputWidth: '100%',
                        value: account,
                        validation: {
                            required: true,
                        },
                    },
                ]}
                onSubmit={(e) => {
                    const name = String(e.data[0].inputResult);
                    const image = String(e.data[1].inputResult);
                    const symbol = e.data[2].inputResult;
                    const description = e.data[3].inputResult;
                    const to = e.data[4].inputResult;
                    mintNFT({ name, image, symbol, description, to });
                }}
                title="Mint NFT"
            />
        </>
    );
};

export default NFTMinterForm;
