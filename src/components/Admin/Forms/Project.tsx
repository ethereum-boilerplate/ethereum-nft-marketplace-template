import React from "react";
import {Form} from "web3uikit";
import Moralis from "moralis";
import useRegistry from "../Module/contracts/Registry/typescript/useRegistry";

import {useMoralisFile} from "react-moralis";

interface ProjectFormProps {
    id?: string
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    id = String(Date.now())
}: ProjectFormProps) => {
    
    const { deployProtocol } = useRegistry();
    const { saveFile } = useMoralisFile();


    const deploy = (name: string, description: string) => {
        let metadata = {
            name: name,
            description: description
        }
        saveFile(
            "metadata.json",
            {base64: btoa(JSON.stringify(metadata))},
            {
                type: "json",
                metadata,
                saveIPFS: true
            }

        ).then((e) => {
            const hash = (e as any)["_hash"]
            deployProtocol(`ipfs://${hash}`)
        })

    }
    
    return (
            <Form
                data={[
                    {
                        name: 'name',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                    {
                        name: 'description',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                ]}
                id={id}
                onSubmit={(e) => {
                    deploy(e.data[0].inputResult, e.data[1].inputResult)
                    console.log(e.data[0].inputResult)
                }}
                title="Deploy Project"
            />
    )
}

export default ProjectForm;