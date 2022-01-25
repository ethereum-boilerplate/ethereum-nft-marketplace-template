import { useMoralis, useERC20Balances, useChain } from 'react-moralis';
import { Skeleton, Table } from 'antd';
import { getEllipsisTxt } from '../helpers/formatters';
import { Button, LinkTo } from 'web3uikit';
import useProtocol from '../views/Admin/Module/contracts/Protocol/useProtocol';
import { getExplorer } from '../helpers/networks';

function ERC20Balance({ address }) {
    const { account } = useMoralis();
    const { chainId } = useChain();
    const { data: assets } = useERC20Balances({ address: address, ['chain' as any]: chainId });
    const { withdrawFunds } = useProtocol();
    const columns = [
        {
            title: '',
            dataIndex: 'logo',
            key: 'logo',
            render: (logo) => (
                <img src={logo || 'https://etherscan.io/images/main/empty-token.png'} alt="nologo" width="28px" height="28px" />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name) => name,
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            render: (symbol) => symbol,
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Address',
            dataIndex: 'token_address',
            key: 'token_address',
            render: (address) => (
                <LinkTo text={getEllipsisTxt(address, 4)} address={`${getExplorer(chainId)}address/${address}`} type="external" />
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'token_address',
            key: 'token_address',
            render: (address) => {
                return (
                    <Button
                        onClick={() => {
                            withdrawFunds(account, address).then(console.log);
                        }}
                        theme={'primary'}
                        text={'Withdraw'}
                    />
                );
            },
        },
    ];

    return (
        <div style={{ padding: '15px' }}>
            <h1 style={{ marginBottom: '15px' }}>💰Royalties</h1>
            <Skeleton loading={!assets}>
                <Table
                    dataSource={assets}
                    columns={columns}
                    rowKey={(record) => {
                        return record.token_address;
                    }}
                />
            </Skeleton>
        </div>
    );
}
export default ERC20Balance;
