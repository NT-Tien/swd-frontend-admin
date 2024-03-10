import { DeliveryStatus } from '@/lib/types/Order'
import { queryOrder_RecentWithUser_DB } from '@/routes/Dashboard/util/queryOrder_GetAll_WithUser'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Skeleton, Timeline, Typography } from 'antd'
import dayjs from 'dayjs'

export default function OrderHistory() {
    const navigate = useNavigate()
    const { data: orders, isLoading, isError, isSuccess } = useSuspenseQuery(queryOrder_RecentWithUser_DB({ limit: 6 }))

    return (
        <div className='timeline-box'>
            <Typography.Title level={5}>Recent Orders</Typography.Title>
            <Typography.Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                There are currently <span>{orders.isActive}</span> active order(s)
            </Typography.Paragraph>
            {isLoading && (
                <Timeline
                    pending
                    items={new Array(6).fill('').map((_, index) => ({
                        key: index,
                        pending: true,
                        children: (
                            <>
                                <div>
                                    <Skeleton.Input
                                        style={{
                                            width: '100%',
                                            height: '20px',
                                        }}
                                    ></Skeleton.Input>
                                </div>
                                <div>
                                    <Skeleton.Button
                                        style={{
                                            width: '100%',
                                            height: '15px',
                                            marginTop: '10px',
                                        }}
                                    ></Skeleton.Button>
                                </div>
                            </>
                        ),
                    }))}
                />
            )}
            {isError && 'Error loading orders. Please try again later.'}
            {isSuccess && (
                <Timeline
                    className='timelineList'
                    items={orders.recent
                        .sort((a, b) => dayjs(b.createdAt).diff(dayjs(a.createdAt)))
                        .map(order => {
                            let color
                            switch (order.status_delivery) {
                                case DeliveryStatus.PENDING:
                                    color = 'gray'
                                    break
                                case DeliveryStatus.SHIPPING:
                                    color = 'blue'
                                    break
                                case DeliveryStatus.DELIVERED:
                                    color = 'green'
                                    break
                                case DeliveryStatus.CANCELED:
                                    color = 'red'
                                    break
                                default:
                                    color = 'gray'
                            }

                            return {
                                color,
                                children: (
                                    <div>
                                        <Typography.Title
                                            level={5}
                                            onClick={() =>
                                                navigate({
                                                    to: OrdersViewRoute.to,
                                                    params: {
                                                        id: order.id,
                                                    },
                                                })
                                            }
                                            style={{
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {order.products.length + ' item' + (order.products.length > 1 ? 's' : '')} by{' '}
                                            {order.user_id.data.email}
                                        </Typography.Title>
                                        <Typography.Text>{dayjs(order.createdAt).format('DD MMM h:mm A')}</Typography.Text>
                                    </div>
                                ),
                            }
                        })}
                />
            )}
            <Button
                type='primary'
                onClick={() =>
                    navigate({
                        to: OrdersListRoute.to,
                        search: {
                            tab: 'all',
                        },
                    })
                }
            >
                View More
            </Button>
        </div>
    )
}
