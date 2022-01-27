import {Card, Illustration, Tooltip} from 'web3uikit';
import { Typography } from 'uikit/Typography';
import { ModulesGridStyled } from '../Adder.styles';
import {
    dropModule,
    packModule,
    marketplaceModule,
    tokenModule,
    collectionModule,
    bundleModule,
    moduleTypes, IModule
} from '../../types/modules';
import { useHistory, useRouteMatch } from 'react-router';
import {ReactNode} from "react";

const ModuleSelector = () => {
    const nftModules = [collectionModule, bundleModule, dropModule];

    const otherModules = [marketplaceModule, tokenModule, packModule];

    const { push } = useHistory();
    let { path } = useRouteMatch();

    const pushToHistory = (target) => {
        push(`${path}/${target}`);
    };

    const isComingSoon = (module: moduleTypes): boolean => {
        return ((module === "bundleModule") || (module === "lazyMintModule") || (module === "packModule"))
    }

    const printCard = (module: IModule): ReactNode[] => {
        return (
            [
                <Card
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
                        <Illustration width="130px" height="200px" logo={module.logo} />
                    </div>,
                ]}
                // @ts-ignore
                isDisabled={isComingSoon(module.key)}
                key={module.key}
             />
            ]
        )
    }

    return (
        <>
            <Typography variant="h4">NFT Modules</Typography>
            <ModulesGridStyled>
                {nftModules.map((module) => {
                    return (
                        <div key={module.title} onClick={() => {
                            if(isComingSoon(module.key)) return;
                            pushToHistory(module.key)
                        }} style={{ cursor: isComingSoon(module.key) ? 'not-allowed' : 'pointer' }}>
                            { isComingSoon(module.key) ? printCard(module) : (
                                <Tooltip
                                    position={"bottom"}
                                    text={"Coming Soon 👀"}
                                    children={printCard(module)}
                                />
                            ) }
                        </div>
                    );
                })}
            </ModulesGridStyled>
            <Typography variant="h4">Other Modules</Typography>
            <ModulesGridStyled>
                {otherModules.map((module) => {
                    return (
                        <div key={module.title} onClick={() => {
                            if(isComingSoon(module.key)) return;
                            pushToHistory(module.key)
                        }} style={{ cursor: isComingSoon(module.key) ? 'not-allowed' : 'pointer' }}>
                            { isComingSoon(module.key) ? printCard(module) : (
                                <Tooltip
                                    position={"top"}
                                    text={"Coming Soon 👀"}
                                    children={printCard(module)}
                                />
                            ) }
                        </div>
                    );
                })}
            </ModulesGridStyled>
        </>
    );
};

export default ModuleSelector;
