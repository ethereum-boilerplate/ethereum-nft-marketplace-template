// @ts-nocheck
import { Form } from "web3uikit";
import React from "react";
import {useMoralis, useMoralisFile} from "react-moralis";
import {tokenAbi, tokenBytecode} from "./Factory/token";
import useProtocol from "../Module/contracts/Protocol/useProtocol";

const TokenForm: React.FC = ({ web3 }) => {

    const { protocolAddress, forwarder, addModule } = useProtocol()
    const { account } = useMoralis();
    const { saveFile } = useMoralisFile();

    const deployToken = (e: any) => {
        let metadata = {
            name: e.name,
            symbol: e.symbol,
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
            let code = '0x' + tokenBytecode;
            const contract = new web3.eth.Contract(tokenAbi as any)
            const toDeploy = contract.deploy({data: code, arguments: [protocolAddress, e.name, e.symbol, forwarder, `ipfs://${hash}`]})
            await toDeploy.send({from: account})
                .on('receipt', async (receipt) => {
                    await addModule(0, receipt.contractAddress)

                })
        })
    }

    return (
        <>
            <Form
                buttonConfig={{
                    isFullWidth: true,
                    text: "Deploy Token",
                    theme: "primary"
                }}

                data={[
                    {
                        name: 'Token Name',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    },
                    {
                        name: 'Token Symbol',
                        type: 'text',
                        value: '',
                        validation: {
                            required: true
                        },
                    }
                ]}
                onSubmit={(e) => {
                    const name = String(e.data[0].inputResult);
                    const symbol = e.data[1].inputResult;
                    deployToken({name,symbol})
                }}
                title="ERC20 Token"
            />
        </>
    )
}

export default TokenForm;