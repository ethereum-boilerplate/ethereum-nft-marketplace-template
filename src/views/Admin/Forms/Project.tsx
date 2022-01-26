// @ts-nocheck
import React from 'react';
import { Form, Notification } from 'web3uikit';

import { useMoralisFile } from 'react-moralis';

const ProjectForm: React.FC = ({ deployProtocol, deployErr, setLoading, isLoading }) => {
    const { saveFile } = useMoralisFile();

    const deploy = (name: string, description: string, masterKey: string) => {
        setLoading(true);
        let metadata = {
            name: name,
            description: description,
        };
        saveFile(
            'metadata.json',
            { base64: btoa(JSON.stringify(metadata)) },
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
        <>
            <div style={{ position: 'absolute', top: 70, right: 1 }}>
                <Notification isVisible={deployErr} message={deployErr ? deployErr.message : ''} title={'Error'} />
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
                        name: 'Project Name',
                        type: 'text',
                        // value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Description',
                        type: 'text',
                        // value: '',
                        inputWidth: '100%',
                        validation: {
                            required: true,
                        },
                    },
                    {
                        name: 'Moralis MasterKey',
                        type: 'text',
                        // value: '',
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
            />
        </>
    );
};

export default ProjectForm;
