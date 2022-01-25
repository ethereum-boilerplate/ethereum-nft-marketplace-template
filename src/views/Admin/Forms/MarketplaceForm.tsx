// @ts-nocheck
import { Form, Notification } from 'web3uikit';
import React from 'react';
import useRegistry from '../Module/contracts/Registry/useRegistry';
import { useMoralis, useMoralisFile } from 'react-moralis';
import useProtocol from '../Module/contracts/Protocol/useProtocol';
import { marketplaceAbi, marketplaceBytecode } from './Factory/marketplace';
import { HeaderStyled } from 'uikit/HeaderStyled';
import { Typography } from 'uikit/Typography';
import { Flex } from 'uikit/Flex/Flex';

const MarketplaceForm: React.FC = ({ web3 }) => {
    const { deployErr, isLoading, setLoading } = useRegistry();
    const { addModule, protocolAddress, forwarder } = useProtocol();
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const deployMarketplace = (e: any) => {
        setLoading(true);
        let metadata = {
            name: e.name,
            symbol: e.symbol,
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
            let code = '0x' + marketplaceBytecode;
            const contract = new web3.eth.Contract(marketplaceAbi as any);
            console.log(protocolAddress, forwarder, `ipfs://${hash}`, metadata.royalty * 100);
            const toDeploy = contract.deploy({
                data: code,
                arguments: [protocolAddress, forwarder, `ipfs://${hash}`, metadata.royalty * 100],
            });
            await toDeploy.send({ from: account }).on('receipt', async (receipt) => {
                await addModule(6, receipt.contractAddress);
            });
        });
    };

    return (
        <>
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
            </div>
            <HeaderStyled>
                <Typography variant="h1">Create NFT Marketplace</Typography>
            </HeaderStyled>
            <Flex background="white" borderRadius="20px" padding="16px">
                <div style={{ padding: '16px' }}>
                    <Typography variant="h4">Add details</Typography>
                    <Typography variant="span">Select Name, Symbol, Description and set Market Fee</Typography>
                </div>
                <Form
                    buttonConfig={{
                        isFullWidth: true,
                        text: 'Deploy',
                        disabled: isLoading,
                        theme: !isLoading ? 'primary' : 'secondary',
                        onClick: () => console.log('lol')
                    }}
                    data={[
                        {
                            name: 'Name',
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
                            name: 'Market Fee',
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
                        const symbol = e.data[1].inputResult;
                        const description = e.data[2].inputResult;
                        const royalties = e.data[3].inputResult;
                        console.log(name, symbol, description, royalties);
                        deployMarketplace({ name, symbol, description, royalties });
                    }}
                    id={"form-marketplace-id"}
                    title={"NFT Marketplace"}/>
            </Flex>
        </>
    );
};

export default MarketplaceForm;
