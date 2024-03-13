import { queryKeyStaff_OrderDesigns_GetAll, queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { OrderDesign } from '@/lib/types/OrderDesign'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Flex, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function OrderDesignListPage() {
    const navigate = useNavigate()
    const { messageApi } = useMessage()
    const [pageSize, setPageSize] = useState(8)
    const { data: orderDesigns, isLoading, isError } = useQuery(queryStaff_OrderDesigns_GetAll())

    if (isError) {
        return <div>Error...</div>
    }

    const columnSearchProps = GetColumnSearchProps<OrderDesign>()

    return (
        <>
            <Head title='Order Designs' />
            <Flex vertical gap={0}>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Order Designs
                    <RefreshButton isLoading={false} queryKey={queryKeyStaff_OrderDesigns_GetAll()} />
                </Typography.Title>
                <Table
                    columns={[
                        {
                            title: 'ID',
                            render: (_, __, i) => i + 1,
                            width: 50,
                        },
                        {
                            title: 'Username',
                            dataIndex: 'username',
                            width: 150,
                            ellipsis: true,
                            sorter: (a, b) => a.username.localeCompare(b.username),
                            ...columnSearchProps('username'),
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                            width: 150,
                            ellipsis: true,
                            ...columnSearchProps('phone'),
                        },
                        {
                            title: 'Address',
                            dataIndex: 'address',
                            ellipsis: true,
                            width: 200,
                            ...columnSearchProps('address'),
                        },
                        {
                            title: 'Price',
                            dataIndex: 'set_price',
                            render: price => price ?? <Tag color='red-inverse'>Not Set</Tag>,
                            sorter: (a, b) => Number(a.set_price ?? 0) - Number(b.set_price ?? 0),
                            filters: [
                                {
                                    text: 'Not Set',
                                    value: 'Not Set',
                                },
                                {
                                    text: 'Set',
                                    value: 'Set',
                                },
                            ],
                            onFilter: (value, record) => (record.set_price === null ? value === 'Not Set' : value === 'Set'),
                        },
                        {
                            title: 'Status',
                            render: (_, record) => (
                                <Flex gap={3} align='center'>
                                    <Tag color={record.isMailed ? 'green-inverse' : record.isDenied ? 'red-inverse' : 'default'}>
                                        {record.isMailed ? 'Accepted' : record.isDenied ? 'Denied' : 'Pending'}
                                    </Tag>
                                    {record.isMailed && (
                                        <Tag color={record.isPaid ? 'green-inverse' : 'red-inverse'}>
                                            {record.isPaid ? 'Paid' : 'Not Paid'}
                                        </Tag>
                                    )}
                                </Flex>
                            ),
                            filters: [
                                {
                                    text: 'Pending',
                                    value: 'Pending',
                                },
                                {
                                    text: 'Accepted',
                                    value: 'Accepted',
                                },
                                {
                                    text: 'Denied',
                                    value: 'Denied',
                                },
                                {
                                    text: 'Paid',
                                    value: 'Paid',
                                },
                                {
                                    text: 'Not Paid',
                                    value: 'Not Paid',
                                },
                            ],
                            onFilter(value, record) {
                                if (value === 'Pending') {
                                    return !record.isMailed && !record.isDenied
                                }
                                if (value === 'Accepted') {
                                    return record.isMailed && !record.isDenied
                                }
                                if (value === 'Denied') {
                                    return record.isDenied
                                }
                                if (value === 'Paid') {
                                    return record.isPaid
                                }
                                if (value === 'Not Paid') {
                                    return !record.isPaid
                                }

                                return true
                            },
                        },
                        {
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            render: date => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
                            sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
                            defaultSortOrder: 'descend',
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record) => (
                                <Dropdown.Button
                                    menu={{
                                        items: [
                                            {
                                                label: 'Copy ID',
                                                onClick: () => {
                                                    navigator.clipboard.writeText(record.id)
                                                    messageApi.success('Copied ID')
                                                },
                                                key: 'copy-id',
                                            },
                                        ],
                                    }}
                                    onClick={() => {
                                        navigate({
                                            to: OrderDesignViewRoute.to,
                                            params: {
                                                id: record.id,
                                            },
                                        })
                                    }}
                                >
                                    View
                                </Dropdown.Button>
                            ),
                        },
                    ]}
                    dataSource={orderDesigns}
                    loading={isLoading}
                    pagination={{
                        pageSize: pageSize,
                        total: orderDesigns?.length ?? 0,
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
                />
            </Flex>
        </>
    )
}
