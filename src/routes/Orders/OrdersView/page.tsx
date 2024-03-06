import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { DeliveryStatus } from '@/lib/types/Order'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import UpdateOrderStatusModal from '@/routes/Orders/OrdersView/modal/UpdateOrderStatusModal'
import { tabItems } from '@/routes/Orders/OrdersView/util/tabItems'
import { CheckSquareOutlined, DeliveredProcedureOutlined, LoadingOutlined, ShakeOutlined, StopOutlined } from '@ant-design/icons'
import { Await, useNavigate } from '@tanstack/react-router'
import { Card, Descriptions, Dropdown, Flex, Steps, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function OrdersViewPage() {
    const { order, user } = OrdersViewRoute.useLoaderData()
    const navigate = useNavigate()
    const currentRole = AuthenticationHandler.getCurrentRole()

    return (
        <div>
            <Flex justify='space-between'>
                <Typography.Title level={3}>Order Details</Typography.Title>
                <Flex gap={3}>
                    <UpdateOrderStatusModal>
                        {({ handleOpen: openUpdateOrderStatus }) => (
                            <Dropdown.Button
                                type='primary'
                                menu={{
                                    disabled: true,
                                    hidden: true,
                                    items: [],
                                }}
                                onClick={() =>
                                    openUpdateOrderStatus({
                                        orderId: order.id,
                                        currentStatus: order.status_delivery as DeliveryStatus,
                                    })
                                }
                            >
                                Update Status
                            </Dropdown.Button>
                        )}
                    </UpdateOrderStatusModal>
                </Flex>
            </Flex>
            <Flex gap={10}>
                <Descriptions
                    items={[
                        {
                            label: 'ID',
                            key: 'id',
                            children: order.id,
                        },
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
                            label: 'Email',
                            key: 'email',
                            children: order.email,
                            span: 3,
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
                            {
                                title: 'Canceled',
                                description: 'Order is canceled',
                                icon: <StopOutlined />,
                            },
                        ]}
                    />
                </Card>
            </Flex>
            <Tabs
                items={tabItems}
                style={{
                    marginTop: '10px',
                }}
            />
        </div>
    )
}
