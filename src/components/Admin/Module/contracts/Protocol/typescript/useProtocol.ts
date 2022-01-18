import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import generateContractOptions from "../../../../helpers";
import protocolInterface from "./interface";
import useRegistry from "../../Registry/typescript/useRegistry";

const useProtocol = () => {
    const [ marketplaceAddress, setMarketplaceAddress ] = useState();
    const { protocolAddress } = useRegistry();
    const { data, fetch } = useWeb3ExecuteFunction();
    const { addModuleAbi, getForwarderAbi } = protocolInterface();

    useEffect(() => {
        if(protocolAddress) {
            console.log(`getting protocol information at ${protocolAddress}`)
        }
    }, [ protocolAddress ])

    const addModule = (moduleType: number, moduleAddress: string) => {
        fetch({
            params: {
                abi: [ addModuleAbi ],
                contractAddress: protocolAddress,
                functionName: "addModule",
                params: {
                    _newModuleAddress: moduleAddress,
                    _moduleType: moduleType
                }
            }
        }).then((e) => console.log(e));
    }

    const getForwarder = () => {
        const params =
            generateContractOptions(
                getForwarderAbi,
                protocolAddress,
                "getForwarder",
                {}
            );
        fetch({params}).then((e) => console.log(e));
    }

    return {
        addModule,
        getForwarder,
        marketplaceAddress,
    }
}

export default useProtocol;