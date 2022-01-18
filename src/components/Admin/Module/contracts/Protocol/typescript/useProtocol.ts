import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import generateContractOptions from "../../../../helpers";
import protocolInterface from "./interface";
import useRegistry from "../../Registry/typescript/useRegistry";

const useProtocol = () => {
    const [ marketplaceAddress, setMarketplaceAddress ] = useState();
    const [ hasMarketplace, setHasMarketplace ] = useState<boolean>(false);
    const { protocolAddress } = useRegistry();
    const { data, fetch } = useWeb3ExecuteFunction();
    const { data: dataModuleById, fetch: fetchModuleById } = useWeb3ExecuteFunction();
    const { addModuleAbi, getForwarderAbi, getModulesAbi } = protocolInterface();

    useEffect(() => {
        if(protocolAddress) {
            console.log(`getting protocol information at ${protocolAddress}`)
            console.log(`checking for marketplace ...`)
            getModuleById("0x54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f8")
        }
    }, [ protocolAddress ])

    useEffect(() => {
        if(dataModuleById) {
            setMarketplaceAddress(dataModuleById)
            setHasMarketplace(true)
            console.log(`found marketplace at ${dataModuleById}`)
        }
    }, [dataModuleById])

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

    const getModuleById = (moduleId: string) => {
        fetchModuleById({
            params: {
                abi: [ getModulesAbi ],
                contractAddress: protocolAddress,
                functionName: "modules",
                params: {
                    "": moduleId
                }
            }
        }).then(() => {}).catch(() => {})
    }

    return {
        addModule,
        getForwarder,
        getModuleById,
        hasMarketplace,
        marketplaceAddress,
    }
}

export default useProtocol;