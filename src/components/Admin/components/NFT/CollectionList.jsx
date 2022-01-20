import {useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall} from 'react-moralis'
import { Image } from 'antd'
import { useEffect, useState } from 'react'
import {Table, Button} from "web3uikit";
import NFTMinterForm from "../../Forms/NFTMinter";
export default function CollectionList({ address, web3 }) {

    const { chainId } = useMoralis()
    const [ showMinter, setShowMinter ] = useState(false)
    const [ tableData, setTableData ] = useState([]);
    const [ isLoading, setLoading ] = useState(true)

    const Web3Api = useMoralisWeb3Api()

    const { data } = useMoralisWeb3ApiCall(Web3Api.token.getAllTokenIds, {
        address: address,
        chain: chainId
    }, {autoFetch: true});


    useEffect(() => {
        setLoading(true)
        if(data && data.result.length > 0) {
            const temp = []
            data.result.forEach((result, index) => {
                console.log(JSON.parse(result.metadata))
                const metadata = JSON.parse(result.metadata)
                temp.push([
                    <span>{result.token_id}</span>,
                    <Image height={50} width={50} style={{borderRadius: '15px'}} src={metadata.image ? `https://ipfs.io/ipfs/${(metadata.image)}` : `https://i.ibb.co/FzDBLqk/Image.png`}/>,
                    <span>{result.name}</span>,
                    <div style={{display: 'flex', width: '120%', gap: '15px'}}>
                        <Button isFullWidth onClick={() => {console.log('List')}} text={"List"}/>
                        <Button isFullWidth onClick={() => {console.log('Transfer')}} text={"Transfer"}/>
                    </div>
                ])
                console.log(temp)
                if(index === data.result.length-1) {
                    setTableData(temp)
                }
            })
        }
        setLoading(false)
    }, [ data ])


    return (
        <div>
            {!showMinter &&
                <Table
                columnsConfig="80px 3fr 2fr 2fr 80px"
                s
                data={tableData}
                header={[
                    '#',
                    <span>Logo</span>,
                    <span>Name</span>,
                    ''
                ]}
                maxPages={3}
                onPageNumberChanged={function noRefCheck() {
                }}
                pageSize={5}
                customNoDataText={ !isLoading ?
                    <div style={{display: 'grid', placeItems: 'center', gap: '5px'}}>
                        <span>Collection is empty</span>
                        <Button onClick={() => {
                            setShowMinter(true)
                        }} icon={"plus"} iconLayout={"leading"} theme={"primary"} text={"Mint NFT"}/>
                    </div> : "Loading ..."
                }

            />}
            {showMinter && <NFTMinterForm address={address} web3={web3}/>}
        </div>
    )
}
