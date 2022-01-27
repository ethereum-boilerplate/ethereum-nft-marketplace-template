// @ts-nocheck
import { Form } from 'web3uikit';
import React, { useState } from 'react';
import { useMoralis, useMoralisFile } from 'react-moralis';
import { tokenAbi, tokenBytecode } from './Factory/token';
import useProtocol from '../Module/contracts/Protocol/useProtocol';

const stages = {
    default: 'Loading...',
    uploading: 'Uploading Metadata...',
    deploying: 'Deploying Contract...',
    addingModule: 'Adding Module...',
    syncing: 'Syncing Module...',
};

const TokenForm: React.FC = ({ web3 }) => {
    const { protocolAddress, forwarder, addModule } = useProtocol();
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();
    const [stage, setStage] = useState('default');

    const deployToken = (e: any) => {
        setStage('uploading');
        let metadata = {
            name: e.name,
            symbol: e.symbol,
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
            setStage('deploying');
            const hash = (file as any)['_hash'];
            const uri = `ipfs://${hash}`
            let code = '0x' + tokenBytecode;
            const contract = new web3.eth.Contract(tokenAbi as any);
            const toDeploy = contract.deploy({ data: code, arguments: [protocolAddress, e.name, e.symbol, forwarder, uri] });
            await toDeploy.send({ from: account }).on('receipt', async (receipt) => {
                setStage('addingModule');
                await addModule(0, receipt.contractAddress, uri, e.name, false);
            });
        });
    };

    return (
        <>
            <Form
                id={'token-form-id'}
                buttonConfig={{
                    isFullWidth: true,
                    text: 'Deploy Token',
                    theme: 'primary',
                    onClick: () => console.log('submitting ...'),
                    isLoading: stage !== 'default',
                    loadingText: stages[stage],
                }}
                data={[
                    {
                        name: 'Token Name',
                        type: 'text',
                        inputWidth: '100%',
                        value: '',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Token Symbol',
                        type: 'text',
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
                    deployToken({ name, symbol });
                }}
                title="ERC20 Token"
            />
        </>
    );
};

export default TokenForm;
