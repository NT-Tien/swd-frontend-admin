import { DeliveryStatus } from '@/lib/types/Order'
import { DashboardRoute } from '@/routes/Dashboard'
import { CarryOutFilled, MoneyCollectFilled, ProfileFilled, SunFilled } from '@ant-design/icons'
import { Await } from '@tanstack/react-router'
import { Card, Col, Row, Spin, Typography, theme } from 'antd'
import { Suspense } from 'react'

const { useToken } = theme

export default function QuickStats() {
    const { allProducts, allUsers, allBookings, allOrders } = DashboardRoute.useLoaderData()
    const { token } = useToken()

    const count = [
        {
            today: 'Total Revenue',
            title: (
                <Await promise={allOrders}>
                    {({ data }) => (
                        <>
                            {data
                                .filter(order => order.status_delivery === DeliveryStatus.DELIVERED)
                                .reduce((acc, order) => {
                                    return acc + Number(order.total)
                                }, 0)}
                        </>
                    )}
                </Await>
            ),
            percent: 'VND',
            icon: <CarryOutFilled />,
        },
        {
            today: 'Total Products',
            title: <Await promise={allProducts}>{({ data: { total: allProducts } }) => <>{allProducts}</>}</Await>,
            percent: 'item(s)',
            icon: <MoneyCollectFilled />,
        },
        {
            today: 'Total Accounts',
            title: <Await promise={allUsers}>{({ data: { total: allUsers } }) => <>{allUsers}</>}</Await>,
            percent: 'people',
            icon: <ProfileFilled />,
        },
        {
            today: 'Total Bookings',
            title: <Await promise={allBookings}>{({ data: allBookings }) => <>{allBookings.data.length}</>}</Await>,
            percent: 'booking(s)',
            icon: <SunFilled />,
        },
    ]

    return (
        <Row gutter={[24, 0]}>
            {count.map((c, index) => (
                <Suspense key={c.today} fallback={<Spin />}>
                    <Col
                        key={index}
                        xs={24}
                        sm={24}
                        md={12}
                        lg={6}
                        xl={6}
                        style={{
                            marginBottom: '24px',
                        }}
                    >
                        <Card
                            bordered={false}
                            style={{
                                boxShadow: token.boxShadowSecondary,
                                borderRadius: token.borderRadiusLG,
                            }}
                        >
                            <div>
                                <Row align='middle' gutter={[24, 0]}>
                                    <Col xs={18}>
                                        <span>{c.today}</span>
                                        <Typography.Title
                                            level={3}
                                            style={{
                                                fontWeight: 700,
                                                marginBottom: '0px',
                                                fontSize: '30px',
                                            }}
                                        >
                                            {c.title}{' '}
                                            <small
                                                style={{
                                                    fontWeight: '600',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {c.percent}
                                            </small>
                                        </Typography.Title>
                                    </Col>
                                    <Col xs={6}>
                                        <div
                                            style={{
                                                width: '48px',
                                                height: '48px',
                                                textAlign: 'center',
                                                background: '#1890ff',
                                                color: '#fff',
                                                borderRadius: '0.5rem',
                                                marginLeft: 'auto',
                                                display: 'grid',
                                                placeItems: 'center',
                                            }}
                                            className='card-icon-container'
                                        >
                                            {c.icon}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Suspense>
            ))}
        </Row>
    )
}
