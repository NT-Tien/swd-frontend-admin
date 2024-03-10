import { queryKeyStaff_OrderDesigns_GetAll, queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import SendEmailModal from '@/routes/Orders/common/modal/SendEmailModal'
import SetPriceModal from '@/routes/Orders/common/modal/SetPriceModal'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Flex, Table, Typography } from 'antd'
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
                <SendEmailModal>
                    {({ handleOpen: openSendEmail }) => (
                        <SetPriceModal>
                            {({ handleOpen: openSetPrice }) => (
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
                                            title: 'Price',
                                            dataIndex: 'set_price',
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
                                                            {
                                                                label: 'Set Price',
                                                                onClick: () => {
                                                                    openSetPrice(record.id, Number(record.set_price))
                                                                },
                                                                key: 'set-price',
                                                            },
                                                            {
                                                                label: 'Send Email',
                                                                disabled: record.set_price === null,
                                                                onClick: () => {
                                                                    record.set_price !== null && openSendEmail(record.id, record.user_id)
                                                                },
                                                                key: 'send-email',
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
                                    dataSource={orderDesigns?.sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))}
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
                            )}
                        </SetPriceModal>
                    )}
                </SendEmailModal>
            </Flex>
        </>
    )
}
