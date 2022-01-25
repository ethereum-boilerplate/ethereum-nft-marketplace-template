// @ts-nocheck
import { useState, useEffect } from 'react';
import { Card, Illustration } from 'web3uikit';
import { useMoralis } from 'react-moralis';
import {
    dropModule,
    packModule,
    marketplaceModule,
    tokenModule,
    collectionModule,
    bundleModule,
} from '../types/modules';
import useProtocol from '../contracts/Protocol/useProtocol';
import Web3 from 'web3';
import NFTCollectionForm from '../../Forms/NFTCollection';
import MarketplaceForm from '../../Forms/Marketplace';
import TokenForm from '../../Forms/TokenForm';
import { Flex } from 'uikit/Flex/Flex';
import { ModulesGridStyled } from './Adder.styles';
import { Typography } from 'uikit/Typography';
import { HeaderStyled } from 'uikit/HeaderStyled';
export default function Adder() {
    const [selectedModule, setSelectedModule] = useState(null);
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

    const nftModules = [collectionModule, bundleModule, dropModule];

    const otherModules = [marketplaceModule, tokenModule, packModule];

    useEffect(() => {
        if (deployConfirmed) {
            setTimeout(() => {
                setDeployConfirmed(false);
            }, 5000);
        }
    }, [deployConfirmed]);

    // TODO:
    // Input Validation - create and bind function on add module
    const printSelectedModule = () => {
        if (
            selectedModule.key === 'bundleModule' ||
            selectedModule.key === 'lazyMintModule' ||
            selectedModule.key === 'packModule'
        ) {
            return <p>Coming Soon</p>;
        }
        if (selectedModule.key === 'marketPlaceModule') {
            if (hasMarketplace) {
                return <p>Cannot deploy another marketplace</p>;
            } else {
                return <MarketplaceForm web3={web3} />;
            }
        }
        if (selectedModule.key === 'erc721module') {
            return <NFTCollectionForm web3={web3} />;
        }
        if (selectedModule.key === 'tokenModule') {
            return <TokenForm web3={web3} />;
        }
        return <></>;
    };

    return (
        <Flex maxWidth="900px" width="100%">
            <HeaderStyled>
                <Typography variant="h1">Add Module</Typography>
                <Typography variant="span">
                    Please select a module first
                </Typography>
            </HeaderStyled>
            <Typography variant="h4">NFT Modules</Typography>
            <ModulesGridStyled>
                {nftModules.map((module) => {
                    return (
                        <div
                            key={module.title}
                            onClick={() =>
                                module === selectedModule
                                    ? setSelectedModule('')
                                    : setSelectedModule(module)
                            }
                        >
                            <Card
                                selected={module === selectedModule}
                                pressed={module === selectedModule}
                                title={module.title}
                                tooltipText={module.desc}
                                children={[
                                    <div
                                        key={module.title}
                                        style={{
                                            display: 'grid',
                                            placeItems: 'center',
                                        }}
                                    >
                                        <Illustration
                                            width="130px"
                                            height="200px"
                                            logo={module.logo}
                                        />
                                    </div>,
                                ]}
                            />
                        </div>
                    );
                })}
            </ModulesGridStyled>
            <Typography variant="h4">Other Modules</Typography>
            <ModulesGridStyled>
                {otherModules.map((module) => {
                    return (
                        <div
                            key={module.title}
                            onClick={() =>
                                module === selectedModule
                                    ? setSelectedModule('')
                                    : setSelectedModule(module)
                            }
                        >
                            <Card
                                title={module.title}
                                tooltipText={module.desc}
                                selected={module === selectedModule}
                                pressed={module === selectedModule}
                                children={[
                                    <div
                                        key={module.title}
                                        style={{
                                            display: 'grid',
                                            placeItems: 'center',
                                        }}
                                    >
                                        <Illustration
                                            width="130px"
                                            height="200px"
                                            logo={module.logo}
                                        />
                                    </div>,
                                ]}
                            />
                        </div>
                    );
                })}
            </ModulesGridStyled>

            {selectedModule?.key && printSelectedModule()}
        </Flex>
    );
}

const wrapper = {
    display: 'grid',
    gridGap: '1rem',
};
