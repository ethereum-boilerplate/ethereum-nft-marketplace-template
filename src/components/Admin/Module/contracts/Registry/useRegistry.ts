import { useEffect, useState } from "react";
import {useMoralis, useMoralisQuery, useNewMoralisObject, useWeb3ExecuteFunction} from "react-moralis";
import {MasterKey, ProjectChainId, RegistryAddress} from '../../../index'
import registryInterface from "./interface";
import Moralis from "moralis";

const useRegistry = () => {
    const { data } = useMoralisQuery("Storefront", query => query.limit(2), [], {
        autoFetch: true
    })
    const [ protocolAddress, setProtocolAddress ] = useState<string | null>(null);
    const [ protocolAdmin, setProtocolAdmin ] = useState<string | null>(null)
    const [ hasProject, setHasProject ] = useState<boolean>(false);
    const [ canSetProject, setCanSetProject ] = useState<boolean>(false);
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const { fetch: getProtocol } = useWeb3ExecuteFunction();
    const { save } = useNewMoralisObject("Storefront")
    const { error: deployErr, fetch: deployFetch } = useWeb3ExecuteFunction();
    const { data: forwarder, fetch: fetchForwarder  } = useWeb3ExecuteFunction();
    const { deployProtocolAbi, getProtocolControlAbi, getForwarderAbi } = registryInterface();
    const { account, provider } = useMoralis()

    useEffect(() => {
        if(provider) {
            console.log('acc:', account)
            getProtocolByUser(account)
            getForwarder()
        }
        // eslint-disable-next-line
    }, [provider])

    useEffect(() => {
        if(data) {
            if(data.length === 0 ) {
                setCanSetProject(true)
                setHasProject(false)
                return
            }
            console.log(`Project Admin = ${data[0].get('admin')}`)
            console.log(`Project Metadata = ${data[0].get('uri')}`)
            console.log(`Project Address = ${data[0].get('protocol')}`)
            setCanSetProject(false)
            setHasProject(true)
            setProtocolAdmin(data[0].get('admin'))
            setProtocolAddress(data[0].get('protocol'))
            setLoading(false)
        }
    }, [ data ])


    const runCf = async () => {
        if(!protocolAddress || !ProjectChainId) return
        Moralis.masterKey = MasterKey
        const options = {"tableName": "Modules"}
        await Moralis.Cloud.run("unwatchContractEvent", options, {useMasterKey:true});
        await Moralis.Cloud.run("watchContractEvent", {
            chainId: ProjectChainId,
            address: protocolAddress,
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
    }

    /**
     * Deploys the project contract from registry.
     * note: Users should only deploy one project with one address. The App only checks for the first project
     * @param uri link to metadata of the project
     */
    const deployProtocol = (uri: string) => {
        setLoading(true)
        deployFetch({
            params: {
                abi: [
                    deployProtocolAbi
                ],
                contractAddress: RegistryAddress,
                functionName: "deployProtocol",
                params: {
                    uri: uri
                }
            },
            onSuccess: results => {
                (results as any).wait().then((e) => {
                    save({admin: account, uri: uri, protocol: e.logs[0].address}).then(console.log).catch(console.log);
                    runCf().then(console.log)
                })
            },
            onError: () => setLoading(false),
            onComplete: () => console.log('deploying ...')
        }).then(() =>  {}).catch(() => setLoading(false))
    }
    /**
     * gets the contract address of a user
     * returns zero address if there is no project
     * @param userAddress check for specific user
     */
    const getProtocolByUser = (userAddress: string) => {
        setLoading(true);
        getProtocol({
            params: {
                abi: [
                    getProtocolControlAbi
                ],
                contractAddress: RegistryAddress,
                functionName: "getProtocolControl",
                params: {
                    _deployer: userAddress,
                    index: "1"
                }
            },
            onSuccess: results => {
                setLoading(false);
            },
            onError: error => console.log(error)
        }).then(() => {}).catch(() => setLoading(false))
    }

    const getForwarder = () => {
        fetchForwarder({
            params: {
                abi: [
                    getForwarderAbi
                ],
                contractAddress: RegistryAddress,
                functionName: "forwarder",
            },
            onSuccess: results => console.log(`forwarder: ${results}`),
            onError: error => console.log(error)
        }).then(() => {}).catch(() => setLoading(false))
    }

    return {
        deployProtocol,
        getProtocolByUser,
        getForwarder,
        protocolAdmin,
        forwarder,
        canSetProject,
        hasProject,
        deployErr,
        protocolAddress,
        isLoading,
        setLoading
    }
}

export default useRegistry;