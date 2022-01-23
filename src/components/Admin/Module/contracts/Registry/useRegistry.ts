import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { AdminAddress, RegistryAddress } from '../../../index'
import registryInterface from "./interface";

const useRegistry = () => {

    const [ protocolAddress, setProtocolAddress ] = useState<string | null>(null);
    const [ hasProject, setHasProject ] = useState<boolean>(false);
    const [ canSetProject, setCanSetProject ] = useState<boolean>(false);
    const [ isLoading, setLoading ] = useState<boolean>(false);
    const [ deployTx, setDeployTx] = useState();
    const { fetch: getProtocol } = useWeb3ExecuteFunction();
    const { error: deployErr, fetch: deployFetch } = useWeb3ExecuteFunction();
    const { data: forwarder, fetch: fetchForwarder  } = useWeb3ExecuteFunction();
    const { deployProtocolAbi, getProtocolControlAbi, getForwarderAbi } = registryInterface();
    const { provider } = useMoralis()

    useEffect(() => {
        if(provider) {
            getProtocolByUser(AdminAddress)
            getForwarder()
        }
        // eslint-disable-next-line
    }, [provider])

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
                setDeployTx(results)
            },
            onError: () => setLoading(false),
            onComplete: () => console.log('completed deploying')
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
                if(results && !(typeof results === undefined) && (results !== "0x0000000000000000000000000000000000000000")) {
                    /**
                     * user has project @ data
                     */
                    setProtocolAddress(results)
                    setHasProject(true)
                    setLoading(false)
                    console.log(`found protocol`)
                    return;
                } else if(results === "0x0000000000000000000000000000000000000000"){
                    /**
                     * user has no project
                     */
                    setHasProject(false)
                    setCanSetProject(true)
                    setLoading(false)
                    return;
                }
            },
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
        deployTx,
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