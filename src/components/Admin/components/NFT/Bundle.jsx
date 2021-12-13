import { Table } from 'antd'
import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'

export default function Bundle() {
    const Web3Api = useMoralisWeb3Api()
    const columns = []
    const data = []

    return (
        <div>
            {data.length > 0 && <Table dataSource={data} columns={columns}/>}
            {data.length === 0 && <p>Mint your first Bundle</p>}
        </div>
    )
}
