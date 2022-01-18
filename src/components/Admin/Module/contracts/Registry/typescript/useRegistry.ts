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
    const { deployProtocolAbi, getProtocolControlAbi } = registryInterface();
    const { isWeb3Enabled } = useMoralis()

    useEffect(() => {
        if(error) {
            console.log(`could not find protocolAddress: ${error}`)
        }
        if(data && !(typeof data === undefined) && (data !== "0x0000000000000000000000000000000000000000")) {
            setProtocolAddress(data)
            setHasProject(true)
            console.log(`protocol found at ${data}`)
        }
    }, [ data, error ])

    useEffect(() => {
        if(deploy) {
            console.log(deploy)
        }
        if(deployErr) {
            console.log(deployErr)
        }
    }, [ deploy, deployErr])

    useEffect(() => {
        if(isWeb3Enabled) {
            getProtocolByUser(AdminAddress)
        }
    }, [ isWeb3Enabled ])

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
            }
        }).then((e) => setLoading(false)).catch(() => setLoading(false))
    }

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
            }
        }).then(() => setLoading(false)).catch(() => setLoading(false))
    }

    return {
        deployProtocol,
        getProtocolByUser,
        hasProject,
        protocolAddress,
        isLoading,
    }
}

export default useRegistry;