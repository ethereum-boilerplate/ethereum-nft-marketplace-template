import { useMoralis, useMoralisWeb3Api } from 'react-moralis'
import { Button, Image, Table } from 'antd'
import { useEffect, useState } from 'react'
// import { getEllipsisTxt } from 'helpers/formatters'
export default function CollectionList(props) {

    const { chainId } = useMoralis()
    const Web3Api = useMoralisWeb3Api()
    const [ allNFTs, setNFTs] = useState([])
    const [ isLoading, setLoading ] = useState(true)

    useEffect(() => {
        if(props.address) {
            setLoading(true)
            setNFTs([])
            Web3Api.token.getAllTokenIds({
                chain: chainId,
                address: props.address,
            }).then((res) => {
                setNFTs(res.result)
                setLoading(false)
            }).catch(() => setLoading(false))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const columns = [
        {
            title: '#',
            dataIndex: 'token_id',
            key: 'id'
        },
        {
            title: 'Image',
            dataIndex: 'metadata',
            key: 'img',
            render: (record) => {
                if(!record) {
                    return <p>No Image</p>
                }
                const metadata = JSON.parse(record)
                return <Image src={`https://ipfs.io/ipfs/${(metadata.image).split('ipfs://')[1]}`} width="50" height="50" />
            }
        },
        {
            title: 'Name',
            dataIndex: 'metadata',
            key: 'name',
            render: (record) => {
                if(!record) {
                    return <p>No Metadata</p>
                }
                const metadata = JSON.parse(record)
                return <p>{metadata.name}</p>
            }
        },
        {
            title: 'Description',
            dataIndex: 'metadata',
            key: 'desc',
            render: (record) => {
                if(!record) {
                    return <p>No Description</p>
                }
                const metadata = JSON.parse(record)
                return <p>{metadata.description}</p>
            }
        },
        {
            title: 'Actions',
            dataIndex: 'token_id',
            key: 'action',
            render: (record,item) => {
                // TODO: Transfer function
                return <Button>Transfer</Button>
            }
        }
    ]

    return (
        <div>
            <Table 
            loading={isLoading}
            dataSource={allNFTs} 
            columns={columns}
            scroll={{x: true}}
            rowKey={(record) => {
                return record.token_id;
            }}
            />
        </div>
    )
}
