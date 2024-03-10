import { BookingsRoute } from '@/routes/Bookings'
import ViewBookingModal from '@/routes/Bookings/modal/ViewBookingModal'
import { DashboardRoute } from '@/routes/Dashboard'
import { EyeFilled } from '@ant-design/icons'
import { Await, useNavigate } from '@tanstack/react-router'
import { Button, Flex, Spin, Timeline, TimelineProps, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function LatestBookings() {
    const navigate = useNavigate()
    const bookings = DashboardRoute.useLoaderData({
        select: data => data.allBookings,
    })

    return (
        <div>
            <Typography.Title level={5}>Bookings</Typography.Title>
            <Typography.Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                {/* There are currently <span>{orders.isActive}</span> active order(s) */}
            </Typography.Paragraph>
            <ViewBookingModal>
                {({ handleOpen: openViewBooking }) => (
                    <Suspense fallback={<Spin />}>
                        <Await promise={bookings}>
                            {({ data: bookings }) => {
                                const items: TimelineProps['items'] = bookings.data
                                    .filter(booking => dayjs(booking.visit_date).isAfter(dayjs()))
                                    .slice(0, 6)
                                    .map(booking => ({
                                        color: dayjs(booking.visit_date).isToday() ? 'red' : 'blue',
                                        children: (
                                            <div>
                                                <Flex gap={10}>
                                                    <Typography.Title level={5}>{booking.customer_name}</Typography.Title>
                                                    <Button onClick={() => openViewBooking(booking)} icon={<EyeFilled />} size='small' />
                                                </Flex>
                                                <Typography.Text>{dayjs(booking.visit_date).format('DD-MM-YYYY hh:mm A')}</Typography.Text>
                                            </div>
                                        ),
                                    }))
                                return (
                                    <>
                                        <Timeline items={items} reverse />
                                        <Button
                                            type='primary'
                                            onClick={() =>
                                                navigate({
                                                    to: BookingsRoute.to,
                                                    search: {
                                                        page: 1,
                                                        size: 8,
                                                    },
                                                })
                                            }
                                        >
                                            View More
                                        </Button>
                                    </>
                                )
                            }}
                        </Await>
                    </Suspense>
                )}
            </ViewBookingModal>
        </div>
    )
}
