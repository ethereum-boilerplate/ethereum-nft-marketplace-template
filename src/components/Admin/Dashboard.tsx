import { useERC20Balances } from 'react-moralis';
import { ProjectChainId } from '.';
import Overview from "./Module/Overview";
import { useEffect } from 'react'
import useRegistry from "./Module/contracts/Registry/useRegistry";
import { TabList } from "web3uikit";
import ProjectForm from "./Forms/Project";
import {useHistory} from "react-router";

const { Tab } = TabList

export default function Dashboard({ web3 }) {

    const { hasProject, protocolAddress, deployProtocol, isLoading, setLoading, canSetProject, deployErr, deployTx  } = useRegistry()
    const { fetchERC20Balances } = useERC20Balances(
        {
            address: protocolAddress,
            chain: ProjectChainId
        },
        {
            autoFetch: false
        }
    )

    const history = useHistory();

    const pushToAdder = () =>{
        let path = `addModule`;
        history.push(path);
    }

    useEffect(() => {
        if(hasProject) {
            fetchERC20Balances().then(console.log)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasProject])

    return (
        <TabList
        defaultActiveKey={canSetProject ? 1 : 2}
        tabStyle={"bulbUnion"}

        >
            <Tab
                tabKey={1}
                tabName={"Project"}
                isDisabled={!canSetProject}
            >
                <ProjectForm web3={web3} deployProtocol={deployProtocol} deployErr={deployErr} deployTx={deployTx} setLoading={setLoading} isLoading={isLoading}/>
            </Tab>
            <Tab
                tabKey={2}
                tabName={"Modules"}
                isDisabled={canSetProject}
            >
                {(!canSetProject) && <Overview web3={web3} pushToAdder={pushToAdder} protocolAddress={protocolAddress} />}
            </Tab>
            <Tab
                tabKey={3}
                tabName={"Panel"}
                isDisabled={canSetProject}
            >
                {(!canSetProject) && <span>Coming soon</span>}
            </Tab>
        </TabList>
    )
}
