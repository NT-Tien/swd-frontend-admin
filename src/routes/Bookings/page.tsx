import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { BookingsRoute } from '@/routes/Bookings'
import { BookingsBreadcrumb } from '@/routes/Bookings/breadcrumb'
import ViewBookingModal from '@/routes/Bookings/modal/ViewBookingModal'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Dropdown, Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { queryBookingVisit_GetAll } from '../../api/booking-visit/Booking-Visit_GetAll'
import { BookingVisit } from '../../lib/types/BookingVisit'
import GetColumnSearchProps from '../../lib/util/getColumnSearchProps'
import GetColumnDateSearchProps from '@/lib/util/getColumnDateSearchProps'

export default function BookingsPage() {
    const navigate = useNavigate()
    const page = BookingsRoute.useSearch({
        select: data => data.page!,
    })
    const size = BookingsRoute.useSearch({
        select: data => data.size!,
    })
    const { data: bookings, isLoading, isError } = useQuery(queryBookingVisit_GetAll({ page, limit: size }))
    const searchColumnProps = GetColumnSearchProps<BookingVisit>()
    const searchColumnDateProps = GetColumnDateSearchProps<BookingVisit>()

    if (isError) return <div>Error</div>

    return (
        <>
            <Head title='Bookings' />
            <Breadcrumb
                style={{
                    marginBottom: '5px',
                }}
                items={[DashboardBreadcrumb(), BookingsBreadcrumb({ isCurrent: true })]}
            />
            <Flex vertical>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Bookings List
                    <RefreshButton queryKey={['booking-visits']} isLoading={isLoading} />
                </Typography.Title>
                <ViewBookingModal>
                    {({ handleOpen: openViewBooking }) => (
                        <Table
                            dataSource={bookings?.data ?? []}
                            columns={[
                                {
                                    title: 'No.',
                                    render: (_, __, index) => index + 1 + (page - 1) * size,
                                    width: 70,
                                },
                                {
                                    key: 'customer_name',
                                    title: 'Customer Name',
                                    dataIndex: 'customer_name',
                                    ...searchColumnProps('customer_name'),
                                    sortDirections: ['ascend', 'descend'],
                                    sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
                                },
                                {
                                    key: 'visit_date',
                                    title: 'Visit Date',
                                    dataIndex: 'visit_date',
                                    render: (value: Date) => {
                                        return dayjs(value).format('DD-MM-YYYY')
                                    },
                                    sorter: (a, b) => a.visit_date.getTime() - b.visit_date.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                    defaultSortOrder: 'descend',
                                    ...searchColumnDateProps('visit_date'),
                                },
                                {
                                    key: 'phone_number',
                                    title: 'Phone Number',
                                    dataIndex: 'phone_number',
                                    ...searchColumnProps('phone_number'),
                                },
                                {
                                    title: 'Action',
                                    dataIndex: 'action',
                                    key: 'action',
                                    render: (_, record) => (
                                        <Dropdown.Button menu={{ items: [] }} onClick={() => openViewBooking(record)}>
                                            View
                                        </Dropdown.Button>
                                    ),
                                },
                            ]}
                            pagination={{
                                pageSize: size,
                                total: bookings?.total,
                                pageSizeOptions: ['8', '16', '24', '32'],
                                showSizeChanger: true,
                                onChange(page, pageSize) {
                                    navigate({
                                        to: BookingsRoute.to,
                                        search: {
                                            page,
                                            size: pageSize,
                                        },
                                    })
                                },
                                onShowSizeChange(_, size) {
                                    navigate({
                                        to: BookingsRoute.to,
                                        search: {
                                            page: 1,
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
                    )}
                </ViewBookingModal>
            </Flex>
        </>
    )
}
