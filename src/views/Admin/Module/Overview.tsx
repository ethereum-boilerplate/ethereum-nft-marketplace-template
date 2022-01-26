// @ts-nocheck
import React, { useState, useEffect } from 'react';
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
    Modal, Input, Illustration,
} from 'web3uikit';
import Marketplace from '../components/NFT/Marketplace';
import Token from '../components/Token';
import { CollectionList } from '../components/NFT/CollectionList';
import { getExplorer } from '../../../helpers/networks';
import Moralis from 'moralis';

export default function Overview({ protocolAddress, web3 }) {
    // Get installed modules
    const { data } = useMoralisQuery(
        'Modules',
        (query) => query.limit(100),
        [],
        { live: true }
    );
    const { chainId } = useMoralis();
    const [selectedModule, setSelectedModule] = useState(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [masterKey, setMasterKey ] = useState<string>("")
    const { fetch: fetchWeb3 } = useWeb3ExecuteFunction();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setLoading(true);
            setTableData([]);
            data.forEach((mod, index) => {
                fetchWeb3({
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

                        setTableData((prevState) =>
                            [...prevState] !== []
                                ? [
                                      ...prevState,
                                      rowData(metadata, typeText, mod),
                                  ]
                                : [rowData(metadata, typeText, mod)]
                        );
                    },
                }).then();
                if (index === data.length - 1) {
                    console.log('trigger')
                    setLoading(false);
                }
            });
        } else {
            setLoading(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const rowData = (metadata, typeText, mod) => [
        <Avatar isRounded={true} key={1} theme="letters" text={metadata.name} />,
        <span style={{fontSize: "16px", color: "#041836"}}>{metadata.name}</span>,
        <Tag key={2} color={getModuleColor(typeText)} text={typeText} />,
        <LinkTo
            key={3}
            text={getEllipsisTxt(mod.get('module'), 4)}
            address={`${getExplorer(chainId)}address/${mod.get('module')}`}
            type={"external"}
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

    const runCf = async (masterKey: string) => {
        if (!protocolAddress || !chainId) return;
        Moralis.masterKey = masterKey;
        const options = { tableName: 'Modules' };
        await Moralis.Cloud.run('unwatchContractEvent', options, {
            useMasterKey: true,
        });
        await Moralis.Cloud.run(
            'watchContractEvent',
            {
                ["chainId" as any]: chainId,
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
                    <div style={columnNameStyle}>
                        <span>Name</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Type</span>
                    </div>,
                    <div style={columnNameStyle}>
                        <span>Module</span>
                    </div>,
                    '',
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                pageSize={5}
                customNoDataComponent={
                     !isLoading ? <div
                    style={{
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    gap: "25px"
                }}
                    >
                    <Illustration logo={"servers"} width={"150"} height={"150"} />
                    <span>It looks like there are no Modules</span>
                    <span>
                    If you think this is an error click to force re-sync
                    </span>
                    <Input validation={{required: true}} label={"Moralis Masterkey"} onChange={(e) => setMasterKey((e as any).target.value)} type={"password"} />
                    <Button
                    isFullWidth

                    onClick={() => runCf(masterKey)}
                    theme={'primary'}
                    text={'Force Sync'}
                    />
                    </div> : <div>Loading Modules ...</div>
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

const columnNameStyle = {
    color: "#68738D",
    fontWeight: "500",
    fontSize: "14px",
    display: 'grid',
    placeItems: "flex-start",
    width: "100%",
    marginTop: "5px",
    marginBottom: "-5px"
}
