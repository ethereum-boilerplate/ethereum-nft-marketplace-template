// @ts-nocheck
import React, { useState } from 'react';
import { useChain, useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall } from 'react-moralis';
import { useToken } from '../Module/contracts/Token/useToken';
import {Avatar, Button, iconTypes, Information, Input, LinkTo, TabList} from 'web3uikit';
import { getExplorer } from '../../../helpers/networks';
import { getEllipsisTxt } from '../../../helpers/formatters';
import { RouteComponentProps } from 'react-router';

const { Tab } = TabList;

const Token: React.FC = (props: RouteComponentProps<{ address: string }>) => {
    const [amountToMint, setAmountToMint] = useState(false);
    const [addressToSend, setAddressToSend] = useState(null);
    const { Moralis, account } = useMoralis();
    const { chainId } = useChain();
    const Web3API = useMoralisWeb3Api();

    const {
        match: {
            params: { address },
        },
    } = props;

    const { data } = useMoralisWeb3ApiCall(
        Web3API.account.getTokenBalances,
        {
            address: account,
            token_addresses: [address],
            chain: chainId,
        },
        { autoFetch: true }
    );

    const { decimals, loading, symbol, totalSupply, mint, addToMetamask } = useToken(address);

    return (
        <TabList tabStyle={'bulbUnion'}>
            <Tab tabKey={1} tabName={'Overview'}>
                <div style={{ backgroundColor: 'white', borderTopLeftRadius: '15px',   borderTopRightRadius: '15px', padding: '0.25em', display: 'grid', placeItems: 'center', gap: '20px' }}>
                    <Avatar text={symbol} theme={'letters'} />
                    <LinkTo address={`${getExplorer(chainId)}address/${address}`} text={getEllipsisTxt(address, 4)} type={'external'} />
                    <div
                        style={{
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '25px',
                        }}
                    >
                        <Button
                            disabled={loading}
                            onClick={() => addToMetamask()}
                            iconLayout={'leading'}
                            icon={iconTypes.download}
                            theme={'outline'}
                            text={'Add to Metamask'}
                        />
                        <Button
                            disabled={loading || !amountToMint || !addressToSend}
                            onClick={() => mint(addressToSend, amountToMint)}
                            theme={'primary'}
                            iconLayout={'leading'}
                            icon={iconTypes.plus}
                            text={'Mint'}
                        />
                    </div>
                </div>
                <div style={{ backgroundColor: 'white', display: 'grid', placeItems: 'center', padding: '1em', gap: '1em' }}>
                    <p style={{fontWeight: 600}}>Mint Tokens</p>
                    <Input
                        onChange={(e) => {
                            setAmountToMint(e.target.value);
                        }}
                        placeholder={'Amount'}
                        type={'number'}
                    />
                    <Input
                        onChange={(e) => {
                            setAddressToSend(e.target.value);
                        }}
                        placeholder={'To Address'}
                        type={'text'}
                    />
                </div>
                <div style={{ backgroundColor: 'white', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px', padding: '0.25em', display: 'flex', justifyContent: 'space-between', gap: '2%' }}>
                    <Information topic={'Total Supply'} information={totalSupply ? Moralis.Units.FromWei(totalSupply) : '0'} />
                    <Information topic={'Owned By You'} information={data && data[0] ? Moralis.Units.FromWei(data[0].balance) : '0'} />
                    <Information topic={'Decimals'} information={decimals} />
                </div>
            </Tab>
            <Tab tabKey={2} tabName={'Permissions'}>
                <p>Coming Soon</p>
            </Tab>
        </TabList>
    );
};

export default Token;
