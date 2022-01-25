// @ts-nocheck
import { Card, Illustration } from 'web3uikit';
import { Typography } from 'uikit/Typography';
import { ModulesGridStyled } from '../Adder.styles';
import { dropModule, packModule, marketplaceModule, tokenModule, collectionModule, bundleModule } from '../../types/modules';
import { useHistory, useRouteMatch } from 'react-router';

const ModuleSelector = () => {
    const nftModules = [collectionModule, bundleModule, dropModule];

    const otherModules = [marketplaceModule, tokenModule, packModule];

    const { push } = useHistory();
    let { path } = useRouteMatch();

    const pushToHistory = (target) => {
        push(`${path}/${target}`);
    };

    return (
        <>
            <Typography variant="h4">NFT Modules</Typography>
            <ModulesGridStyled>
                {nftModules.map((module) => {
                    return (
                        <div key={module.title} onClick={() => pushToHistory(module.key)} style={{ cursor: 'pointer' }}>
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
                            />
                        </div>
                    );
                })}
            </ModulesGridStyled>
            <Typography variant="h4">Other Modules</Typography>
            <ModulesGridStyled>
                {otherModules.map((module) => {
                    return (
                        <div key={module.title} onClick={() => pushToHistory(module.key)} style={{ cursor: 'pointer' }}>
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
                            />
                        </div>
                    );
                })}
            </ModulesGridStyled>
        </>
    );
};

export default ModuleSelector;
