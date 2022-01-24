import {useChain, useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall} from 'react-moralis'
import { Image } from 'antd'
import React, { useEffect, useState } from 'react'
import {Table, Button } from "web3uikit";
import NFTMinterForm from "../../Forms/NFTMinter";
import {useMarketplace} from "../../Module/contracts/NFT/useMarketplace";
import useProtocol from "../../Module/contracts/Protocol/useProtocol";
export const CollectionList: React.FC = ({ address, web3 }) => {

    const { chainId } = useChain();
    const [ showMinter, setShowMinter ] = useState(false);
    const [ isEmpty, setIsEmpty ] = useState(false);
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
            setIsEmpty(false)
            const temp = []
            data.result.forEach((result, index) => {
                const metadata = JSON.parse(result.metadata)
                console.log(metadata)
                temp.push([
                    <span>{result.token_id}</span>,
                    // @ts-ignore
                    <Image height={80} width={80} style={{borderRadius: '15px'}} src={metadata && metadata.image ? `${(metadata.image)}` : `https://i.ibb.co/FzDBLqk/Image.png`}/>,
                    <div>
                        <p>{metadata && metadata.name ? metadata.name :result.name}</p>
                        <span style={{fontSize: "small", color: "gray", display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "50ch"}}>{metadata && metadata.description ? metadata.description : "No Description"}</span>
                    </div>,
                    <div style={{display: 'flex', width: '120%', gap: '15px'}}>
                        <Button theme={"outline"} isFullWidth onClick={() => {console.log('List')}} text={"Transfer"}/>
                        <Button
                            theme={"outline"}
                            isFullWidth
                            onClick={async () => {
                                await listNFT(result.token_address, result.token_id, "0x5A450A88d138e19eF2280d5c2406830C47Cb2014", 10, 1, 0, 0, 0, account)
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
        if(data && data.result.length === 0) {
            setIsEmpty(true)
        }
        // eslint-disable-next-line
    }, [ data ])


    return (
        <div>
            {!showMinter &&
                <Button theme={"primary"} text={"Mint NFT"} icon={"plus"} iconLayout={"leading"} onClick={() => setShowMinter(true)}/>
            }
            {!showMinter &&
                <Table
                columnsConfig="80px 90px 2fr 1fr"
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
                customNoDataText={!isEmpty ? "Loading ..." : "Collection is empty"}
            />}
            {showMinter && <NFTMinterForm address={address} web3={web3}/>}
        </div>
    )
}
