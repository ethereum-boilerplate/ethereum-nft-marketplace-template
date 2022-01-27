import React, { useState } from 'react';
import {
    useMoralisQuery,
    useMoralis,
} from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getModuleColor } from '../../../../helpers/modules';
import {
    Avatar,
    Dropdown,
    DropdownElement,
    Icon,
    LinkTo,
    Table,
    Tag,
    Modal,
    Illustration,
} from 'web3uikit';
import Marketplace from '../../components/NFT/Marketplace';
import Token from '../../components/Token';
import { CollectionList } from '../../components/NFT/CollectionList';
import { getExplorer } from '../../../../helpers/networks';
import {IMetadata, ISelectedModule} from "./interfaces";

import {columnNameStyle} from "./styles";

const columns = [
    '',
    <div style={columnNameStyle}>
        <span>Name</span>
    </div>,
    <div style={columnNameStyle}>
        <span>Type</span>
    </div>,
    <div style={columnNameStyle}>
        <span>Module</span>
    </div>,
    '',
]

export default function Overview({ web3 }) {

    const { data, isFetching } = useMoralisQuery(
        'InstalledModules',
        (query) => query.limit(100),
        [],
        { live: true }
    );
    const { chainId } = useMoralis();
    const [selectedModule, setSelectedModule] = useState<ISelectedModule>();
    const [showModal, setShowModal] = useState<boolean>(false);


    const manipulate = (data) => {
        if(!data) return;
        if(data.length === 0 && !isFetching) return [];
        return data.map((mod ) => {

            let metadata = {
                name: '',
            }

            metadata.name = mod.get('name')
            const typeText = mod.get('type')

            return rowData(metadata, typeText, mod)

        })

    }

    const rowData = (metadata: IMetadata, typeText: string, mod) => [
        <Avatar isRounded={true} key={1} theme="letters" text={metadata.name} />,
        <span style={{fontSize: "16px", color: "#041836"}}>{metadata.name}</span>,
        <Tag key={2} color={getModuleColor(typeText)} text={typeText} />,
        <LinkTo
            key={3}
            text={getEllipsisTxt(mod.get('module'), 4)}
            address={`${getExplorer(chainId)}address/${mod.get('module')}`}
            type={"external"}
        />,
        <div style={{ display: 'grid', placeItems: 'center' }}>
            <Dropdown
                key={34}
                parent={
                    <Icon
                        key="3"
                        fill="#2E7DAF"
                        size={20}
                        // @ts-ignore
                        svg={"more vert"}
                    />
                }
                position="top"
                children={[
                    <DropdownElement
                        backgroundColor="transparent"
                        // @ts-ignore
                        icon="testnet"
                        iconSize={12}
                        onClick={() => {
                            setSelectedModule({
                                type: typeText,
                                module: mod.get('module'),
                                key: mod.get('module'),
                                metadata,
                            });
                            setShowModal(true);
                        }}
                        text="Manage"
                        textColor="#FFFFFF"
                        key={14}
                    />,
                ]}
            />
        </div>,
    ];

    const printModuleInModal = (type, selectedModule) => {
        if (type === 'NFT Marketplace') {
            return <Marketplace web3={web3} address={selectedModule.module} />;
        }
        if (type === 'NFT Collection') {
            return (
                <CollectionList web3={web3} address={selectedModule.module} />
            );
        }
        if (type === 'Token') {
            return <Token address={selectedModule.module} web3={web3}  />;
        }
    };


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
                (!isFetching) ? <div
                    style={{
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    gap: "25px"
                }}
                    >
                    <Illustration logo={"servers"} width={"150"} height={"150"} />
                    <span>No Modules Installed</span>
                    </div> : <div>Loading Modules ...</div>
                }
            />
            <Modal
                cancelText="Close"
                children={[selectedModule ? printModuleInModal(selectedModule.type, selectedModule) : <></>]}
                id="disabled"
                isOkDisabled
                isVisible={showModal}
                okText="Ok"
                onCancel={() => setShowModal(false)}
                onOk={function noRefCheck() {}}
                title={`${getEllipsisTxt(selectedModule?.module)} ${selectedModule?.type}`}
            />
        </>
    );
}