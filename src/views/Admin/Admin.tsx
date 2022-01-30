import { FC } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Flex } from 'uikit/Flex/Flex';
import { CollectionList } from './components/NFT/CollectionList';
import Marketplace from './components/NFT/Marketplace';
import Token from './components/Token';
import { Dashboard } from './Dashboard';
import { Adder } from './Module/Adder';

const Admin: FC = () => {
    let { path } = useRouteMatch();

    return (
        <Flex maxWidth="900px" width="100%">
            <Switch>
                <Route exact path={path} component={Dashboard} />
                <Route path={`${path}/addModule`} component={Adder} />
                <Route exact path={`${path}/manage/nft-collection/:address`} component={CollectionList} />
                <Route exact path={`${path}/manage/marketplace/:address`} component={Marketplace} />
                <Route exact path={`${path}/manage/erc20token/:address`} component={Token} />
            </Switch>
        </Flex>
    );
};

export default Admin;
