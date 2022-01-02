import { Modal, Table, Tabs, Tooltip } from 'antd'
import { useState, useEffect } from 'react'
import { useMoralisQuery, useMoralis } from 'react-moralis'
import { getEllipsisTxt } from 'helpers/formatters'
import { getModuleColor, getModuleType } from 'helpers/modules';
import { Tag } from "web3uikit"
import Minter from '../components/NFT/Minter';
import Roles from './Permissions/Roles';
import Marketplace from '../components/NFT/Marketplace';
import Token from '../components/Token';
import Bundle from '../components/NFT/Bundle';
import CollectionList from '../components/NFT/CollectionList';
import { getExplorer } from 'helpers/networks';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import { useCollection } from './contracts/NFT/useCollection';
const { TabPane } = Tabs;

export default function Overview() {

    const [modules, setModules] = useState([])
    const [limit] = useState(100)
    // Get installed modules
    const { data } = useMoralisQuery("ModuleSync", query => query.limit(limit),[limit], { live: true})
    const { web3 } = useMoralis()
    const { chainId } = useMoralisDapp()
    const { getNextTokenIdByAddress } = useCollection(web3, null)
    const [selectedModule, setSelectedModule] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isLoading, setLoading] = useState(false)


    useEffect(() => {
        if(data && data.length > 0) {
            setLoading(true)
            setModules([])
            data.forEach(async (mod) => {
                let contract = new web3.eth.Contract([
                    {
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
                ], mod.get('module'))

                let metadata = {
                    name: '', description: ''
                }
                try {
                    const uri = await contract.methods._contractURI().call()
                    if(uri.includes('ipfs')) {
                        const url = `https://ipfs.io/ipfs/${(uri).split('ipfs://')[1]}`
                        const x = await fetch(url)
                        const y = await x.json()
                        metadata.name = y.name
                    }
                } catch (error) {
                    console.log('no metadata found')
                }
                setModules((prev) => [...prev, {type:getModuleType(mod.get('moduleId'), data.length), module: mod.get('module'), key: mod.get('module'), metadata}])
            })
            setLoading(false)
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

    return (
        <div>
            { !modules && <p>No Modules installed</p> }
            { modules && 
                <Table 
                loading={isLoading}
                onRow={(record) => {
                    return {
                        onClick: () => onRowClick(record)
                    }
                }}
                dataSource={modules} 
                columns={columns}
                scroll={{x: true}}
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
