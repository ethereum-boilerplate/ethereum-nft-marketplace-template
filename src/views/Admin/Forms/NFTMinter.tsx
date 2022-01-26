// @ts-nocheck
import { Form, Notification } from 'web3uikit';
import React from 'react';
import useRegistry from '../Module/contracts/Registry/useRegistry';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { useCollection } from '../Module/contracts/NFT/useCollection';
import Web3 from 'web3';

interface INFTMinterForm {
    address?: string;
    web3: typeof Web3;
}

const NFTMinterForm: React.FC<INFTMinterForm> = ({ web3, address }) => {
    const { deployErr, isLoading, setLoading } = useRegistry();
    const { mint } = useCollection(web3, address);
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const mintNFT = (e: any) => {
        setLoading(true);
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
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={!!deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
            </div>
            <Form
                id={'form-mint-nft'}
                buttonConfig={{
                    isFullWidth: true,
                    text: 'Mint',
                    disabled: isLoading,
                    theme: !isLoading ? 'primary' : 'secondary',
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
