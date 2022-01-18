import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import protocolInterface from "./interface";
import useRegistry from "../../Registry/typescript/useRegistry";

const useProtocol = () => {
    const [ marketplaceAddress, setMarketplaceAddress ] = useState();
    const [ hasMarketplace, setHasMarketplace ] = useState<boolean>(false);
    const { protocolAddress, forwarder, canSetProject } = useRegistry();
    const { data: dataAddModule, fetch: fetchAddModule } = useWeb3ExecuteFunction();
    const { data: dataModuleById, fetch: fetchModuleById } = useWeb3ExecuteFunction();
    const { data: dataWithdrawFunds, fetch: fetchWithdrawFunds } = useWeb3ExecuteFunction();
    const { data: dataHasAdminRole, fetch: fetchHasAdminRole } = useWeb3ExecuteFunction();
    const { addModuleAbi, getModulesAbi, withdrawFundsAbi, hasRoleAbi } = protocolInterface();

    useEffect(() => {
        if(protocolAddress) {
            console.log(`getting protocol information at ${protocolAddress}`)
            console.log(`checking for marketplace ...`)
            /**
             * this id stands for the first nft marketplace deployed of every contract.
             * if it returns the zer0 address 0x0...0 that means there is no marketplace deployed
             * otherwise it returns the contract address of the marketplace
             */
            getModuleById("0x54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f8")
        }
    }, [ protocolAddress ])

    useEffect(() => {
        if(dataModuleById) {
            if(dataModuleById === "0x0000000000000000000000000000000000000000") return;
            setMarketplaceAddress(dataModuleById)
            setHasMarketplace(true)
            console.log(`found marketplace at ${dataModuleById}`)
        }
    }, [dataModuleById])

    /**
     * binds deployed contracts to the project.
     * note: contract does not make input validation.
     * @param moduleType equals an index of the type array in src/helpers/module.js
     * @param moduleAddress should be deployed contracts that are not added to project yet
     */
    const addModule = (moduleType: number, moduleAddress: string) => {
        fetchAddModule({
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

    /**
     * check if user has the admin role
     * @param user address to be checked
     */
    const checkIfUserIsAdmin = (user: string) => {
        fetchHasAdminRole({
            params: {
                abi: [ hasRoleAbi ],
                contractAddress: protocolAddress,
                functionName: "hasRole",
                params: {
                    role: "0x0",
                    account: user
                }
            }
        }).then();
    }


    /**
     * gets contract address by id
     * @param moduleId see in src/helpers/modules.js how this is computed
     */
    const getModuleById = (moduleId: string) => {
        fetchModuleById({
            params: {
                abi: [ getModulesAbi ],
                contractAddress: protocolAddress,
                functionName: "modules",
                params: {
                    "": moduleId
                }
            },
            onError: (error) => console.log(`error on getting module by id ${error}`),
            onSuccess: results => console.log(`result of getting module by id ${results}`)
        }).then(() => {}).catch(() => {})
    }

    /**
     * Withdraw royalties. Can only be called by address with admin role.
     * @param to address which receives the funds
     * @param currency contract address of token. if zero address then it withdraws native coin
     */
    const withdrawFunds = async (to: string, currency: string) => {
        fetchWithdrawFunds({
            params: {
                abi: [ withdrawFundsAbi ],
                contractAddress: protocolAddress,
                functionName: "withdrawFunds",
                params: {
                    to: to,
                    currency: currency
                }
            },
            onSuccess: results => console.log(`success: ${results}`),
            onError: error => console.log(error)
        }).then(() => {}).catch(() => {})
    }

    return {
        addModule,
        checkIfUserIsAdmin,
        dataHasAdminRole,
        canSetProject,
        dataModuleById,
        dataWithdrawFunds,
        dataAddModule,
        forwarder,
        protocolAddress,
        getModuleById,
        hasMarketplace,
        marketplaceAddress,
        withdrawFunds
    }
}

export default useProtocol;