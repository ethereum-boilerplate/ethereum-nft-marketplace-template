import { Modal } from 'antd'
import { useState, useEffect } from 'react'
import {useMoralisQuery, useMoralis, useWeb3ExecuteFunction} from 'react-moralis'
import { getEllipsisTxt } from '../../../helpers/formatters'
import { getModuleColor, getModuleType } from '../../../helpers/modules';
import {Avatar, Button, Dropdown, DropdownElement, Icon, LinkTo, Table, Tag} from "web3uikit"
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

export default function Overview({ pushToAdder, protocolAddress }) {

    const [modules, setModules] = useState([])
    const [limit] = useState(100)
    // Get installed modules
    const { data } = useMoralisQuery("Modules", query => query.limit(limit),[limit], { live: true })
    const { web3, chainId } = useMoralis()
    const { getNextTokenIdByAddress } = useCollection(web3, null)
    const [selectedModule, setSelectedModule] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [ isLoading, setLoading ] = useState(true)
    const { fetch: fetchWeb3 } = useWeb3ExecuteFunction()
    const [ tableData ] = useState([])

    useEffect(() => {
        if(data && data.length > 0) {
            setLoading(true)
            setModules([])
            data.forEach(async (mod, index) => {
                await fetchWeb3({
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
                            const x = await fetch(url)
                            const y = await x.json()
                            metadata.name = y.name
                        } catch (e) {
                            console.log(e)
                        }
                        let temp = modules
                        let tempTable = tableData
                        let typeText = getModuleType(mod.get('moduleId'), data.length)

                        temp.push({type: typeText, module: mod.get('module'), key: mod.get('module'), metadata})
                        tempTable.push(
                            [
                                <Avatar theme="letters" text={metadata.name} />,
                                metadata.name,
                                <Tag color={getModuleColor(typeText)} text={typeText}/>,
                                <LinkTo text={getEllipsisTxt(mod.get('module'), 5)} address={`${getExplorer(chainId)}address/${mod.get('module')}`} />,
                                    <Dropdown
                                        onClick={() => {}}
                                        parent={<Icon key="3" fill="#68738D" size={20} svg="more vert"/>}
                                        position="bottom"
                                        children={[
                                            <DropdownElement
                                                backgroundColor="transparent"
                                                icon="testnet"
                                                iconSize={12}
                                                onClick={() => {runCf()}}
                                                text="Testnet Server"
                                                textColor="#FFFFFF"
                                                key={1}
                                            />
                                        ]}
                                    />

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
        if(!protocolAddress || !ProjectChainId) return
        Moralis.masterKey = MasterKey
        const options = {"tableName": "Modules"}
        await Moralis.Cloud.run("unwatchContractEvent", options, {useMasterKey:true});
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
            {
                <>
                    <div style={{display: 'flex', flexDirection: 'row-reverse', marginBottom: "15px"}}>
                        <Button onClick={pushToAdder}  text={"Add Module"} theme={"primary"} icon={"plus"} iconLayout={"leading"}/>
                    </div>
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
                    customNoDataComponent={
                        <div style={{display: 'grid', placeItems: 'center', width: "30vw", textAlign: 'center'}}>
                            <h2>It looks like there is no data</h2>
                            <span>If you think this is an error click to force re-sync</span>
                            <Button onClick={() => runCf()} theme={"primary"} text={"Force Sync"} />
                        </div>
                    }

                    />
                </>
            }
            <Modal
            title={`${getEllipsisTxt(selectedModule?.module)} ${selectedModule?.type}`}
            visible={showModal}
            destroyOnClose={true}
            onCancel={() => setShowModal(false)}
            okButtonProps={{ disabled: true }}
            cancelButtonProps={{ disabled: false }}
            >

                        { 
                            selectedModule && printModuleInModal(selectedModule?.type, selectedModule)
                        }   

                        <Roles />
            </Modal>
        </div>
    )
}
