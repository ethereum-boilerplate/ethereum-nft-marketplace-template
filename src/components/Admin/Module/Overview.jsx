import { Modal, Tabs, Tooltip } from 'antd'
import { useState, useEffect } from 'react'
import {useMoralisQuery, useMoralis, useApiContract, useWeb3ExecuteFunction} from 'react-moralis'
import { getEllipsisTxt } from '../../../helpers/formatters'
import { getModuleColor, getModuleType } from '../../../helpers/modules';
import {Avatar, Button, Icon, Table, Tag} from "web3uikit"
import Minter from '../components/NFT/Minter';
import Roles from './Permissions/Roles';
import Marketplace from '../components/NFT/Marketplace';
import Token from '../components/Token';
import Bundle from '../components/NFT/Bundle';
import CollectionList from '../components/NFT/CollectionList';
import { getExplorer } from '../../../helpers/networks';
import { useCollection } from './contracts/NFT/useCollection';
import Moralis from "moralis";
import {MasterKey, ProjectChainId} from "../index";
import useProtocol from "./contracts/Protocol/typescript/useProtocol";
const { TabPane } = Tabs;

export default function Overview() {

    const [modules, setModules] = useState([])
    const [limit] = useState(100)
    // Get installed modules
    const { data } = useMoralisQuery("Modules", query => query.limit(limit),[limit], { live: true})
    const { web3, chainId } = useMoralis()
    const { getNextTokenIdByAddress } = useCollection(web3, null)
    const [selectedModule, setSelectedModule] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { protocolAddress } = useProtocol()
    const [isLoading, setLoading] = useState(true)
    const { fetch } = useWeb3ExecuteFunction()
    const [ tableData, setTableData ] = useState([])

    useEffect(() => {
        if(data && data.length > 0) {
            setLoading(true)
            setModules([])
            data.forEach(async (mod, index) => {
                await fetch({
                    params: {
                        abi: [{
                            "inputs": [],
                            "name": "_contractURI",
                            "outputs": [
                                {
                                    "internalType": "string",
                                    "name": "",
                                    "type": "string"
                                }
                            ],
                            "stateMutability": "view",
                            "type": "function"
                        }
                        ],
                        functionName: "_contractURI",
                        contractAddress: mod.get('module'),
                    },
                    onSuccess: async (results) => {
                        let metadata = {
                            name: '', description: ''
                        }
                        const url = `https://ipfs.io/ipfs/${(results).split('ipfs://')[1]}`
                        try {
                            /*const x = await fetch(url)
                            const y = await x.json()
                            metadata.name = y.name*/
                        } catch (e) {
                            console.log(e)
                        }
                        let temp = modules
                        let tempTable = tableData
                        let typeText = getModuleType(mod.get('moduleId'), data.length)

                        temp.push({type: typeText, module: mod.get('module'), key: mod.get('module'), metadata})
                        tempTable.push(
                            [
                                <Avatar theme="letters" text={"MP"} />,
                                'Owl Magi',
                                <Tag color="purple" text={typeText}/>,
                                mod.get('module'),
                                <Icon fill="black" size={32} svg="more vert"/>
                            ]
                        )
                        setModules(temp)
                    }
                })
                if(index === modules.length - 1) {
                    setLoading(false)

                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])


    const columns = [ 
        {
            title: 'Name',
            dataIndex: 'metadata',
            key: 'name',
            render: (record) => record.name !== "" ? record.name : "No Name Found"
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (record) => <Tag color={getModuleColor(record)} text={record}/>
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            render: (record) => {
                return (
                    <Tooltip title={"View on Blockexplorer"}>
                        <a href={`${getExplorer(chainId)}address/${record}`} rel='noreferrer' target={"_blank"}>{getEllipsisTxt(record, 4)}</a>
                    </Tooltip>
                )
            }
        },
    ]

    const onRowClick = (record) => {
        const isEmptyCollection = async () => {
            if(record.type === "NFT Collection") {
                const next = await getNextTokenIdByAddress(record.module)

                return { isEmpty: next.result === "0", contract: next.contract}
            }
        }
        isEmptyCollection().then((result) => {
            setSelectedModule({...record, ...result})
            setShowModal(true)
        })
    }

    const printModuleInModal = (type, selectedModule) => {
        if(type === "NFT Marketplace") {
            return <Marketplace address={selectedModule.module} isAdmin={true}/>
        }
        if(type === "NFT Collection") {
            return (
                <>
                    <CollectionList address={selectedModule.module}/>
                    <Minter address={selectedModule.module}/>
                </>
            )
        }
        if(type === "Token") {
            return <Token address={selectedModule.module} />
        }
        if(type === "NFT Bundle") {
            return <Bundle />
        }
    }

    const runCf = async () => {
        if((modules && modules.length > 0 ) || !protocolAddress || !ProjectChainId) return
        Moralis.masterKey = MasterKey
        await Moralis.Cloud.run("watchContractEvent", {
            chainId: ProjectChainId,
            address: protocolAddress,
            topic: "ModuleUpdated(bytes32, address)",
            abi: {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "bytes32",
                        "name": "moduleId",
                        "type": "bytes32"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "module",
                        "type": "address"
                    }
                ],
                "name": "ModuleUpdated",
                "type": "event"
            },
            tableName: "Modules",
            "sync_historical": true
        }, {useMasterKey: true})
    }

    return (
        <div>
            { modules && modules.length === 0 && !isLoading && <p>No Modules installed.. if you think this is an error. <Button onClick={() => {runCf(protocolAddress)}} text={"Click here to force sync"}/> </p>  }
            { modules && modules.length > 0 &&
                /*<Table
                loading={isLoading}
                onRow={(record) => {
                    return {
                        onClick: () => onRowClick(record)
                    }
                }}
                dataSource={modules} 
                columns={columns}
                scroll={{x: true}}
                /> */

                <Table
                    columnsConfig="80px 3fr 2fr 2fr 80px"
                    s
                    data={tableData}
                    header={[
                        '',
                        <span>Name</span>,
                        <span>Type</span>,
                        <span>Module</span>,
                        ''
                    ]}
                    maxPages={3}
                    onPageNumberChanged={function noRefCheck(){}}
                    pageSize={5}
                />
            }
            <Modal
            title={`${getEllipsisTxt(selectedModule?.module)} ${selectedModule?.type}`}
            visible={showModal}
            destroyOnClose={true}
            onCancel={() => setShowModal(false)}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: false }}
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Overview" key="overview">
                        { 
                            selectedModule && printModuleInModal(selectedModule?.type, selectedModule)
                        }   
                    </TabPane>
                    <TabPane tab="Permissions" key="roles">
                        <Roles />
                    </TabPane>
                </Tabs>
            </Modal>
        </div>
    )
}
