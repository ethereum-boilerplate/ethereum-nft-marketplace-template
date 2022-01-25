// @ts-nocheck
import { Card, Illustration } from 'web3uikit';
import { Typography } from 'uikit/Typography';
import { HeaderStyled } from 'uikit/HeaderStyled';
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

    const wrapper = {
        display: 'grid',
        gridGap: '1rem',
    };

    return (
        <>
            <HeaderStyled>
                <Typography variant="h1">Add Module</Typography>
                <Typography variant="span">Please select a module first</Typography>
            </HeaderStyled>
            <Typography variant="h4">NFT Modules</Typography>
            <ModulesGridStyled>
                {nftModules.map((module) => {
                    console.log('module', module);
                    return (
                        <div key={module.title} onClick={() => pushToHistory(module.key)}>
                            <Card
                                // selected={module === selectedModule}
                                // pressed={module === selectedModule}
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
                        <div
                            key={module.title}
                            // onClick={() => (module === selectedModule ? setSelectedModule('') : setSelectedModule(module))}
                        >
                            <Card
                                title={module.title}
                                tooltipText={module.desc}
                                // selected={module === selectedModule}
                                // pressed={module === selectedModule}
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
