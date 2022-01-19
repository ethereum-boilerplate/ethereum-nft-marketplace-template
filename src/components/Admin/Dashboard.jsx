import { Button, Form, Input, Skeleton, Table, Tabs } from 'antd';
import { useERC20Balances, useMoralis } from 'react-moralis';
import { ProjectChainId } from '.';
import Adder from "./Module/Adder";
import Moralis from 'moralis';
import Overview from "./Module/Overview";
import {useEffect, useState} from 'react'
import { getEllipsisTxt } from 'helpers/formatters';
import { useProtocol } from './Module/contracts/Protocol/useProtocol';
import useRegistry from "./Module/contracts/Registry/typescript/useRegistry";
import {Notification} from "web3uikit";
import Web3 from "web3";


const { TabPane } = Tabs;

export default function Dashboard() {

    const { isWeb3Enabled, account, provider } = useMoralis()
    const [web3, setWeb3] = useState()
    const {  withdrawFunds, isWithdrawing } = useProtocol(web3, isWeb3Enabled)
    const { hasProject, protocolAddress, deployProtocol, isLoading, setLoading, deployErr, canSetProject } = useRegistry()
    const { fetchERC20Balances } = useERC20Balances({
        address: protocolAddress,
        chain: ProjectChainId
    })


    useEffect(() => {
        if(provider) {
            let web = new Web3(provider)
            setWeb3(web)
        }
    }, [provider])

    useEffect(() => {
        console.log(`CAN SET PROJECT SET TO: ${canSetProject}`)
    }, [canSetProject])

    useEffect(() => {
        if(hasProject) {
            fetchERC20Balances()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasProject])

    useEffect(() => {
        if(deployErr) {
            return (
                <Notification message={deployErr.message} isVisible={true} title={"Error"} />
            )
        }
    }, [deployErr])

    const columns = [
        {
            title: "",
            dataIndex: "logo",
            key: "logo",
            render: (logo) => (
            <img
                src={logo || "https://etherscan.io/images/main/empty-token.png"}
                alt="nologo"
                width="28px"
                height="28px"
            />
            ),
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (name) => name,
        },
        {
            title: "Symbol",
            dataIndex: "symbol",
            key: "symbol",
            render: (symbol) => symbol,
        },
        {
            title: "Balance",
            dataIndex: "balance",
            key: "balance",
            render: (value, item) =>
            parseFloat(Moralis.Units.FromWei(value, item.decimals).toFixed(6)),
        },
        {
            title: "Address",
            dataIndex: "token_address",
            key: "token_address",
            render: (address) => getEllipsisTxt(address, 5),
        },
        {
            title: "Withdraw",
            dataIndex: "token_address",
            key: "token_address",
            render: (address, item) => {
            return (
                <Button 
                loading={isWithdrawing}
                onClick={() => {
                    withdrawFunds(account, address, item.balance, account)
                }}>
                    Claim
                </Button>
            )
            }
        }
        ];

        const deploy = async (e) => {
            setLoading(true)
            delete e.submit
            const json = new Moralis.File("metadata.json", {base64: btoa(JSON.stringify(e))})
            await json.saveIPFS()
            await deployProtocol(`ipfs://${json.hash()}`)
            console.log('trigga')
        }

        const getActiveKey = () => {
            return canSetProject ? "0" : "1"
        }

    return (

        <Tabs defaultActiveKey={"0"}>
                <TabPane disabled={!canSetProject} tab="Project" key="0">
                    {(canSetProject) &&<Form layout="vertical" style={{width: '100%', margin: '0 auto'}} onFinish={(e) => deploy(e)}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'You need to provide a name!' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Describe your project' }]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="submit">
                            <Button style={{width: "100%"}} htmlType="submit" loading={isLoading}>Add Module</Button>
                        </Form.Item>
                    </Form>}
                    {(!canSetProject) &&
                        <p>You already deployed a project</p>
                    }
            </TabPane>
            <TabPane disabled={canSetProject} tab="Modules" key="1">
                {(!canSetProject) && <Overview web3/>}
            </TabPane>
            <TabPane disabled={canSetProject} tab="Add Module" key="2">
                {(!canSetProject) && <Adder web3/>}
            </TabPane>
            <TabPane disabled={canSetProject} tab="Panel" key="3">
            <Skeleton loading={isLoading}>
            </Skeleton>
            </TabPane>
        </Tabs>
    )
}
