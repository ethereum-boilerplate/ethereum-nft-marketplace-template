import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Web3 from 'web3';
import { Dashboard } from './Dashboard';
import { Adder } from './Module/Adder';

const Admin: FC = () => {
    let { path } = useRouteMatch();
    const { provider } = useMoralis();

    const [web3, setWeb3] = useState<any>();

    useEffect(() => {
        if (provider) {
            let web = new Web3(provider as any);
            setWeb3(web);
        }
    }, [provider]);

    return (
        <Switch>
            <Route exact path={path}>
                <Dashboard web3={web3} />
            </Route>
            <Route path={`${path}/addModule`}>
                <Adder />
            </Route>
        </Switch>
    );
};

export default Admin;
