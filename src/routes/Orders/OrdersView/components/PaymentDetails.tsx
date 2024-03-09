import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { Card, Descriptions, Table, Typography } from 'antd'
import dayjs from 'dayjs'

export default function PaymentDetails() {
    const payment = OrdersViewRoute.useLoaderData({
        select: data => data.order.payment,
    })

    return (
        <div>
            {payment ? (
                <>
                    <Card
                        style={{
                            marginBottom: '10px',
                        }}
                    >
                        <Descriptions
                            title='Payment Details'
                            items={[
                                {
                                    label: 'Payment ID',
                                    children: payment.id,
                                },
                                {
                                    label: 'Order Code',
                                    children: payment.orderCode,
                                },
                                {
                                    label: 'Total Amount',
                                    children: payment.amount,
                                },
                                {
                                    label: 'Amount Paid',
                                    children: payment.amountPaid,
                                },
                                {
                                    label: 'Status',
                                    children: payment.status,
                                },
                            ]}
                        />
                    </Card>
                    <Table
                        title={() => <Typography.Title level={5}>Transactions</Typography.Title>}
                        columns={[
                            {
                                title: 'Amount',
                                dataIndex: 'amount',
                            },
                            {
                                title: 'Transaction Date',
                                dataIndex: 'transactionDateTime',
                                render: value => dayjs(value).format('YYYY-MM-DD'),
                            },
                            {
                                title: 'Reference',
                                dataIndex: 'reference',
                            },
                            {
                                title: 'Description',
                                dataIndex: 'description',
                            },
                            {
                                title: 'Account Number',
                                dataIndex: 'accountNumber',
                            },
                            {
                                title: 'Counter Account Name',
                                dataIndex: 'counterAccountName',
                            },
                            {
                                title: 'Virtual Account Name',
                                dataIndex: 'virtualAccountName',
                            },
                            {
                                title: 'Counter Account Bank Name',
                                dataIndex: 'counterAccountBankName',
                            },
                            {
                                title: 'Counter Account Number',
                                dataIndex: 'counterAccountNumber',
                            },
                            {
                                title: 'Virtual Account Number',
                                dataIndex: 'virtualAccountNumber',
                            },
                        ]}
                        dataSource={payment.transactions}
                    />
                </>
            ) : (
                <Typography.Text type='danger'>Payment details not found</Typography.Text>
            )}
        </div>
    )
}
