import { Table } from 'antd'
import React from 'react'

export default function Bundle() {
    const columns = []
    const data = []

    return (
        <div>
            {data.length > 0 && <Table dataSource={data} columns={columns}/>}
            {data.length === 0 && <p>Mint your first Bundle</p>}
        </div>
    )
}
