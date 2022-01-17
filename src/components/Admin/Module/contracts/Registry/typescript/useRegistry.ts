import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { RegistryAddress } from '../../../../index'
import registryInterface from "./interface";
import generateContractOptions from "../../../../helpers";

const useRegistry = () => {

    const [ protocolAddress, setProtocolAddress ] = useState();

    const { data, fetch } = useWeb3ExecuteFunction();
    const { deployProtocolAbi, getProtocolControlAbi } = registryInterface();

    useEffect(() => {
        console.log(data)
    }, [ data ])

    const deployProtocol = (uri: string) => {
        const options = generateContractOptions(deployProtocolAbi, RegistryAddress, "deployProtocol", {
            uri: uri
        })
        fetch(options).then((e) => console.log(e, data))
    }

    const getProtocolByUser = (userAddress: string) => {
        const options = generateContractOptions(getProtocolControlAbi, RegistryAddress, "getProtocolControl",
            {
                _deployer: userAddress,
                index: "1"
            })
        fetch(options).then((e) => console.log(e, data))
    }

    return {
        deployProtocol,
        getProtocolByUser,
        protocolAddress,
    }
}

export default useRegistry;