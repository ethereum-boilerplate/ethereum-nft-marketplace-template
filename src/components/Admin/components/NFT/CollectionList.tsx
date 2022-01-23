import {useChain, useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall} from 'react-moralis'
import { Image } from 'antd'
import React, { useEffect, useState } from 'react'
import {Table, Button } from "web3uikit";
import NFTMinterForm from "../../Forms/NFTMinter";
import {useMarketplace} from "../../Module/contracts/NFT/useMarketplace";
import useProtocol from "../../Module/contracts/Protocol/useProtocol";
export const CollectionList: React.FC = ({ address, web3 }) => {

    const { chainId } = useChain();
    const [ showMinter ] = useState(false);
    const [ tableData, setTableData ] = useState([]);
    const { marketplaceAddress } = useProtocol();
    const { account } = useMoralis()
    const { listNFT } = useMarketplace(web3, marketplaceAddress)

    const Web3Api = useMoralisWeb3Api()

    const { data } = useMoralisWeb3ApiCall(Web3Api.token.getAllTokenIds, {
        address: address,
        ["chain" as any]: chainId
    }, {autoFetch: true});


    useEffect(() => {
        if(data && data.result.length > 0) {
            const temp = []
            data.result.forEach((result, index) => {
                const metadata = JSON.parse(result.metadata)
                temp.push([
                    <span>{result.token_id}</span>,
                    // @ts-ignore
                    <Image height={50} width={50} style={{borderRadius: '15px'}} src={metadata.image ? `https://ipfs.io/ipfs/${(metadata.image)}` : `https://i.ibb.co/FzDBLqk/Image.png`}/>,
                    <span>{result.name}</span>,
                    <div style={{display: 'flex', width: '120%', gap: '15px'}}>
                        <Button theme={"outline"} isFullWidth onClick={() => {console.log('List')}} text={"Transfer"}/>
                        <Button
                            theme={"outline"}
                            isFullWidth
                            onClick={async () => {
                                await listNFT(result.token_address, result.token_id, "0x0000000000000000000000000000000000000000", 10, 1, 0, 0, 0, account)
                            }}
                            text={"List"}
                        />
                    </div>
                ])
                if(index === data.result.length-1) {
                    setTableData(temp)
                }
            })
        }
        // eslint-disable-next-line
    }, [ data ])


    return (
        <div>
            {!showMinter &&
                <Table
                columnsConfig="80px 2fr 2fr 2fr 2px"
                s
                data={tableData}
                header={[
                    '#',
                    <span>Logo</span>,
                    <span>Name</span>,
                    <span>Actions</span>
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {
                }}
                pageSize={5}
                customNoDataText={"Loading ..."}
            />}
            {showMinter && <NFTMinterForm address={address} web3={web3}/>}
        </div>
    )
}


/*
<div style={{display: 'grid', placeItems: 'center', gap: '5px'}}>
    <span>Collection is empty</span>
    <Button onClick={() => {
        setShowMinter(true)
    }} icon={"plus"} iconLayout={"leading"}  text={"Mint NFT"}/>
</div> */
