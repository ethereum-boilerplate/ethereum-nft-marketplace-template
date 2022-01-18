import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { AdminAddress, RegistryAddress } from '../../../../index'
import registryInterface from "./interface";

const useRegistry = () => {

    const [ protocolAddress, setProtocolAddress ] = useState<string | null>(null);
    const [ hasProject, setHasProject ] = useState<boolean>(false);
    const [ isLoading, setLoading ] = useState<boolean>(false);

    const { data, error, fetch } = useWeb3ExecuteFunction();
    const { data: deploy, error: deployErr, fetch: deployFetch } = useWeb3ExecuteFunction();
    const { data: forwarder, fetch: fetchForwarder  } = useWeb3ExecuteFunction();
    const { deployProtocolAbi, getProtocolControlAbi, getForwarderAbi } = registryInterface();
    const { isWeb3Enabled } = useMoralis()

    useEffect(() => {
        if(error) {
            console.log(`could not find protocolAddress: ${error}`)
            setLoading(false)
            return;
        }
        if(data && !(typeof data === undefined) && (data !== "0x0000000000000000000000000000000000000000")) {
            /**
             * user has project @ data
             */
            setProtocolAddress(data)
            setHasProject(true)
            setLoading(false)
            console.log(`protocol found at ${data}`)
            return;
        } else if(data === "0x0000000000000000000000000000000000000000"){
            /**
             * user has no project
             */
            setHasProject(false)
            setLoading(false)
            return;
        }
    }, [ data, error ])

    useEffect(() => {
        if(deploy) {
            console.log(deploy)
            setLoading(false)
        }
        if(deployErr) {
            console.log(deployErr)
            setLoading(false)
        }
    }, [ deploy, deployErr])

    useEffect(() => {
        if(isWeb3Enabled) {
            getProtocolByUser(AdminAddress)
            getForwarder()
        }
    }, [ isWeb3Enabled ])

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
            onSuccess: results => console.log(`success: ${results}`),
            onError: error => console.log(error)
        }).then((e) =>  {}).catch(() => setLoading(false))
    }
    /**
     * gets the contract address of a user
     * returns zero address if there is no project
     * @param userAddress check for specific user
     */
    const getProtocolByUser = (userAddress: string) => {
        setLoading(true);
        fetch({
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
            onSuccess: results => console.log(`success: ${results}`),
            onError: error => console.log(error)
        }).then(() => {}).catch(() => setLoading(false))
    }

    const getForwarder = () => {
        setLoading(true);
        fetchForwarder({
            params: {
                abi: [
                    getForwarderAbi
                ],
                contractAddress: RegistryAddress,
                functionName: "forwarder",
            },
            onSuccess: results => console.log(`success: ${results}`),
            onError: error => console.log(error)
        }).then(() => {}).catch(() => setLoading(false))
    }

    return {
        deployProtocol,
        getProtocolByUser,
        getForwarder,
        forwarder,
        hasProject,
        deployErr,
        protocolAddress,
        isLoading,
        setLoading
    }
}

export default useRegistry;