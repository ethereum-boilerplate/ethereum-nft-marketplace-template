import { AdminAddress, MasterKey, ProjectChainId, RegistryAddress } from "components/Admin"
import { registryAbi } from "./registry"
import { useState, useEffect } from "react"
import Moralis from "moralis"

export const useRegistry = (web3, isEnabled) => {

    const [ protocolAddress, setProtocolAddress ] = useState(null)
    const [ hasProject, setHasProject ] = useState(false)
    const [ isDeployig, setDeploying ] = useState(false)
    const [ isDeployed, setDeployed ] = useState(false)
    const [ synced, setSynced ] = useState(false)

    const deployProtocol = async (uri, signer) => {
        setDeploying(true)
        const contract = await new web3.eth.Contract(registryAbi, RegistryAddress)
        await contract.methods.deployProtocol(uri).send({from: signer})
        .on('receipt', async () => {
            let addy = await contract.methods.getProtocolControl(AdminAddress, 1).call()
            setProtocolAddress(addy)
            setHasProject(true)
            await runCf(addy)
            setDeploying(false)
            setDeployed(true)
        })
    }

    const runCf = async (addy) => { 
        if(synced || !protocolAddress || !ProjectChainId) return
        Moralis.masterKey = MasterKey
        await Moralis.Cloud.run("watchContractEvent", {
            chainId: ProjectChainId,
            address: addy,
            topic: "ModuleUpdated(bytes32, address)",
            abi: {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "moduleId",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    }
                    ],
                    "name": "ModuleUpdated",
                    "type": "event"
            },
            tableName: "Modules",
            "sync_historical": true
        }, {useMasterKey: true})
        setSynced(true)
    }


    return {
        deployProtocol,
        runCf,
        hasProject,
        isDeployed,
        isDeployig,
    }
}