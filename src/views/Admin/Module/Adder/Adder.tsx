// @ts-nocheck
import { useState, useEffect, FC } from 'react';
import { useMoralis } from 'react-moralis';
import useProtocol from '../contracts/Protocol/useProtocol';
import Web3 from 'web3';
import NFTCollectionForm from '../../Forms/NFTCollection';
import MarketplaceForm from '../../Forms/MarketplaceForm';
import TokenForm from '../../Forms/TokenForm';
import { Flex } from 'uikit/Flex/Flex';
import { Switch, Route, useRouteMatch, useLocation } from 'react-router-dom';
import ModuleSelector from './components/ModuleSelector';
import { Breadcrumbs } from 'web3uikit';

const Adder: FC = () => {
    let { path } = useRouteMatch();
    const [web3, setWeb3] = useState();
    const [deployConfirmed, setDeployConfirmed] = useState(false);
    const { provider } = useMoralis();
    const { hasMarketplace } = useProtocol();
    const { pathname } = useLocation();

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

    const renderBreadCrumbs = (route) => (
        <Breadcrumbs

            routes={[
                {
                    breadcrumb: 'Admin Panel',
                    path: '/admin',
                },
                {
                    breadcrumb: 'Add Module',
                    path: '/admin/addModule',
                },
                { ...route },
            ]}
            currentLocation={pathname}
            style={{ marginBottom: '24px' }}
        />
    );

    // TODO:
    // Input Validation - create and bind function on add module
    return (
        <Flex maxWidth="900px" width="100%">
            <Switch>
                <Route exact path={path}>
                    {renderBreadCrumbs()}
                    <ModuleSelector />
                </Route>
                <Route path={`${path}/bundleModule`}>
                    <p>Coming Soon</p>
                </Route>
                <Route path={`${path}/marketPlaceModule`}>
                    {hasMarketplace ? (
                        <p>Cannot deploy another marketplace</p>
                    ) : (
                        <>
                            {renderBreadCrumbs({
                                breadcrumb: 'NFT Marketplace',
                                path: '/admin/addModule/marketPlaceModule',
                            })}
                            <MarketplaceForm web3={web3} />
                        </>
                    )}
                </Route>
                <Route path={`${path}/erc721module`}>
                    {renderBreadCrumbs({
                        breadcrumb: 'NFT Collection',
                        path: '/admin/addModule/erc721module',
                    })}
                    <NFTCollectionForm web3={web3} />
                </Route>
                <Route path={`${path}/tokenModule`}>
                    {renderBreadCrumbs({
                        breadcrumb: 'ERC20 Token',
                        path: '/admin/addModule/tokenModule',
                    })}
                    <TokenForm web3={web3} />
                </Route>
            </Switch>
        </Flex>
    );
};
export default Adder;
