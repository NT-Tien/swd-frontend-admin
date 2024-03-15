import { queryKeyWalletTransaction_GetAll, queryWalletTransaction_GetAll } from '@/api/wallet-transaction/WalletTransaction_GetAll'
import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { WalletTransaction } from '@/lib/types/WalletTransaction'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { TransactionListRoute } from '@/routes/Transactions/TransactionList'
import { TransactionListBreadcrumb } from '@/routes/Transactions/TransactionList/breadcrumb'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Dropdown, Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'

export default function TransactionListPage() {
    const navigate = useNavigate()
    const { data: transactions, isLoading, isError } = useQuery(queryWalletTransaction_GetAll())
    const { messageApi } = useMessage()
    const page = TransactionListRoute.useSearch({
        select: data => data.page,
    })
    const size = TransactionListRoute.useSearch({
        select: data => data.size,
    })

    const searchColumnProps = GetColumnSearchProps<WalletTransaction>()

    if (isError) {
        return <div>Failed to load data</div>
    }

    return (
        <>
            <Head title='Wallet Transactions' />
            <Flex vertical>
                <Breadcrumb
                    style={{
                        marginBottom: '5px',
                    }}
                    items={[DashboardBreadcrumb(), TransactionListBreadcrumb({ isCurrent: true })]}
                />
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Wallet Transaction List
                    <RefreshButton isLoading={false} queryKey={queryKeyWalletTransaction_GetAll()} />
                </Typography.Title>
                <Table
                    dataSource={transactions ?? []}
                    columns={[
                        {
                            title: 'No.',
                            render: (_, __, index) => index + 1,
                            width: 70,
                        },
                        {
                            title: 'Wallet ID',
                            dataIndex: 'wallet_id',
                            key: 'wallet_id',
                            ellipsis: true,
                            width: 150,
                        },
                        {
                            title: 'Amount',
                            dataIndex: 'amount',
                            key: 'amount',
                            sorter: (a, b) => a.amount - b.amount,
                            sortDirections: ['ascend', 'descend'],
                            width: 150,
                        },
                        {
                            title: 'Fee',
                            dataIndex: 'fee',
                            key: 'fee',
                            sorter: (a, b) => a.fee - b.fee,
                            sortDirections: ['ascend', 'descend'],
                            width: 150,
                        },
                        {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            ellipsis: true,
                            ...searchColumnProps('type'),
                        },
                        {
                            title: 'Created At',
                            dataIndex: 'createdAt',
                            key: 'createdAt',
                            render: date => dayjs(date).format('DD MMM YYYY HH:mm:ss'),
                            sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                            sortDirections: ['ascend', 'descend'],
                            width: 200,
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
                                        window.navigator.clipboard.writeText(record.wallet_id)
                                        messageApi.success('Copied wallet ID to clipboard')
                                    }}
                                >
                                    Copy ID
                                </Dropdown.Button>
                            ),
                        },
                    ]}
                    pagination={{
                        defaultCurrent: page,
                        pageSize: size,
                        total: transactions?.length,
                        pageSizeOptions: ['8', '16', '24', '32'],
                        showSizeChanger: true,
                        onShowSizeChange(page, size) {
                            navigate({
                                to: TransactionListRoute.to,
                                search: {
                                    page,
                                    size,
                                },
                            })
                        },
                        onChange: (page, size) => {
                            navigate({
                                to: TransactionListRoute.to,
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
                    loading={isLoading}
                />
            </Flex>
        </>
    )
}
