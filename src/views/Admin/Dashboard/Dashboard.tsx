// @ts-nocheck
import { useERC20Balances } from 'react-moralis';
import Overview from '../Module/Overview/Overview';
import { Flex } from 'uikit/Flex/Flex';
import { useEffect } from 'react';
import useRegistry from '../Module/contracts/Registry/useRegistry';
import { Button, TabList } from 'web3uikit';
import ProjectForm from '../Forms/Project';
import ERC20Balance from '../../../web3Components/ERC20Balance';
import { Typography } from 'uikit/Typography';
import { HeaderStyled } from 'uikit/HeaderStyled';
import { useHistory } from 'react-router-dom';
const { Tab } = TabList;

const Dashboard = ({ web3 }) => {
    const { hasProject, protocolAddress, canSetProject, projectChain } = useRegistry();
    const { fetchERC20Balances } = useERC20Balances(
        {
            address: protocolAddress,
            chain: projectChain,
        },
        {
            autoFetch: false,
        }
    );

    const history = useHistory();

    const pushToAdder = () => {
        let path = `admin/addModule`;
        history.push(path);
    };

    useEffect(() => {
        if (hasProject) {
            fetchERC20Balances().then(console.log);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasProject]);


    if (canSetProject) {
        return <ProjectForm />;
    }
 
    return (
        <Flex maxWidth="900px" width="100%">
            <HeaderStyled>
                <Typography variant="h1">Admin</Typography>
                <Typography variant="span">Create, manage, explore</Typography>
            </HeaderStyled>
            <div style={{ position: 'absolute', right: 0 }}>
                <Button onClick={pushToAdder} text={'Add Module'} theme={'primary'} icon={'plus'} iconLayout={'leading'} />
            </div>
            <TabList defaultActiveKey={2} tabStyle={'bulbSeperate'}>
                <Tab tabKey={2} tabName={'Overview'} isDisabled={canSetProject}>
                    {!canSetProject && <Overview web3={web3} protocolAddress={protocolAddress} />}
                </Tab>
                <Tab tabKey={4} tabName={'Panel'} isDisabled={canSetProject}>
                    {!canSetProject && <ERC20Balance address={protocolAddress} />}
                </Tab>
                <Tab tabKey={3} tabName={'Permissions'} isDisabled={true}>
                    {!canSetProject && <span>Coming soon</span>}
                </Tab>
            </TabList>
        </Flex>
    );
};

export default Dashboard;
