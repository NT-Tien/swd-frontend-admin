import { queryDStaff_GetAll_OrderToDeliver } from '@/api/dstaff/DStaff_GetAll_OrderToDeliver'
import { Order } from '@/lib/types/Order'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Table } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function ToDeliverOrdersList() {
    const navigate = useNavigate()
    const [pageSize, setPageSize] = useState(8)
    const { data: orders, isLoading, isError } = useQuery(queryDStaff_GetAll_OrderToDeliver())

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    const searchColumnProps = GetColumnSearchProps<Order>()

    return (
        <Table
            dataSource={orders ?? []}
            columns={[
                {
                    title: 'No.',
                    render: (_, __, index) => index + 1,
                },
                {
                    title: 'Created At',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: value => dayjs(value).format('DD-MM-YYYY'),
                    sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    sortDirections: ['ascend', 'descend'],
                    width: 150,
                },
                {
                    title: 'Updated At',
                    dataIndex: 'updatedAt',
                    key: 'updatedAt',
                    render: value => dayjs(value).format('DD-MM-YYYY'),
                    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                    sortDirections: ['ascend', 'descend'],
                    width: 150,
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    ...searchColumnProps('email'),
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    sorter: (a, b) => parseFloat(a.total) - parseFloat(b.total),
                    sortDirections: ['ascend', 'descend'],
                    ...searchColumnProps('total'),
                },
                {
                    title: 'Status',
                    dataIndex: 'status_delivery',
                    key: 'status_delivery',
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (_, record) => {
                        return (
                            <Button
                                onClick={() => {
                                    navigate({
                                        to: OrdersViewRoute.to,
                                        params: {
                                            id: record.id.toString(),
                                        },
                                    })
                                }}
                            >
                                View
                            </Button>
                        )
                    },
                },
            ]}
            pagination={{
                pageSize: pageSize,
                total: orders?.length,
                pageSizeOptions: ['8', '16', '24', '32'],
                showSizeChanger: true,
                onShowSizeChange(_, size) {
                    setPageSize(size)
                },
                showTotal: (total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`
                },
                showLessItems: true,
                showQuickJumper: true,
            }}
            loading={isLoading}
        />
    )
}
