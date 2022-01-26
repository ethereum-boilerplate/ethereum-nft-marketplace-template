// @ts-nocheck
import { useChain, useMoralis } from 'react-moralis';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NFTBalance from 'web3Components/NFTBalance';
import UserDashboard from 'web3Components/User/UserDashboard';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './style.css';
import Marketplace from 'views/Admin/components/NFT/Marketplace';
import useProtocol from 'views/Admin/Module/contracts/Protocol/useProtocol';
import Admin from 'views/Admin/Admin';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import AdminRoute from 'components/AdminRoute';
import HeaderMenu from 'components/HeaderMenu';
const { Footer } = Layout;

const styles = {
    content: {
        display: 'flex',
        justifyContent: 'center',
        fontFamily: 'Roboto, sans-serif',
        color: '#041836',
        marginTop: '130px',
        padding: '10px',
    },
};
const App = () => {
    const { account, provider } = useMoralis();
    const { marketplaceAddress, hasMarketplace, canSetProject } = useProtocol();
    const { chainId } = useChain();

    const [web3, setWeb3] = useState();

    useEffect(() => {
        if (provider) {
            let web = new Web3(provider as any);
            setWeb3(web);
        }
    }, [provider]);

    return (
        <Layout style={{ height: '100vh', overflow: 'auto' }}>
            {
                <Router>
                    <HeaderMenu />
                    <div style={styles.content}>
                        <Switch>
                            <AdminRoute path="/admin">
                                <Admin />
                            </AdminRoute>
                            <Route path="/NFTBalance">
                                { hasMarketplace &&
                                    <NFTBalance web3={web3} address={account} chain={chainId} marketplaceAddress={marketplaceAddress}/>
                                }
                                { !hasMarketplace && (
                                    <div>
                                        <p style={{ fontWeight: 600 }}>Coming soon ... </p>
                                    </div>
                                )}
                            </Route>
                            {hasMarketplace && (
                                <Route path="/user">
                                    <UserDashboard address={account} web3={web3} marketplace={marketplaceAddress} />
                                </Route>
                            )}
                            <Route path="/NFTMarketPlace">
                                {hasMarketplace && <Marketplace web3={web3} address={marketplaceAddress} />}
                                {!hasMarketplace && canSetProject && (
                                    <div>
                                        <p style={{ fontWeight: 600 }}>Login and deploy your marketplace</p>
                                    </div>
                                )}
                                {!canSetProject && !hasMarketplace && (
                                    <div>
                                        <p style={{ fontWeight: 600 }}>Marketplace coming soon ...</p>
                                        <p style={{ fontWeight: 200 }}> If you are the owner switch your account in metamask</p>
                                    </div>
                                )}
                            </Route>
                            <Redirect from="/" to="/NFTMarketPlace" />
                        </Switch>
                    </div>
                </Router>
            }
            <Footer style={{ display: 'grid', placeItems: 'center' }}>Powered By Moralis</Footer>
        </Layout>
    );
};

export default App;
