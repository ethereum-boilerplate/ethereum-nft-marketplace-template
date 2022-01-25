// @ts-nocheck
import { useState, useEffect, FC } from 'react';
import { useMoralis } from 'react-moralis';
import useProtocol from '../contracts/Protocol/useProtocol';
import Web3 from 'web3';
import NFTCollectionForm from '../../Forms/NFTCollection';
import MarketplaceForm from '../../Forms/Marketplace';
import TokenForm from '../../Forms/TokenForm';
import { Flex } from 'uikit/Flex/Flex';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import ModuleSelector from './components/ModuleSelector';

const Adder: FC = () => {
    let { path } = useRouteMatch();
    const [web3, setWeb3] = useState();
    const [deployConfirmed, setDeployConfirmed] = useState(false);
    const { provider } = useMoralis();
    const { hasMarketplace } = useProtocol();

    useEffect(() => {
        if (provider) {
            let web = new Web3(provider as any);
            setWeb3(web);
        }
    }, [provider]);

    useEffect(() => {
        if (deployConfirmed) {
            setTimeout(() => {
                setDeployConfirmed(false);
            }, 5000);
        }
    }, [deployConfirmed]);

    // TODO:
    // Input Validation - create and bind function on add module

    return (
        <Flex maxWidth="900px" width="100%">
            <Switch>
                <Route exact path={path}>
                    <ModuleSelector />
                </Route>
                <Route path={`${path}/bundleModule`}>
                    <p>Coming Soon</p>
                </Route>
                <Route path={`${path}/marketPlaceModule`}>
                    {hasMarketplace ? <p>Cannot deploy another marketplace</p> : <MarketplaceForm web3={web3} />}
                </Route>
                <Route path={`${path}/erc721module`}>
                    <NFTCollectionForm web3={web3} />
                </Route>
                <Route path={`${path}/tokenModule`}>
                    <TokenForm web3={web3} />
                </Route>
            </Switch>
        </Flex>
    );
};
export default Adder;
