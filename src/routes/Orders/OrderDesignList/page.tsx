import { queryKeyStaff_OrderDesigns_GetAll, queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Flex, Table, Typography } from 'antd'

export default function OrderDesignListPage() {
    const navigate = useNavigate()

    const { data: orderDesigns, isLoading, isError } = useQuery(queryStaff_OrderDesigns_GetAll())

    if (isError) {
        return <div>Error...</div>
    }

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
                        },
                        {
                            title: 'Username',
                            dataIndex: 'username',
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                        },
                        {
                            title: 'Address',
                            dataIndex: 'address',
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (_, record) => (
                                <Dropdown.Button
                                    menu={{
                                        items: [],
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
                />
            </Flex>
        </>
    )
}
