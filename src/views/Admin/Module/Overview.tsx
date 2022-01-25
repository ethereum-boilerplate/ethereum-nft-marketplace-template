// @ts-nocheck
import { useState, useEffect } from 'react';
import {
    useMoralisQuery,
    useMoralis,
    useWeb3ExecuteFunction,
} from 'react-moralis';
import { getEllipsisTxt } from '../../../helpers/formatters';
import { getModuleColor, getModuleType } from '../../../helpers/modules';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownElement,
    Icon,
    LinkTo,
    Table,
    Tag,
    Modal,
} from 'web3uikit';
import Marketplace from '../components/NFT/Marketplace';
import Token from '../components/Token';
import { CollectionList } from '../components/NFT/CollectionList';
import { getExplorer } from '../../../helpers/networks';
import Moralis from 'moralis';
import { MasterKey, ProjectChainId } from '../index';

export default function Overview({ protocolAddress, web3 }) {
    const [modules, setModules] = useState([]);
    const [limit] = useState(100);
    // Get installed modules
    const { data } = useMoralisQuery(
        'Modules',
        (query) => query.limit(limit),
        [limit],
        { live: true }
    );
    const { chainId } = useMoralis();
    const [selectedModule, setSelectedModule] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const { fetch: fetchWeb3 } = useWeb3ExecuteFunction();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(true);
            setModules([]);
            setTableData([]);
            data.forEach(async (mod, index) => {
                await fetchWeb3({
                    params: {
                        abi: [
                            {
                                inputs: [],
                                name: '_contractURI',
                                outputs: [
                                    {
                                        internalType: 'string',
                                        name: '',
                                        type: 'string',
                                    },
                                ],
                                stateMutability: 'view',
                                type: 'function',
                            },
                        ],
                        functionName: '_contractURI',
                        contractAddress: mod.get('module'),
                    },
                    onSuccess: async (results) => {
                        let metadata = {
                            name: '',
                            description: '',
                        };
                        const url = `https://ipfs.io/ipfs/${
                            (results as any).split('ipfs://')[1]
                        }`;
                        try {
                            const x = await fetch(url);
                            const y = await x.json();
                            metadata.name = y.name;
                        } catch (e) {
                            console.log(e);
                        }

                        let typeText = getModuleType(
                            mod.get('moduleId'),
                            data.length
                        );

                        setModules((prevState) =>
                            [...prevState] !== []
                                ? [
                                      ...prevState,
                                      {
                                          type: typeText,
                                          module: mod.get('module'),
                                          key: mod.get('module'),
                                          metadata,
                                      },
                                  ]
                                : [
                                      {
                                          type: typeText,
                                          module: mod.get('module'),
                                          key: mod.get('module'),
                                          metadata,
                                      },
                                  ]
                        );
                        setTableData((prevState) =>
                            [...prevState] !== []
                                ? [
                                      ...prevState,
                                      rowData(metadata, typeText, mod),
                                  ]
                                : [rowData(metadata, typeText, mod)]
                        );
                    },
                });
                if (index === modules.length - 1) {
                    setLoading(false);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const rowData = (metadata, typeText, mod) => [
        <Avatar key={1} theme="letters" text={metadata.name} />,
        <span>{metadata.name}</span>,
        <Tag key={2} color={getModuleColor(typeText)} text={typeText} />,
        <LinkTo
            key={3}
            text={getEllipsisTxt(mod.get('module'), 4)}
            address={`${getExplorer(chainId)}address/${mod.get('module')}`}
        />,
        <div style={{ display: 'grid', placeItems: 'center' }}>
            <Dropdown
                key={34}
                onClick={() => {}}
                parent={
                    <Icon key="3" fill="#2E7DAF" size={20} svg="more vert" />
                }
                position="top"
                children={[
                    <DropdownElement
                        backgroundColor="transparent"
                        icon="testnet"
                        iconSize={12}
                        onClick={() => {
                            setSelectedModule({
                                type: typeText,
                                module: mod.get('module'),
                                key: mod.get('module'),
                                metadata,
                            });
                            setShowModal(true);
                        }}
                        text="Manage"
                        textColor="#FFFFFF"
                        key={14}
                    />,
                ]}
            />
        </div>,
    ];

    const printModuleInModal = (type, selectedModule) => {
        if (type === 'NFT Marketplace') {
            return <Marketplace web3={web3} address={selectedModule.module} />;
        }
        if (type === 'NFT Collection') {
            return (
                <CollectionList web3={web3} address={selectedModule.module} />
            );
        }
        if (type === 'Token') {
            return <Token web3={web3} address={selectedModule.module} />;
        }
    };

    const runCf = async () => {
        if (!protocolAddress || !ProjectChainId) return;
        Moralis.masterKey = MasterKey;
        const options = { tableName: 'Modules' };
        await Moralis.Cloud.run('unwatchContractEvent', options, {
            useMasterKey: true,
        });
        await Moralis.Cloud.run(
            'watchContractEvent',
            {
                chainId: ProjectChainId,
                address: protocolAddress,
                topic: 'ModuleUpdated(bytes32, address)',
                abi: {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'bytes32',
                            name: 'moduleId',
                            type: 'bytes32',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'module',
                            type: 'address',
                        },
                    ],
                    name: 'ModuleUpdated',
                    type: 'event',
                },
                tableName: 'Modules',
                sync_historical: true,
            },
            { useMasterKey: true }
        );
    };

    return (
        <>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={tableData}
                header={[
                    '',
                    <span>Name</span>,
                    <span>Type</span>,
                    <span>Module</span>,
                    '',
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                pageSize={5}
                customNoDataText={
                    <div
                        style={{
                            display: 'grid',
                            placeItems: 'center',
                            width: '30vw',
                            textAlign: 'center',
                        }}
                    >
                        <>It looks like there is no data</>
                        <span>
                            If you think this is an error click to force re-sync
                        </span>
                        <Button
                            onClick={() => runCf()}
                            theme={'primary'}
                            text={'Force Sync'}
                        />
                    </div>
                }
            />
            <Modal
                cancelText="Close"
                id="disabled"
                isOkDisabled
                isVisible={showModal}
                okText="Ok"
                onCancel={() => setShowModal(false)}
                onOk={function noRefCheck() {}}
                title={`${getEllipsisTxt(selectedModule?.module)} ${
                    selectedModule?.type
                }`}
            >
                {selectedModule &&
                    printModuleInModal(selectedModule?.type, selectedModule)}
            </Modal>
        </>
    );
}
