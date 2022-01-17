import { Input, Form, Button, Alert } from "antd"
import { PercentageOutlined } from '@ant-design/icons';
import { useState, useEffect } from "react"
import { collectionBytecode, collectionAbi } from "./contracts/NFT/collection";
import { marketplaceBytecode, marketplaceAbi } from "./contracts/NFT/marketplace";
import { tokenBytecode, tokenAbi } from "./contracts/Token/token";
import { Card } from "web3uikit"
import { useMoralis } from "react-moralis";
import { dropModule, packModule, marketplaceModule, tokenModule, collectionModule, bundleModule } from "./types/list"
import { useProtocol } from "./contracts/Protocol/useProtocol";
export default function Adder() {

    const [selectedModule, setSelectedModule] = useState(null)
    const [isDeploying, setIsDeploying] = useState(false)
    const [deployConfirmed, setDeployConfirmed] = useState(false)
    const { web3, isWeb3Enabled, Moralis,account, chainId } = useMoralis()
    const { addModule,  hasMarketplace, protocolAddress, forwarder } = useProtocol(web3, isWeb3Enabled)

    const nftModules = [
        collectionModule,
        bundleModule,
        dropModule 
    ]

    const otherModules = [
        marketplaceModule,
        tokenModule,
        packModule
    ]

    useEffect(() => {
        if(deployConfirmed) {
            setTimeout(() => {
                setDeployConfirmed(false)
            }, 5000)
        }
    }, [deployConfirmed])

    const triggerWeb3Api = async (receipt) => {
        await Moralis.Web3API.token.syncNFTContract({
            chain: chainId,
            address: receipt.contractAddress
        })
    }

    const handleDeploy = async (e) => {
        setIsDeploying(true)
        delete e.submit
        const json = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(e))})
        await json.saveIPFS()
        try {
        // Deploy NFT Collection Module
        if(selectedModule.key === "erc721module") {
            let code = '0x' + collectionBytecode;
            const contract = new web3.eth.Contract(collectionAbi)
            const toDeploy = contract.deploy({data: code, arguments: [protocolAddress, e.name, e.symbol, forwarder, `ipfs://${json.hash()}`, (e.royalty*100)]})
            await toDeploy.send({from: account})
            .on('receipt', async (receipt) => {
                triggerWeb3Api(receipt)
                await addModule(2, receipt.contractAddress, account)
                setDeployConfirmed(true)
                setIsDeploying(false)
            })
            
        }

        // Deploy NFT Marketplace
        if(selectedModule.key === "marketPlaceModule") {
            let code = '0x' + marketplaceBytecode;
            const contract = new web3.eth.Contract(marketplaceAbi)
            console.log(protocolAddress, forwarder, `ipfs://${json.hash()}`, (e.marketFee*100))
            const toDeploy = contract.deploy({data: code, arguments: [protocolAddress, forwarder, `ipfs://${json.hash()}`, (e.marketFee*100)]})
            await toDeploy.send({from: account})
            .on('receipt', async (receipt) => {
                await addModule(6, receipt.contractAddress, account)
                setDeployConfirmed(true)
                setIsDeploying(false)
            })
        }

        // Deploy ERC20 Token
        if(selectedModule.key === "tokenModule") {
            let code = '0x' + tokenBytecode;
            const contract = new web3.eth.Contract(tokenAbi)
            const toDeploy = contract.deploy({data: code, arguments: [protocolAddress, e.name, e.symbol, forwarder, `ipfs://${json.hash()}`]})
            await toDeploy.send({from: account})
            .on('receipt', async (receipt) => {
                await addModule(0, receipt.contractAddress, account)
                setDeployConfirmed(true)
                setIsDeploying(false)
            })
        }
        } catch (error) {
            console.log(error)
        }

    }

    // TODO: 
    // Input Validation - create and bind function on add module
    const printSelectedModule = () => {
        if(
            selectedModule.key === "bundleModule" || selectedModule.key === "lazyMintModule" || selectedModule.key === "packModule"
        ) {
            return ( <p>Coming Soon</p> )
        }
        if(hasMarketplace && selectedModule.key === "marketPlaceModule") {
            return (
                <p>Cannot deploy another marketplace</p>
            )
        }
        return (
            <div>
                <p style={{fontWeight: '600'}}>{selectedModule.title}</p>
                <span style={span}>{selectedModule.desc}</span>
                {deployConfirmed && <Alert type="success" message="Module successfully deployed and added to project"/>}
                <Form layout="vertical" style={{width: '100%', margin: '0 auto'}} onFinish={(e) => handleDeploy(e)}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'You need to provide a name!' }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Symbol" name="symbol" rules={[{ required: selectedModule.key === 'tokenModule' ? true : false, message: 'You need to provide a name!' }]}>
                        <Input/>
                    </Form.Item>
                    { selectedModule.key === "marketPlaceModule" && 
                    <Form.Item label="Market Fee" name="marketFee" rules={[{ required: true, message: 'Please specify Market Fee' }]}>
                        <Input suffix={ <PercentageOutlined/> } type="number"/>
                    </Form.Item>
                    }
                    { selectedModule.key !== "tokenModule" && 
                    <Form.Item label="Description" name="description">
                        <Input/>
                    </Form.Item>
                    }
                    { selectedModule.key === "lazyMintModule" && 
                        <Form.Item label="Primary Sale Recipent Address" name="primaryAddress" required={true}>
                            <Input/>
                        </Form.Item>
                    }
                    {(selectedModule.key === "erc721module" || selectedModule.key === "lazyMintModule" || selectedModule.key === "bundleModule")  && 
                    <Form.Item label="Royalty" name="royalty" rules={[{ required: true, message: 'Please specify royalty' }]}>
                        <Input suffix={ <PercentageOutlined/> } type="number" maxLength="100"/>
                    </Form.Item>
                    }
                    
                    <Form.Item name="submit">
                        <Button style={{width: "100%"}} htmlType="submit" loading={isDeploying}>Add Module</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    return (
        <div style={wrapper}>
            <div>
                <p style={{fontWeight: 600}}>NFT Modules</p>
                <div style={{display: 'flex'}}>
                    {nftModules.map((module) => {
                        return (
                            <div
                            key={module.title}
                            onClick={()=> setSelectedModule(module)}
                            style={{padding: '0.5em'}}
                            >
                                <Card module={module.title} />
                            </div>
                        )
                    })}
                </div>
                <p style={{fontWeight: 600}}>Other Modules</p>
                <div style={{display: 'flex'}}>
                    
                    {otherModules.map((module) => {
                        return (
                                <div
                                key={module.title}
                                onClick={()=> setSelectedModule(module)}
                                style={{padding: '0.5em'}}
                                >
                                    <Card key={module.title} module={module.title}/>
                                </div>
                        )
                    })}
                </div>
            </div>

            <div style={{backgroundColor: 'white', borderRadius: '10px', padding: '1em'}}>
                { 
                    !selectedModule && <p>Please Select A Module first</p>
                }
                {
                    selectedModule && printSelectedModule()
                }
            </div>
        </div>
    )
}


const wrapper = {
    display: 'grid',
    gridGap: '1rem'
}

const span = {
    fontSize: "9px",
    fontWeight: "300"
}
