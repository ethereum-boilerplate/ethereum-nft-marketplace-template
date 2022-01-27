// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useMarketplace } from '../../Module/contracts/NFT/useMarketplace';
import { Button, LinkTo, Table } from 'web3uikit';
import {useChain, useMoralis, useMoralisWeb3Api} from 'react-moralis';
import { getEllipsisTxt } from '../../../../helpers/formatters';
import { getExplorer } from '../../../../helpers/networks';
import {Image} from "antd";

interface IMarketplace {
    address?: string;
    web3?: any;
    ownListings?: boolean;
    admin?: any;
}
const Marketplace: React.FC<IMarketplace> = ({address, web3, ownListings = false, admin }) => {
    const { account, Moralis } = useMoralis();
    const { allListings, buy, unlist } = useMarketplace(web3, address, account);
    const { token } = useMoralisWeb3Api()
    const { chainId } = useChain();
    const [tableData, setTableData] = useState([]);
    const [isEmpty, setEmpty] = useState<boolean>(false);
    const [ isBuying, setIsBuying ] = useState<boolean>(false)

    useEffect(() => {
        if (allListings) {
            if(allListings.length === 0) return;
            console.log(ownListings)
            const canBeBoughtList = allListings.filter( value => {
                return value.quantity > 0
            })
            if(canBeBoughtList.length === 0) {
                setEmpty(true)
                return;
            }
            canBeBoughtList.forEach((nft) => {
                token.getTokenIdMetadata({
                    ["chain" as any]: chainId,
                    address: nft.assetContract,
                    token_id: nft.tokenId
                })
                    .then((metadataResult) => {
                        console.log('trigger')
                            const metadata = JSON.parse(metadataResult.metadata)
                        console.log('trigger 2')
                        token.getTokenMetadata({
                            addresses: [ nft.currency ],
                            ["chain" as any]: chainId
                        })
                            .then((tokenResult) => {

                                // @ts-ignore
                                const row = [
                                    <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                                        <span style={{color: "#041836", fontSize: "16px",}}>{nft.tokenId}</span>
                                    </div>,
                                    <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%", borderRadius: "15px", marginTop: "-5px"}}>
                                        <Image src={metadata.image ? metadata.image : ""} width={80} height={80} alt={""}/>
                                    </div>,
                                    <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                                        <span style={{color: "#041836", fontSize: "16px",}}>{metadata.name ? metadata.name : metadataResult.name ? metadataResult.name : ""}</span>
                                    </div>,
                                    <div style={{display: "grid", alignItems: "center", width: "100%", height: "100%"}}>
                                        <LinkTo text={getEllipsisTxt(nft.seller, 4)} address={`${getExplorer(chainId)}address/${nft.seller}`} type="external" />
                                    </div>,
                                    <div style={{display: "flex", alignItems: "center", gap: "5px", width: "100%", height: "100%"}}>
                                        <Image width={25} height={25} src={tokenResult[0].logo || "https://ropsten.etherscan.io/images/main/empty-token.png"} alt={""}/>
                                        <span style={{color: "#041836", textAlign: "center", fontSize: "16px"}}>{`${Moralis.Units.FromWei(nft.pricePerToken, Number(tokenResult[0].decimals))} ${tokenResult[0].symbol}`}</span>
                                    </div>,
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: "100%", height: "100%" }}>
                                        <Button isLoading={isBuying ? true : false} isFullWidth text={'Buy'} theme={'outline'} onClick={() => {
                                            setIsBuying(true)
                                            buy(nft.listingId, '1', nft.currency, nft.pricePerToken, account, setIsBuying)
                                        }} />
                                        { ((account.toLowerCase() === nft.seller.toLowerCase()) || (admin && (account.toLowerCase() === admin.toLowerCase()))) && <Button icon={"bin"} iconLayout={"icon-only"} theme={'outline'} onClick={() => unlist(nft.listingId, '1', account)}/>}
                                    </div>,
                                ]
                                setTableData(prevState => prevState.length === 0 ? [ row ] : [...prevState, row])

                            })


                    })
                    .catch((e) => {
                        console.log(e)
                        return;
                    })
            })

            /*printTable().then();*/
        }
        // eslint-disable-next-line
    }, [allListings]);


    return (
        <Table
            columnsConfig="50px 80px 2fr 0.75fr 1fr 1fr"
            data={tableData}
            header={[
                <div style={{...columnNameStyle, marginLeft: "20px"}}><span>#</span></div>,
                <div style={columnNameStyle}><span>Image</span></div>,
                <div style={columnNameStyle}><span>Name</span></div>,
                <div style={columnNameStyle}><span>Seller</span></div>,
                <div style={columnNameStyle}><span>Price</span></div>,
                <div style={columnNameStyle}><span>Actions</span></div>
            ]}
            maxPages={3}
            onPageNumberChanged={function noRefCheck() {}}
            pageSize={5}
            customNoDataText={!isEmpty ? 'Loading ...' : 'No Items listed yet'}
        />
    );
};

const columnNameStyle = {
    color: "#68738D",
    fontWeight: "500",
    fontSize: "14px",
    display: 'grid',
    placeItems: "flex-start",
    width: "100%",
    marginTop: "5px",
    marginBottom: "-5px"
}

export default Marketplace;
