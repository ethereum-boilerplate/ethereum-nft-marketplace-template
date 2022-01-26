import { FC } from 'react';
import { useMoralis } from 'react-moralis';
import { Route, Redirect } from 'react-router-dom';
import useProtocol from 'views/Admin/Module/contracts/Protocol/useProtocol';
import { Loading } from 'web3uikit';

const AdminRoute: FC = ({ children, ...props }) => {
    const { AdminAddress, hasMarketplace } = useProtocol();
    const { account } = useMoralis();

    if (!account)
        return (
            <div style={{ marginTop: '150px' }}>
                <Loading size={50} />
            </div>
        );
    return (
        <Route
            {...props}
            render={({ location }) =>
                account?.toLowerCase() === AdminAddress?.toLowerCase() || !hasMarketplace ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/NFTMarketPlace',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default AdminRoute;
