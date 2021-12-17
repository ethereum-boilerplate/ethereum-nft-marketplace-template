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
    useEffect(() => {
        if(web3 && isEnabled && registryAbi && RegistryAddress) {
            getProtocol()
            runCf(protocolAddress)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, isEnabled, registryAbi, RegistryAddress])

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
            tableName: "ModuleSync",
            "sync_historical": true
        }, {useMasterKey: true})
        setSynced(true)
    }

    const getProtocol = async () => {
        const contract = new web3.eth.Contract(registryAbi, RegistryAddress)
        await contract.methods.getProtocolControl(AdminAddress, 1).call().then((res) => {
            if(res === "0x0000000000000000000000000000000000000000") {
                setHasProject(false)
            } else {
                setHasProject(true)
                setProtocolAddress(res)
            }
        }).catch(() => console.log('err'))
    }

    return {
        deployProtocol,
        runCf,
        hasProject,
        isDeployed,
        isDeployig,
        protocolAddress
    }
}