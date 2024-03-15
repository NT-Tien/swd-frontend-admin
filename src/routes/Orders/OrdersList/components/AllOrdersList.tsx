import { queryOrder_GetAll } from '@/api/order/Order_GetAll'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { DeliveryStatus, Order } from '@/lib/types/Order'
import { copyId } from '@/lib/util/copyId'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { orderStatusTag } from '@/routes/Orders/common/util/orderStatusTag'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'
import dayjs from 'dayjs'

export default function AllOrdersList() {
    const navigate = useNavigate()
    const { messageApi } = useMessage()
    const { data: orders, isLoading, isError } = useQuery(queryOrder_GetAll())
    const page = OrdersListRoute.useSearch({
        select: data => data.page!,
    })
    const size = OrdersListRoute.useSearch({
        select: data => data.size!,
    })

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    const searchColumnProps = GetColumnSearchProps<Order>()

    return (
        <Table
            key='all-orders-list'
            dataSource={orders ?? []}
            columns={[
                {
                    title: 'No.',
                    render: (_, __, index) => index + 1,
                    width: 70,
                },
                {
                    title: 'Created At',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: value => dayjs(value).format('DD-MM-YYYY, HH:mm:ss'),
                    sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                    sortDirections: ['ascend', 'descend'],
                },
                {
                    title: 'Updated At',
                    dataIndex: 'updatedAt',
                    key: 'updatedAt',
                    render: value => dayjs(value).format('DD-MM-YYYY, HH:mm:ss'),
                    sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                    sortDirections: ['ascend', 'descend'],
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                    width: '200px',
                    ellipsis: true,
                    ...searchColumnProps('email'),
                },
                {
                    title: 'Total',
                    dataIndex: 'total',
                    key: 'total',
                    sorter: (a, b) => parseFloat(a.total) - parseFloat(b.total),
                    sortDirections: ['ascend', 'descend'],
                },
                {
                    title: 'Status',
                    dataIndex: 'status_delivery',
                    key: 'status_delivery',
                    render: value => orderStatusTag(value),
                    filters: Object.values(DeliveryStatus).map(status => ({
                        text: status,
                        value: status,
                    })),
                    onFilter: (value, record) => record.status_delivery === value,
                    align: 'center',
                },
                {
                    title: 'Action',
                    dataIndex: 'action',
                    key: 'action',
                    render: (_, record) => {
                        return (
                            <Dropdown.Button
                                menu={{
                                    items: [copyId(record.id, messageApi)],
                                }}
                                onClick={() => {
                                    navigate({
                                        to: OrdersViewRoute.to,
                                        params: {
                                            id: record.id,
                                        },
                                    })
                                }}
                            >
                                View
                            </Dropdown.Button>
                        )
                    },
                },
            ]}
            pagination={{
                defaultCurrent: page,
                pageSize: size,
                total: orders?.length,
                pageSizeOptions: ['8', '16', '24', '32'],
                showSizeChanger: true,
                onShowSizeChange(page, size) {
                    navigate({
                        to: OrdersListRoute.to,
                        search: {
                            size,
                            page,
                            tab: 'all',
                        },
                    })
                },
                onChange(page, size) {
                    navigate({
                        to: OrdersListRoute.to,
                        search: {
                            size,
                            page,
                            tab: 'all',
                        },
                    })
                },
                showTotal: (total, range) => {
                    return `${range[0]}-${range[1]} of ${total} items`
                },
                showLessItems: true,
                showQuickJumper: true,
            }}
            loading={isLoading}
            summary={data => {
                const totalRevenue = data.reduce((acc, curr) => acc + parseFloat(curr.total), 0)

                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0} />
                        <Table.Summary.Cell index={1} />
                        <Table.Summary.Cell index={2} />
                        <Table.Summary.Cell index={3} />
                        <Table.Summary.Cell index={4}>
                            Total: <strong>{totalRevenue} VND</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )
            }}
        />
    )
}
