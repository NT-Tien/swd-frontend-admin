import Head from '@/common/components/Head'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import SendEmailModal from '@/routes/Orders/common/modal/SendEmailModal'
import SetPriceModal from '@/routes/Orders/common/modal/SetPriceModal'
import { Await, useNavigate } from '@tanstack/react-router'
import { Button, Descriptions, Flex, Spin, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function OrderDesignViewPage() {
    const navigate = useNavigate()
    const { orderDesign, account, currentFile } = OrderDesignViewRoute.useLoaderData()

    return (
        <>
            <Head title={`Order design details`} />
            <Flex justify='space-between'>
                <Typography.Title level={2}>Order Design View</Typography.Title>

                <Flex gap={10}>
                    {orderDesign.set_price ? (
                        <SendEmailModal>
                            {({ handleOpen }) => (
                                <Button onClick={() => handleOpen(orderDesign.id, orderDesign.user_id)}>Send Email</Button>
                            )}
                        </SendEmailModal>
                    ) : (
                        <Tooltip title='Please set price before sending email'>
                            <Button disabled>Send Email</Button>
                        </Tooltip>
                    )}
                    <SetPriceModal
                        afterUpdate={setPrice => {
                            navigate({
                                replace: true,
                                search: {
                                    setPrice,
                                },
                                to: OrderDesignViewRoute.to,
                                params: {
                                    id: orderDesign.id,
                                },
                            })
                        }}
                    >
                        {({ handleOpen }) => (
                            <Button onClick={() => handleOpen(orderDesign.id, Number(orderDesign.set_price))}>Set Price</Button>
                        )}
                    </SetPriceModal>
                    <Suspense fallback={<Spin size='small' />}>
                        <Await promise={currentFile}>
                            {file => (
                                <Tooltip title={file.status === 500 ? 'Error downloading File' : 'Download attached File'}>
                                    <Button download href={URL.createObjectURL(file.data)} disabled={file.status === 500}>
                                        Download
                                    </Button>
                                </Tooltip>
                            )}
                        </Await>
                    </Suspense>
                </Flex>
            </Flex>
            <Descriptions
                items={[
                    {
                        label: 'ID',
                        key: 'id',
                        children: orderDesign.id,
                    },
                    {
                        label: 'Created At',
                        key: 'createdAt',
                        children: dayjs(orderDesign.createdAt).format('YYYY-MM-DD HH:mm:ss'),
                    },
                    {
                        label: 'Updated At',
                        key: 'updatedAt',
                        children: dayjs(orderDesign.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
                    },
                    {
                        label: 'Deleted At',
                        key: 'deletedAt',
                        children: orderDesign.deletedAt ? dayjs(orderDesign.deletedAt).format('YYYY-MM-DD HH:mm:ss') : 'N/A',
                    },
                    {
                        label: 'User Email',
                        key: 'user_id',
                        children: (
                            <Suspense fallback={<Spin size='small' />}>
                                <Await promise={account}>{({ data: account }) => <>{account.email}</>}</Await>
                            </Suspense>
                        ),
                    },
                    {
                        label: 'Username',
                        key: 'username',
                        children: orderDesign.username,
                    },
                    {
                        label: 'Phone',
                        key: 'phone',
                        children: orderDesign.phone,
                    },
                    {
                        label: 'Address',
                        key: 'address',
                        children: orderDesign.address,
                    },
                    {
                        label: 'Set Price',
                        key: 'set_price',
                        children: orderDesign.set_price || 'N/A',
                    },
                ]}
            />
        </>
    )
}
