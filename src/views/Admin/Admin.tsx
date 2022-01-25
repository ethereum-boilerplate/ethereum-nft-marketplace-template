// @ts-nocheck
import { useERC20Balances } from 'react-moralis';
import { ProjectChainId } from '.';
import Overview from './Module/Overview';
import { Flex } from 'uikit/Flex/Flex';
import { useEffect } from 'react';
import useRegistry from './Module/contracts/Registry/useRegistry';
import { Button, TabList } from 'web3uikit';
import ProjectForm from './Forms/Project';
import ERC20Balance from '../../components/ERC20Balance';
import { Typography } from 'uikit/Typography';
import { HeaderStyled } from 'uikit/HeaderStyled';
import { useRouteMatch } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Adder } from './Module/Adder';

const { Tab } = TabList;

const Admin = ({ web3 }) => {
    const { hasProject, protocolAddress, deployProtocol, isLoading, setLoading, canSetProject, deployErr } = useRegistry();
    const { fetchERC20Balances } = useERC20Balances(
        {
            address: protocolAddress,
            chain: ProjectChainId,
        },
        {
            autoFetch: false,
        }
    );

    let { path, url } = useRouteMatch();

    useEffect(() => {
        if (hasProject) {
            fetchERC20Balances().then(console.log);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasProject]);

    if (canSetProject && !isLoading) {
        return (
            <ProjectForm web3={web3} deployProtocol={deployProtocol} deployErr={deployErr} setLoading={setLoading} isLoading={isLoading} />
        );
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Dashboard />
            </Route>
            <Route path={`${path}/:topicId`}>
                <Adder />
            </Route>
        </Switch>
    );
};

export default Admin;
