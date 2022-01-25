import {Form, Notification} from "web3uikit";
import React from "react";
import useRegistry from "../Module/contracts/Registry/useRegistry";
import {useMoralis, useMoralisFile} from "react-moralis";
import {useCollection} from '../Module/contracts/NFT/useCollection'

const NFTMinterForm: React.FC = ({ web3, address }) => {

    const { deployErr, isLoading, setLoading } = useRegistry();
    const { mint } = useCollection(web3, address);
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const mintNFT = (e: any) => {
        setLoading(true)
        let metadata = {
            name: e.name,
            image: e.image,
            symbol: e.symbol,
            description: e.description,
        }
        saveFile(
            "metadata.json",
            {base64: btoa(JSON.stringify(metadata))},
            {
                type: "json",
                metadata,
                saveIPFS: true
            }

        ).then(async (file) => {
            const hash = (file as any)["_hash"]
            await mint(e.to, `ipfs://${hash}`, account)
        })
    }

    return (
        <>
            <div style={{position: "absolute", top: 70, right: 1}}>
                <Notification isVisible={deployErr} message={deployErr ? deployErr.message : "" } title={"Error"}/>
            </div>
            <Form
                buttonConfig={{
                    isFullWidth: true,
                    text: "Mint",
                    disabled: isLoading,
                    theme: !isLoading ? "primary" : "secondary"
                }}

                data={[
                    {
                        name: 'Name',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                    {
                        name: 'Image URL',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                    {
                        name: 'Symbol',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                    {
                        name: 'Description',
                        type: 'text',
                        value: '',
                    },
                    {
                        name: 'To Address',
                        type: 'text',
                        value: account,
                        validation: {
                            required: true
                        },
                    },
                ]}
                onSubmit={(e) => {
                    const name = String(e.data[0].inputResult);
                    const image = String(e.data[1].inputResult);
                    const symbol = e.data[2].inputResult;
                    const description = e.data[3].inputResult;
                    const to = e.data[4].inputResult;
                    mintNFT({name,image,symbol,description,to})
                }}
                title="NFT Collection"
            />
        </>
    )
}

export default NFTMinterForm;