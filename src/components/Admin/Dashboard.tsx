import { useERC20Balances } from 'react-moralis';
import { ProjectChainId } from '.';
import Overview from "./Module/Overview";
import { useEffect } from 'react'
import useRegistry from "./Module/contracts/Registry/useRegistry";
import {Button, TabList} from "web3uikit";
import ProjectForm from "./Forms/Project";
import {useHistory} from "react-router";
import ERC20Balance from "../ERC20Balance";

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

    if(canSetProject) {
        return (
            <ProjectForm
                web3={web3}
                deployProtocol={deployProtocol}
                deployErr={deployErr}
                deployTx={deployTx}
                setLoading={setLoading}
                isLoading={isLoading}
            />
        )
    }

    return (
        <TabList
            defaultActiveKey={2}
            tabStyle={"bulbSeperate"}

        >
            <Tab
                tabKey={2}
                tabName={"Overview"}
                isDisabled={canSetProject}
            >
                {(!canSetProject) && <Overview web3={web3} protocolAddress={protocolAddress} />}
            </Tab>
            <Tab
                tabKey={4}
                tabName={"Panel"}
                isDisabled={canSetProject}

            >
                {(!canSetProject) && <ERC20Balance address={protocolAddress} />}
            </Tab>
            <Tab
                tabKey={3}
                tabName={"Permissions"}
                isDisabled={true}

            >
                {(!canSetProject) && <span>Coming soon</span>}
            </Tab>

            <div style={{position: "absolute", left: "70%"}}><Button onClick={pushToAdder} text={"Add Module"} theme={"primary"} icon={"plus"} iconLayout={"leading"}/></div>
        </TabList>
    )
}
