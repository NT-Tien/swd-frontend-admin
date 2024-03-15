// TODO: Check breadcrumb back navigation for roles

import Head from '@/common/components/Head'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { DeliveryStatus } from '@/lib/types/Order'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { OrdersListBreadcrumb } from '@/routes/Orders/OrdersList/breadcrumb'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { OrdersViewBreadcrumb } from '@/routes/Orders/OrdersView/breadcrumb'
import UpdateOrderStatusModal from '@/routes/Orders/OrdersView/modal/UpdateOrderStatusModal'
import { tabItems } from '@/routes/Orders/OrdersView/util/tabItems'
import { orderStatusTag } from '@/routes/Orders/common/util/orderStatusTag'
import { CheckSquareOutlined, DeliveredProcedureOutlined, LoadingOutlined, ShakeOutlined, StopOutlined } from '@ant-design/icons'
import { Await, useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Card, Descriptions, Flex, Steps, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function OrdersViewPage() {
    const { order, user } = OrdersViewRoute.useLoaderData()
    const navigate = useNavigate()
    const currentRole = AuthenticationHandler.getCurrentRole()

    return (
        <>
            <Head title='Order Details' />
            <Breadcrumb
                style={{
                    marginBottom: '5px',
                }}
                items={[DashboardBreadcrumb(), OrdersListBreadcrumb(), OrdersViewBreadcrumb({ isCurrent: true, title: order.id })]}
            />
            <Flex justify='space-between'>
                <Typography.Title level={3}>
                    Order Details{' '}
                    <span
                        style={{
                            marginLeft: '5px',
                        }}
                    >
                        {orderStatusTag(order.status_delivery)}
                    </span>
                </Typography.Title>
                <Flex gap={3}>
                    <UpdateOrderStatusModal>
                        {({ handleOpen: openUpdateOrderStatus }) => (
                            <Button
                                type='primary'
                                disabled={
                                    order.status_delivery === DeliveryStatus.DELIVERED || order.status_delivery === DeliveryStatus.CANCELED
                                }
                                onClick={() =>
                                    openUpdateOrderStatus({
                                        orderId: order.id,
                                        currentStatus: order.status_delivery as DeliveryStatus,
                                    })
                                }
                            >
                                Update Status
                            </Button>
                        )}
                    </UpdateOrderStatusModal>
                </Flex>
            </Flex>
            <Flex gap={10}>
                <Descriptions
                    column={3}
                    items={[
                        {
                            label: 'Created By',
                            key: 'createdBy',
                            children: (
                                <Suspense fallback={<LoadingOutlined />}>
                                    <Await promise={user}>
                                        {({ data: user }) => (
                                            <Typography.Paragraph
                                                ellipsis={{ rows: 1, tooltip: user.email }}
                                                onClick={() => {
                                                    if (isAuthorized(Role.ADMIN, currentRole))
                                                        navigate({
                                                            to: AccountViewRoute.to,
                                                            params: { id: user.id },
                                                        })
                                                }}
                                                style={{
                                                    cursor: isAuthorized(Role.ADMIN, currentRole) ? 'pointer' : 'initial',
                                                    color: isAuthorized(Role.ADMIN, currentRole) ? 'blue' : 'initial',
                                                }}
                                            >
                                                {user.email}
                                            </Typography.Paragraph>
                                        )}
                                    </Await>
                                </Suspense>
                            ),
                        },
                        {
                            label: 'Created At',
                            key: 'createdAt',
                            children: dayjs(order.createdAt).format('DD/MM/YYYY'),
                        },
                        {
                            label: 'Updated At',
                            key: 'updatedAt',
                            children: dayjs(order.updatedAt).format('DD/MM/YYYY'),
                        },
                        {
                            label: 'Order Email',
                            key: 'email',
                            children: order.email,
                        },
                        {
                            label: 'Phone',
                            key: 'phone',
                            children: order.phone,
                        },
                        {
                            label: 'Voucher',
                            key: 'voucher',
                            children: order.voucher_id ? order.voucher_id : 'No Voucher',
                        },
                    ]}
                    style={{
                        width: '90%',
                    }}
                    layout='vertical'
                />
                <Card
                    style={{
                        width: '500px',
                    }}
                >
                    {order.status_delivery !== DeliveryStatus.CANCELED ? (
                        <Steps
                            current={Object.values(DeliveryStatus).indexOf(order.status_delivery)}
                            direction='vertical'
                            items={[
                                {
                                    title: 'Pending',
                                    description: 'Order is pending',
                                    icon: <ShakeOutlined />,
                                },
                                {
                                    title: 'Shipping',
                                    description: 'Order is shipping',
                                    icon: <DeliveredProcedureOutlined />,
                                },
                                {
                                    title: 'Delivered',
                                    description: 'Order is delivered',
                                    icon: <CheckSquareOutlined />,
                                },
                            ]}
                        />
                    ) : (
                        <Steps
                            current={Object.values(DeliveryStatus).indexOf(order.status_delivery)}
                            direction='vertical'
                            items={[
                                {
                                    title: 'Pending',
                                    description: 'Order is pending',
                                    icon: <ShakeOutlined />,
                                },
                                {
                                    title: 'Shipping',
                                    description: 'Order is shipping',
                                    icon: <DeliveredProcedureOutlined />,
                                },
                                {
                                    title: 'Canceled',
                                    description: 'Order is canceled',
                                    icon: <StopOutlined />,
                                    status: 'error',
                                },
                            ]}
                        />
                    )}
                </Card>
            </Flex>
            <Tabs
                items={tabItems}
                style={{
                    marginTop: '10px',
                }}
            />
        </>
    )
}
