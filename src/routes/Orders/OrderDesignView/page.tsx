import { queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import { Staff_OrderDesigns_SetPaid } from '@/api/staff/Staff_OrderDesigns_SetPaid'
import Head from '@/common/components/Head'
import ModalWrapper from '@/common/components/modal/ModalWrapper'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import SendEmailModal from '@/routes/Orders/common/modal/SendEmailModal'
import SetPriceModal from '@/routes/Orders/common/modal/SetPriceModal'
import { CopyFilled, MoreOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Await, useNavigate } from '@tanstack/react-router'
import { Button, Card, Descriptions, Dropdown, Flex, Spin, Tag, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function OrderDesignViewPage() {
    const navigate = useNavigate()
    const { orderDesign, account, currentFile } = OrderDesignViewRoute.useLoaderData()
    const { messageApi } = useMessage()

    const setPaidMutation = useMutation({
        mutationFn: Staff_OrderDesigns_SetPaid,
        onSettled: () => {
            messageApi.destroy('set-paid')
        },
        onSuccess: async () => {
            setTimeout(() => {
                messageApi.success('Successfully set order as paid')
            }, 250)
            await queryClient.invalidateQueries(queryStaff_OrderDesigns_GetAll())
            navigate({
                replace: true,
                to: OrderDesignViewRoute.to,
                search: {
                    hasPaid: 'paid',
                },
                params: {
                    id: orderDesign.id,
                },
            })
        },
        onError(error) {
            devLog('Error setting paid: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Please wait...',
                key: 'set-paid',
            })
        },
    })

    return (
        <>
            <Head title={`Order design details`} />
            <Flex justify='space-between'>
                <Typography.Title level={2}>
                    Order Design View{' '}
                    <Flex
                        gap={3}
                        align='center'
                        style={{
                            marginLeft: '10px',
                            display: 'inline',
                        }}
                    >
                        <Tag color={orderDesign.isMailed ? 'green-inverse' : orderDesign.isDenied ? 'red-inverse' : 'default'}>
                            {orderDesign.isMailed ? 'Accepted' : orderDesign.isDenied ? 'Denied' : 'Pending'}
                        </Tag>
                        {orderDesign.isMailed && (
                            <Tag color={orderDesign.isPaid ? 'green-inverse' : 'red-inverse'}>
                                {orderDesign.isPaid ? 'Paid' : 'Not Paid'}
                            </Tag>
                        )}
                    </Flex>
                </Typography.Title>

                <Flex gap={10}>
                    {orderDesign.isMailed && !orderDesign.isPaid && (
                        <Suspense fallback={<Button loading />}>
                            <Await promise={account}>
                                {({ data: account }) => (
                                    <ModalWrapper
                                        modalProps={{
                                            title: 'Please confirm customer has paid.',
                                            footer: null,
                                        }}
                                        modalComponent={({ setOpen }) => (
                                            <>
                                                <Card>
                                                    <Descriptions
                                                        title='Order Details'
                                                        column={1}
                                                        items={[
                                                            {
                                                                key: 'Email',
                                                                label: 'Email',
                                                                children: account.email,
                                                            },
                                                            {
                                                                key: 'Phone',
                                                                label: 'phone',
                                                                children: orderDesign.phone,
                                                            },
                                                            {
                                                                key: 'amount',
                                                                label: 'Amount',
                                                                children: orderDesign.set_price,
                                                            },
                                                        ]}
                                                    />
                                                </Card>
                                                <Flex
                                                    justify='end'
                                                    gap={10}
                                                    style={{
                                                        marginTop: '10px',
                                                    }}
                                                >
                                                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                                                    <Button
                                                        type='primary'
                                                        onClick={async () => {
                                                            await setPaidMutation.mutateAsync({
                                                                orderId: orderDesign.id,
                                                            })
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        Customer has paid
                                                    </Button>
                                                </Flex>
                                            </>
                                        )}
                                    >
                                        {({ handleOpen }) => <Button onClick={handleOpen}>Customer has paid</Button>}
                                    </ModalWrapper>
                                )}
                            </Await>
                        </Suspense>
                    )}
                    <SendEmailModal>
                        {({ handleOpen: openSendEmail }) => (
                            <SetPriceModal
                                afterUpdate={result => {
                                    navigate({
                                        replace: true,
                                        to: OrderDesignViewRoute.to,
                                        search: {
                                            result,
                                        },
                                        params: {
                                            id: orderDesign.id,
                                        },
                                    })
                                }}
                            >
                                {({ handleOpen: openSetPrice }) => (
                                    <Dropdown
                                        disabled={orderDesign.isDenied || orderDesign.isMailed}
                                        menu={{
                                            items: [
                                                {
                                                    key: 'set-price',
                                                    label: 'Set Price',
                                                    onClick: () => {
                                                        openSetPrice(orderDesign.id, Number(orderDesign.set_price ?? 0))
                                                    },
                                                },
                                                {
                                                    type: 'divider',
                                                },
                                                {
                                                    key: 'Accept',
                                                    label: 'Accept Order',
                                                    disabled: orderDesign.set_price === null,
                                                    onClick: async () => {
                                                        openSendEmail(orderDesign.id, orderDesign.user_id, true)
                                                    },
                                                },
                                                {
                                                    danger: true,
                                                    key: 'Reject',
                                                    label: 'Reject Order',
                                                    onClick: async () => {
                                                        openSendEmail(orderDesign.id, orderDesign.user_id, false)
                                                    },
                                                },
                                            ],
                                        }}
                                    >
                                        <Button icon={<MoreOutlined />}>Action</Button>
                                    </Dropdown>
                                )}
                            </SetPriceModal>
                        )}
                    </SendEmailModal>
                    <Suspense fallback={<Button loading></Button>}>
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
                style={{
                    marginTop: '20px',
                }}
                items={[
                    {
                        label: 'ID',
                        key: 'id',
                        children: (
                            <>
                                {orderDesign.id}
                                <Button
                                    onClick={() => {
                                        window.navigator.clipboard.writeText(orderDesign.id)
                                        messageApi.success('ID copied to clipboard')
                                    }}
                                    icon={<CopyFilled />}
                                    type='dashed'
                                    size='small'
                                    style={{
                                        marginLeft: '10px',
                                    }}
                                ></Button>
                            </>
                        ),
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
                        children: orderDesign.set_price ?? (
                            <Tooltip title='Please set price using the Action Button' defaultOpen fresh>
                                <Tag color='red-inverse'>Not Set</Tag>
                            </Tooltip>
                        ),
                    },
                    {
                        key: 'status',
                        label: 'Status',
                        children: (
                            <Flex gap={3} align='center'>
                                <Tag color={orderDesign.isMailed ? 'green-inverse' : orderDesign.isDenied ? 'red-inverse' : 'default'}>
                                    {orderDesign.isMailed ? 'Accepted' : orderDesign.isDenied ? 'Denied' : 'Pending'}
                                </Tag>
                                {orderDesign.isMailed && (
                                    <Tag color={orderDesign.isPaid ? 'green-inverse' : 'red-inverse'}>
                                        {orderDesign.isPaid ? 'Paid' : 'Not Paid'}
                                    </Tag>
                                )}
                            </Flex>
                        ),
                    },
                ]}
            />
        </>
    )
}
