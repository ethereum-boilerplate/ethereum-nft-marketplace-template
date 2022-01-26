// @ts-nocheck
import React from 'react';
import { Form, Notification } from 'web3uikit';

import { useMoralisFile } from 'react-moralis';
import useRegistry from '../Module/contracts/Registry/useRegistry';

const ProjectForm: React.FC = () => {
    const { saveFile } = useMoralisFile();
    const { deployProtocol, isLoading, deployErr } = useRegistry();

    const deploy = (name: string, description: string, masterKey: string) => {
        let metadata = {
            name: name,
            description: description,
        };
        saveFile(
            'metadata.json',
            { base64: btoa(unescape(encodeURIComponent(JSON.stringify(metadata)))) },
            {
                type: 'json',
                metadata,
                saveIPFS: true,
            }
        ).then((e) => {
            const hash = (e as any)['_hash'];
            deployProtocol(`ipfs://${hash}`, masterKey);
        });
    };
    
    return (
        <div style={{ width: '70vw' }}>
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
            </div>
            <Form
                buttonConfig={{
                    isFullWidth: true,
                    text: 'Deploy',
                    theme: 'primary',
                    onClick: () => console.log('submitting ...'),
                    isLoading: isLoading,
                }}
                data={[
                    {
                        name: 'Project Name',
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
                        name: 'Moralis MasterKey',
                        type: 'password',
                        value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                ]}
                onSubmit={(e) => {
                    deploy(e.data[0].inputResult, e.data[1].inputResult, e.data[2].inputResult);
                }}
                title="Deploy Project"
                id={'id'}
            />
        </div>
    );
};

export default ProjectForm;
