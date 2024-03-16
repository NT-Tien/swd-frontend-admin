import { queryKeyStaff_OrderDesigns_GetAll, queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { OrderDesign } from '@/lib/types/OrderDesign'
import { copyId } from '@/lib/util/copyId'
import GetColumnDateSearchProps from '@/lib/util/getColumnDateSearchProps'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { OrderDesignListRoute } from '@/routes/Orders/OrderDesignList'
import { OrderDesignListBreadcrumb } from '@/routes/Orders/OrderDesignList/breadcrumb'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Dropdown, Flex, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs'

export default function OrderDesignListPage() {
    const navigate = useNavigate()
    const { messageApi } = useMessage()
    const { data: orderDesigns, isLoading, isError } = useQuery(queryStaff_OrderDesigns_GetAll())
    const page = OrderDesignListRoute.useSearch({
        select: data => data.page,
    })
    const size = OrderDesignListRoute.useSearch({
        select: data => data.size,
    })

    if (isError) {
        return <div>Error...</div>
    }

    const columnSearchProps = GetColumnSearchProps<OrderDesign>()
    const columnDateSearchProps = GetColumnDateSearchProps<OrderDesign>()

    return (
        <>
            <Head title='Order Designs' />
            <Flex vertical>
                <Breadcrumb
                    style={{
                        marginBottom: '5px',
                    }}
                    items={[DashboardBreadcrumb(), OrderDesignListBreadcrumb({ isCurrent: true })]}
                />
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
                            title: 'No.',
                            render: (_, __, i) => i + 1,
                            width: 70,
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
                            onFilter: (value, record) => {
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
                                    return record.isMailed && record.isPaid
                                }
                                if (value === 'Not Paid') {
                                    return record.isMailed && !record.isPaid
                                }

                                return false
                            },
                        },
                        {
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            render: date => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
                            sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
                            defaultSortOrder: 'descend',
                            ...columnDateSearchProps('createdAt'),
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record) => (
                                <Dropdown.Button
                                    menu={{
                                        items: [copyId(record.id, messageApi)],
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
                        defaultCurrent: page,
                        pageSize: size,
                        total: orderDesigns?.length ?? 0,
                        pageSizeOptions: ['8', '16', '24', '32'],
                        showSizeChanger: true,
                        onShowSizeChange(_, size) {
                            navigate({
                                to: OrderDesignListRoute.to,
                                search: {
                                    page: 1,
                                    size,
                                },
                            })
                        },
                        onChange(page, size) {
                            navigate({
                                to: OrderDesignListRoute.to,
                                search: {
                                    page,
                                    size,
                                },
                            })
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
