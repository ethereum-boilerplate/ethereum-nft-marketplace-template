import { useEffect, useState } from "react";
import {useChain, useMoralis, useMoralisQuery, useNewMoralisObject, useWeb3ExecuteFunction} from "react-moralis";
import { RegistryAddress} from '../../../index'
import registryInterface from "./interface";

const useRegistry = () => {
    const { data, isFetching: isFetchingProject } = useMoralisQuery("Storefront", query => query.limit(1), [], {
        autoFetch: true,
        live: true
    })
    const [ protocolAddress, setProtocolAddress ] = useState<string | null>(null);
    const [ protocolAdmin, setProtocolAdmin ] = useState<string | null>(null)
    const [ hasProject, setHasProject ] = useState<boolean>(false);
    const [ canSetProject, setCanSetProject ] = useState<boolean>(true);
    const [ isLoading, setLoading ] = useState<boolean>(true);
    const [ forwarder, setForwarder ] = useState<string | unknown>();
    const { fetch: getProtocol } = useWeb3ExecuteFunction();
    const { save } = useNewMoralisObject("Storefront")
    const { error: deployErr, fetch: deployFetch } = useWeb3ExecuteFunction();
    const { fetch: fetchForwarder  } = useWeb3ExecuteFunction();
    const { deployProtocolAbi, getProtocolControlAbi, getForwarderAbi } = registryInterface();
    const { account, isAuthenticated, isWeb3Enabled } = useMoralis()
    const { chainId } = useChain()
    const [ projectChain, setProjectChain ] = useState<typeof chainId>()

    useEffect(() => {
        if(isAuthenticated && isWeb3Enabled) {
            const getForwarder = () => {
                fetchForwarder({
                    params: {
                        abi: [
                            getForwarderAbi
                        ],
                        contractAddress: RegistryAddress,
                        functionName: "forwarder",
                    },
                    onSuccess: results => {
                        setForwarder(results)
                        setLoading(false)
                    },
                    onError: error => console.log(error)
                }).then(() => {}).catch(() => setLoading(false))
            }

            getForwarder()
        }
    }, [isAuthenticated, isWeb3Enabled])

    useEffect(() => {
        if(data) {
            if(data.length === 0 ) {
                setCanSetProject(true)
                setHasProject(false)
                setLoading(false)
                return
            }
            setProjectChain(data[0].get('chain'))
            setHasProject(true)
            setCanSetProject(false)
            setProtocolAdmin(data[0].get('admin'))
            setProtocolAddress(data[0].get('protocol'))
        }
        // eslint-disable-next-line
    }, [ data ])

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
                    save({admin: account, uri: uri, protocol: e.logs[0].address, chain: chainId}).then(console.log).catch(console.log).then( () => {
                        setCanSetProject(false)
                        setLoading(false)
                    })
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
            onSuccess: () => {
                setLoading(false);
            },
            onError: error => console.log(error)
        }).then(() => {}).catch(() => setLoading(false))
    }

    return {
        deployProtocol,
        getProtocolByUser,
        protocolAdmin,
        projectChain,
        forwarder,
        isFetchingProject,
        isAuthenticated,
        isWeb3Enabled,
        canSetProject,
        hasProject,
        deployErr,
        protocolAddress,
        isLoading,
        setLoading
    }
}

export default useRegistry;