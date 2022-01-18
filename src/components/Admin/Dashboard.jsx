import { Button, Form, Input, Skeleton, Table, Tabs } from 'antd';
import { useERC20Balances, useMoralis } from 'react-moralis';
import { ProjectChainId } from '.';
import Adder from "./Module/Adder";
import Moralis from 'moralis';
import Overview from "./Module/Overview";
import { useEffect } from 'react'
import { getEllipsisTxt } from 'helpers/formatters';
import { useProtocol } from './Module/contracts/Protocol/useProtocol';
import useRegistry from "./Module/contracts/Registry/typescript/useRegistry";
import {Notification} from "web3uikit";


const { TabPane } = Tabs;

export default function Dashboard() {

    const { web3, isWeb3Enabled, account } = useMoralis()
    const {  withdrawFunds, isWithdrawing } = useProtocol(web3, isWeb3Enabled)
    const { hasProject, protocolAddress, deployProtocol, isLoading, setLoading, deployErr } = useRegistry()
    const { data, fetchERC20Balances } = useERC20Balances({
        address: protocolAddress,
        chain: ProjectChainId
    })

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

    return (
        <Tabs defaultActiveKey={(!hasProject) ? "0" : "1"}>
            {(!hasProject) && <TabPane tab="Project" key="0">
            <Form layout="vertical" style={{width: '100%', margin: '0 auto'}} onFinish={(e) => deploy(e)}>
                    <Form.Item label="Name" name="name" rules={[{ required: true, message: 'You need to provide a name!' }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Describe your project' }]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="submit">
                        <Button style={{width: "100%"}} htmlType="submit" loading={isLoading}>Add Module</Button>
                    </Form.Item>
            </Form>
            </TabPane>}
            <TabPane disabled={!hasProject} tab="Modules" key="1">
                <Overview />
            </TabPane>
            <TabPane disabled={!hasProject} tab="Add Module" key="2">
                <Adder />
            </TabPane>
            <TabPane disabled={!hasProject} tab="Panel" key="3">
            <Skeleton loading={!data}>
            <Table
            dataSource={data}
            columns={columns}
            rowKey={(record) => {
                return record.token_address;
            }}
            />
        </Skeleton>
            </TabPane>
        </Tabs>
    )
}
