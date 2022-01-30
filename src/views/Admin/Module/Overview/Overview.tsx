import { useMoralisQuery, useMoralis } from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getModuleColor } from '../../../../helpers/modules';
import { Avatar, LinkTo, Table, Tag, Illustration, Button } from 'web3uikit';
import { getExplorer } from '../../../../helpers/networks';
import { IMetadata } from './interfaces';
import { useHistory } from 'react-router-dom';

import { columnNameStyle } from './styles';

const columns = [
    '',
    <div key={'col1'} style={columnNameStyle}>
        <span>Name</span>
    </div>,
    <div key={'col2'} style={columnNameStyle}>
        <span>Type</span>
    </div>,
    <div key={'col3'} style={columnNameStyle}>
        <span>Module</span>
    </div>,
    '',
];

const Overview = () => {
    const { data, isFetching } = useMoralisQuery('InstalledModules', (query) => query.limit(100), [], { live: true });
    const { chainId } = useMoralis();
    const { push } = useHistory();

    const pushToHistory = (target: string, type: string) => {
        let routeType = '';
        switch (type) {
            case 'NFT Marketplace':
                routeType = 'marketplace';
                break;
            case 'NFT Collection':
                routeType = 'nft-collection';
                break;
            case 'Token':
                routeType = 'erc20token';
                break;
        }
        push(`admin/manage/${routeType}/${target}`);
    };

    const manipulate = (data) => {
        if (!data) return;
        if (data.length === 0 && !isFetching) return [];
        return data.map((mod) => {
            let metadata = {
                name: '',
            };
            metadata.name = mod.get('name');
            const typeText = mod.get('type');

            return rowData(metadata, typeText, mod);
        });
    };
    const rowData = (metadata: IMetadata, typeText: string, mod) => [
        <Avatar isRounded={true} key={114} theme="letters" text={metadata.name} />,
        <span key={432} style={{ fontSize: '16px', color: '#041836' }}>
            {metadata.name}
        </span>,
        <Tag key={2} color={getModuleColor(typeText)} text={typeText} />,
        <LinkTo
            key={3}
            text={getEllipsisTxt(mod.get('module'), 4)}
            address={`${getExplorer(chainId)}address/${mod.get('module')}`}
            type={'external'}
        />,
        <div key={5} style={{ display: 'grid', placeItems: 'center' }}>
            <Button text="Manage" onClick={() => pushToHistory(mod.get('module'), mod.get('type'))} />
        </div>,
    ];

    return (
        <>
            <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                data={manipulate(data)}
                header={columns}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {}}
                pageSize={5}
                customNoDataComponent={
                    !isFetching ? (
                        <div
                            key={'21415rs'}
                            style={{
                                display: 'grid',
                                placeItems: 'center',
                                textAlign: 'center',
                                gap: '25px',
                            }}
                        >
                            <Illustration key={'21w415rs'} logo={'servers'} width={'150'} height={'150'} />
                            <span key={'2141sad5rs'}>No Modules Installed</span>
                        </div>
                    ) : (
                        <div key={'214153ya2rs'}>Loading Modules ...</div>
                    )
                }
            />
        </>
    );
};

export default Overview;
