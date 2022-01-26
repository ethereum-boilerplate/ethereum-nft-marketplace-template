// @ts-nocheck
import { Form, Notification } from 'web3uikit';
import React, { useState } from 'react';
import useRegistry from '../../Module/contracts/Registry/useRegistry';
import { useChain, useMoralis, useMoralisFile, useMoralisWeb3Api } from 'react-moralis';
import { collectionAbi, collectionBytecode } from '../Factory/collection';
import useProtocol from '../../Module/contracts/Protocol/useProtocol';
import { HeaderStyled } from 'uikit/HeaderStyled';
import { Typography } from 'uikit/Typography';
import { Flex } from 'uikit/Flex/Flex';
import { formconfig, stages } from './config';
import { useHistory } from 'react-router';

interface INFTCollectionForm {
    web3?: any;
}
const NFTCollectionForm: React.FC<INFTCollectionForm> = ({ web3 }) => {
    const { deployErr } = useRegistry();
    const { addModule, protocolAddress, forwarder, isAddingModule } = useProtocol();
    const { token } = useMoralisWeb3Api();
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();
    const { chainId } = useChain();
    const [stage, setStage] = useState('default');
    const { push: pushToHistory } = useHistory();

    const uploadNFTCollection = (e: any) => {
        setStage('uploading');
        let metadata = {
            name: e.name,
            symbol: e.symbol,
            image: e.image,
            royalty: e.royalties,
            description: e.description,
        };
        saveFile(
            'metadata.json',
            { base64: btoa(unescape(encodeURIComponent(JSON.stringify(metadata)))) },
            {
                type: 'json',
                metadata,
                saveIPFS: true,
                onSuccess: (e) => deployNFTCollection(e, metadata),
            }
        );
    };

    const deployNFTCollection = async (e, metadata) => {
        setStage('deploying');
        const hash = (e as any)['_hash'];
        let code = '0x' + collectionBytecode;
        const contract = new web3.eth.Contract(collectionAbi as any);
        const toDeploy = contract.deploy({
            data: code,
            arguments: [protocolAddress, metadata.name, metadata.symbol, forwarder, `ipfs://${hash}`, metadata.royalty * 100],
        });
        await toDeploy
            .send({ from: account })
            .on('receipt', (receipt) => syncNFTContract(receipt))
            .on('error', (e) => {
                console.error(e);
                setLoading(false);
            });
    };

    const syncNFTContract = async (receipt) => {
        setStage('syncing');
        await token.syncNFTContract({
            address: receipt.contractAddress,
            chain: chainId as any,
        });
        setStage('isAddingModule');
        addModule(2, receipt.contractAddress);
        pushToHistory('/admin');
    };

    const onSubmit = ({ data }) => {
        const nftCollectionInfo = {
            description: data[3].inputResult,
            image: String(data[1].inputResult),
            name: String(data[0].inputResult),
            royalties: data[4].inputResult,
            symbol: data[2].inputResult,
        };
        console.log('nftCollectionInfo: ', nftCollectionInfo);
        uploadNFTCollection(nftCollectionInfo);
    };

    return (
        <>
            <HeaderStyled>
                <Typography variant="h1">Create NFT Collection</Typography>
            </HeaderStyled>
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={!!deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
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
                        disabled: isAddingModule,
                        isFullWidth: true,
                        isLoading: isAddingModule,
                        onClick: () => console.log(),
                        text: 'Deploy',
                        theme: 'primary',
                        type: 'button',
                        loadingText: stages[stage],
                    }}
                    data={formconfig}
                    onSubmit={onSubmit}
                    id={'s'}
                    title={''}
                />
            </Flex>
        </>
    );
};

export default NFTCollectionForm;
