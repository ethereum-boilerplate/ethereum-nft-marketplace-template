import { Table, Button, Image } from 'antd'
import { useMarketplace } from 'components/Admin/Module/contracts/NFT/useMarketplace'  
import { useMoralis } from 'react-moralis'
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider'
import React from 'react'
import { getEllipsisTxt } from 'helpers/formatters'
import { getExplorer } from 'helpers/networks'

export default function Marketplace(props) {
    const { Moralis, web3, isAuthenticated, authenticate } = useMoralis()
    const { chainId, walletAddress } = useMoralisDapp()
    const { allListings, unlist, buy, loadingListings } = useMarketplace(web3, props.address)

    const columns = [
        {
            title: 'Image',
            dataIndex: 'metadata',
            key: 'image',
            render: (record) => {
                let url = `https://ipfs.io/ipfs/${(record.image).split('ipfs://')[1]}`
                return (
                <Image
                src={url}
                width={"100px"}
                height={"100px"}
                />  
                )
            }      
        },
        {
            title: 'Description',
            dataIndex: 'metadata',
            key: 'desc',
            render: (record) => {
                return `${record.description}`
            }
        },
        {
            title: 'Properties',
            dataIndex: 'metadata',
            key: 'prop',
            render: (record) => {
                return `${JSON.stringify(record.properties)}`
            }
        },
        {
            title: 'Seller',
            dataIndex: 'seller',
            key: 'seller',
            render: (record) => {
                return (
                    <a href={`${getExplorer(chainId)}address/${record}`} rel={"noreferrer"} target={"_blank"}>{getEllipsisTxt(record, 4)}</a>
                )
            } 
        },
        {
            title: 'Price',
            dataIndex: 'pricePerToken',
            key: 'pricePerToken',
            render: (record, item) => {
                return <div>
                    <p style={{textAlign: 'center'}}>{Moralis.Units.FromWei(record, item[0].decimals)} {item.tokenInfo[0].symbol}</p>
                </div>
            }
        },
        {
            title: 'Actions',
            dataIndex: 'listingId',
            key: 'Action',
            render: (record, item) => {
                if(!isAuthenticated) {
                    return (
                        <Button onClick={() => authenticate()}>
                            Connect Wallet
                        </Button>
                    )
                }
                if(props.isAdmin) {
                    return (
                        <div style={{display: 'flex', gap: '0.25em'}}>
                        <Button onClick={async () =>{ 
                                await buy(item.listingId, "1", item.currency, item.pricePerToken,walletAddress)
                            }}
                            >
                            Buy
                        </Button>
                        <Button onClick={ async () => {
                            await unlist(record, "1", walletAddress)
                        }}>
                            Unlist
                        </Button>
                        </div>
                    )
                } else                 
                if(item.seller === walletAddress) {
                    return (
                        <Button onClick={ async () => {
                            await unlist(record, "1", walletAddress)
                        }}>
                            Unlist
                        </Button>
                    )
                } else 
                return (
                    <Button onClick={async () =>{ 
                        await buy(item.listingId, "1", item.currency, item.pricePerToken,walletAddress)
                    }}
                    >
                    Buy
                </Button>
                )
            
            }
        }
    ]


    return (
        <div>
            <Table
            loading={loadingListings}
            dataSource={allListings} 
            columns={columns} 
            scroll={{x: true}}
            />
        </div>
    )
}
