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
        console.log(data)
    }, [ data ])

    const addModule = (moduleType: number, moduleAddress: string) => {
        const options =
            generateContractOptions(
                addModuleAbi,
                protocolAddress,
                "addModule",
                {_newModuleAddress: moduleAddress, _moduleType: moduleType}
            );
        fetch(options).then((e) => console.log(e));
    }

    const getForwarder = () => {
        const options =
            generateContractOptions(
                getForwarderAbi,
                protocolAddress,
                "getForwarder",
                {}
            );
        fetch(options).then((e) => console.log(e));
    }

    return {
        addModule,
        getForwarder,
        marketplaceAddress,
    }
}

export default useProtocol;