import {Form, Notification} from "web3uikit";
import React from "react";
import useRegistry from "../Module/contracts/Registry/typescript/useRegistry";
import {useMoralis, useMoralisFile} from "react-moralis";
import {collectionAbi, collectionBytecode} from "../Module/contracts/NFT/collection";
import useProtocol from "../Module/contracts/Protocol/typescript/useProtocol";

const NFTCollectionForm: React.FC = ({ web3 }) => {

    const { deployErr, isLoading, setLoading } = useRegistry();
    const { addModule, protocolAddress, forwarder } = useProtocol();
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const deployNftCollection = (e: any) => {
        setLoading(true)
        let metadata = {
            name: e.name,
            symbol: e.symbol,
            royalty: e.royalties,
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

        ).then(async (e) => {
            const hash = (e as any)["_hash"]
            let code = '0x' + collectionBytecode;
            const contract = new web3.eth.Contract(collectionAbi)
            const toDeploy = contract.deploy({data: code, arguments: [protocolAddress, metadata.name, metadata.symbol, forwarder, `ipfs://${hash}`, metadata.royalty*100]})
            await toDeploy.send({from: account})
                .on('receipt', async (receipt) => {
                    await addModule(2, receipt.contractAddress)
                })
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
                    text: "Deploy",
                    disabled: isLoading,
                    theme: !isLoading ? "primary" : "secondary"
                }}

                data={[
                    {
                        name: 'Collection Name',
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
                        name: 'Royalty',
                        type: 'number',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                ]}
                onSubmit={(e) => {
                    const name = String(e.data[0].inputResult);
                    const symbol = e.data[1].inputResult;
                    const description = e.data[2].inputResult;
                    const royalties = e.data[3].inputResult;
                    console.log(name,symbol,description,royalties)
                    deployNftCollection({name,symbol,description,royalties})
                }}
                title="NFT Collection"
            />
        </>
    )
}

export default NFTCollectionForm;