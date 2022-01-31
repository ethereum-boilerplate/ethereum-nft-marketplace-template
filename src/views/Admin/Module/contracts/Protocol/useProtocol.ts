import { useEffect, useState } from 'react';
import { useNewMoralisObject, useWeb3ExecuteFunction } from 'react-moralis';
import protocolInterface from './interface';
import useRegistry from '../Registry/useRegistry';
import { useHistory } from 'react-router-dom';
import { types } from '../../../../../helpers/modules';

const useProtocol = () => {
    const [marketplaceAddress, setMarketplaceAddress] = useState('');
    const [hasMarketplace, setHasMarketplace] = useState<boolean>(false);
    const {
        protocolAddress,
        forwarder,
        canSetProject,
        isLoading,
        protocolAdmin: AdminAddress,
        projectChain,
        isFetchingProject: isFetching,
        isWeb3Enabled,
        isAuthenticated,
    } = useRegistry();
    const { fetch: fetchAddModule } = useWeb3ExecuteFunction();
    const { save } = useNewMoralisObject('InstalledModules');
    const { data: dataModuleById, fetch: fetchModuleById } = useWeb3ExecuteFunction();
    const { data: dataWithdrawFunds, fetch: fetchWithdrawFunds } = useWeb3ExecuteFunction();
    const { data: dataHasAdminRole, fetch: fetchHasAdminRole } = useWeb3ExecuteFunction();
    const [isAddingModule, setIsAddingModule] = useState<boolean>(false);
    const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
    const { addModuleAbi, getModulesAbi, withdrawFundsAbi, hasRoleAbi } = protocolInterface();
    const history = useHistory();

    useEffect(() => {
        if (protocolAddress && isWeb3Enabled && isAuthenticated) {
            /**
             * this id stands for the first nft marketplace deployed of every contract.
             * if it returns the zer0 address 0x0...0 that means there is no marketplace deployed
             * otherwise it returns the contract address of the marketplace
             */
            getModuleById('0x54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f8');
        }
        // eslint-disable-next-line
    }, [protocolAddress, isWeb3Enabled, isAuthenticated]);

    /**
     * binds deployed contracts to the project.
     * note: contract does not make input validation.
     * @param moduleType equals an index of the type array in src/helpers/module.js
     * @param moduleAddress should be deployed contracts that are not added to project yet
     * @param uri ipfs link to module metadata
     * @param name set name of project
     * @param isTryingAgain set state so there are no duplicate rows in db
     */
    const addModule = async (moduleType: number, moduleAddress: string, uri: string, name: string, isTryingAgain = false) => {
        setIsAddingModule(true);
        await fetchAddModule({
            params: {
                abi: [addModuleAbi],
                contractAddress: protocolAddress,
                functionName: 'addModule',
                params: {
                    _newModuleAddress: moduleAddress,
                    _moduleType: moduleType,
                },
            },
            onSuccess: (tx) => {
                console.log('tx', tx);
                if (!isTryingAgain) save({ module: moduleAddress, type: types[moduleType], uri, name });
                (tx as any)
                    .wait()
                    .then(() => {
                        setIsAddingModule(false);
                        history.push('/admin');
                    })
                    .catch(() => {
                        addModule(moduleType, moduleAddress, uri, name, true);
                    });
            },
            onError: () => setIsAddingModule(false),
        });
    };

    /**
     * check if user has the admin role
     * @param user address to be checked
     */
    const checkIfUserIsAdmin = (user: string) => {
        fetchHasAdminRole({
            params: {
                abi: [hasRoleAbi],
                contractAddress: protocolAddress,
                functionName: 'hasRole',
                params: {
                    role: '0x0',
                    account: user,
                },
            },
        }).then();
    };

    /**
     * gets contract address by id
     * @param moduleId see in src/helpers/modules.js how this is computed
     */
    const getModuleById = (moduleId: string) => {
        fetchModuleById({
            params: {
                abi: [getModulesAbi],
                contractAddress: protocolAddress,
                functionName: 'modules',
                params: {
                    '': moduleId,
                },
            },
            onError: (error) => console.log(`error on getting module by id ${error}`),
            onSuccess: (results: any) => {
                if (moduleId === '0x54cdd369e4e8a8515e52ca72ec816c2101831ad1f18bf44102ed171459c9b4f8') {
                    if (results === '0x0000000000000000000000000000000000000000') {
                        console.log('no marketplace found');
                        return;
                    }
                    setMarketplaceAddress(results);
                    setHasMarketplace(true);
                    return;
                } else {
                    /**
                     * TODO
                     * check if there is a token deployed.
                     * If yes make global state to access token information
                     */
                }
            },
        })
            .then(() => {})
            .catch(() => {});
    };

    /**
     * Withdraw royalties. Can only be called by address with admin role.
     * @param to address which receives the funds
     * @param currency contract address of token. if zero address then it withdraws native coin
     */
    const withdrawFunds = async (to: string, currency: string) => {
        fetchWithdrawFunds({
            params: {
                abi: [withdrawFundsAbi],
                contractAddress: protocolAddress,
                functionName: 'withdrawFunds',
                params: {
                    to: to,
                    currency: currency,
                },
            },
            onSuccess: (tx) => {
                setIsWithdrawing(true);
                (tx as any).wait().then(() => {
                    setIsWithdrawing(false);
                });
            },
            onError: (error) => {
                setIsWithdrawing(false);
                console.log(error);
            },
        })
            .then(() => {})
            .catch(() => {});
    };

    return {
        addModule,
        isAddingModule,
        checkIfUserIsAdmin,
        dataHasAdminRole,
        projectChain,
        canSetProject,
        dataModuleById,
        isFetching,
        isLoading,
        AdminAddress,
        dataWithdrawFunds,
        forwarder,
        protocolAddress,
        getModuleById,
        isWithdrawing,
        hasMarketplace,
        setIsWithdrawing,
        marketplaceAddress,
        withdrawFunds,
    };
};

export default useProtocol;
