import { useERC20Balances } from 'react-moralis';
import { ProjectChainId } from '.';
import Overview from "./Module/Overview";
import { useEffect } from 'react'
import useRegistry from "./Module/contracts/Registry/typescript/useRegistry";
import { TabList } from "web3uikit";
import ProjectForm from "./Forms/Project";
import {useHistory} from "react-router";

const { Tab } = TabList

export default function Dashboard() {

    const { hasProject, protocolAddress, deployProtocol, isLoading, setLoading, canSetProject, deployErr, deployTx  } = useRegistry()
    const { fetchERC20Balances } = useERC20Balances({
        address: protocolAddress,
        chain: ProjectChainId
    })

    const history = useHistory();

    const pushToAdder = () =>{
        let path = `addModule`;
        history.push(path);
    }

    useEffect(() => {
        console.log(`CAN SET PROJECT? = ${canSetProject}`)
    }, [canSetProject])

    useEffect(() => {
        if(hasProject) {
            fetchERC20Balances()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasProject])

    return (
        <TabList
        defaultActiveKey={canSetProject ? 1 : 2}
        tabStyle={"bar"}
        >
            <Tab
                tabKey={1}
                tabName={"Project"}
                isDisabled={!canSetProject}
            >
                <ProjectForm deployProtocol={deployProtocol} deployErr={deployErr} deployTx={deployTx} setLoading={setLoading} isLoading={isLoading}/>
            </Tab>
            <Tab
                tabKey={2}
                tabName={"Modules"}
                isDisabled={canSetProject}
            >
                {(!canSetProject) && <Overview pushToAdder={pushToAdder} protocolAddress={protocolAddress} />}
            </Tab>
            <Tab
                tabKey={3}
                tabName={"Panel"}
                isDisabled={canSetProject}
            >
                {(!canSetProject) && <span>Coming soon</span>}
            </Tab>
        </TabList>
        /*<Tabs defaultActiveKey={"0"}>
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
                {(!canSetProject) && <Overview />}
            </TabPane>
            <TabPane disabled={canSetProject} tab="Add Module" key="2">
                {(!canSetProject) && <Adder />}
            </TabPane>
            <TabPane disabled={canSetProject} tab="Panel" key="3">
                Withdraw royalties
                coming soon ...
            </TabPane>
            <div style={{position: "relative"}}>
                LOL
                <div style={{position: "absolute", top: "0", left: "0"}}>
                    <Notification message={deployErr ? deployErr.message : ""} title={"Error"} isVisible={true}  />
                    < /div>
            </div>
        </Tabs>*/
    )
}
