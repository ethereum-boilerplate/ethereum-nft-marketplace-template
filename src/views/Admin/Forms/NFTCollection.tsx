// @ts-nocheck
import { Form, Notification } from 'web3uikit';
import React from 'react';
import useRegistry from '../Module/contracts/Registry/useRegistry';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { collectionAbi, collectionBytecode } from './Factory/collection';
import useProtocol from '../Module/contracts/Protocol/useProtocol';
import { HeaderStyled } from 'uikit/HeaderStyled';
import { Typography } from 'uikit/Typography';
import { Flex } from 'uikit/Flex/Flex';

const NFTCollectionForm: React.FC = ({ web3 }) => {
    const { deployErr, isLoading, setLoading } = useRegistry();
    const { addModule, protocolAddress, forwarder } = useProtocol();
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const deployNftCollection = (e: any) => {
        setLoading(true);
        let metadata = {
            name: e.name,
            symbol: e.symbol,
            image: e.image,
            royalty: e.royalties,
            description: e.description,
        };
        saveFile(
            'metadata.json',
            { base64: btoa(JSON.stringify(metadata)) },
            {
                type: 'json',
                metadata,
                saveIPFS: true,
            }
        ).then(async (e) => {
            const hash = (e as any)['_hash'];
            let code = '0x' + collectionBytecode;
            const contract = new web3.eth.Contract(collectionAbi as any);
            const toDeploy = contract.deploy({
                data: code,
                arguments: [protocolAddress, metadata.name, metadata.symbol, forwarder, `ipfs://${hash}`, metadata.royalty * 100],
            });
            await toDeploy.send({ from: account }).on('receipt', async (receipt) => {
                await addModule(2, receipt.contractAddress);
            });
        });
    };

    return (
        <>
            <HeaderStyled>
                <Typography variant="h1">Create NFT Marketplace</Typography>
            </HeaderStyled>
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
            </div>
            <Flex background="white" borderRadius="20px" padding="16px">
                <div style={{ padding: '16px' }}>
                    <Typography variant="h4">Image, Video, Audio, or 3D Model</Typography>
                    <Typography variant="span">
                        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. <br />
                        Max size: 100 MB
                    </Typography>
                </div>
                <Form
                    buttonConfig={{
                        isFullWidth: true,
                        text: 'Deploy',
                        disabled: isLoading,
                        theme: !isLoading ? 'primary' : 'secondary',
                    }}
                    data={[
                        {
                            name: 'Collection Name',
                            type: 'text',
                            inputWidth: '100%',
                            value: '',
                            validation: {
                                required: true,
                            },
                        },
                        {
                            name: 'Image URL',
                            type: 'text',
                            inputWidth: '100%',
                            value: '',
                            validation: {
                                required: true,
                            },
                        },
                        {
                            name: 'Symbol',
                            type: 'text',
                            inputWidth: '100%',
                            value: '',
                            validation: {
                                required: true,
                            },
                        },
                        {
                            name: 'Description',
                            type: 'text',
                            inputWidth: '100%',
                            value: '',
                        },
                        {
                            name: 'Royalty',
                            type: 'number',
                            inputWidth: '100%',
                            value: '',
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
                        const royalties = e.data[4].inputResult;
                        console.log(name, symbol, description, royalties);
                        deployNftCollection({ name, image, symbol, description, royalties });
                    }}
                    // title="Create NFT Collection"
                />
            </Flex>
        </>
    );
};

export default NFTCollectionForm;
