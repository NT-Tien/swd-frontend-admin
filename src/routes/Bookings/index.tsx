import { ArrowsClockwise, Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { Button, Dropdown, Flex, Table, Typography } from 'antd'
import { format } from 'date-fns'
import { queryBookingVisit_GetAll } from '../../api/booking-visit/Booking-Visit_GetAll'
import { AuthDashboardLayoutRoute } from '../../layouts/AuthenticatedLayout'
import { queryClient } from '../../main'
import GetColumnSearchProps from '../../lib/util/getColumnSearchProps'
import { BookingVisit } from '../../lib/types/BookingVisit'
import CreateBookingModal from '@/routes/Bookings/components/CreateBookingModal'

const limit = 5

type BookingsRouteSearch = {
    page?: number
}

export const BookingsRoute = createRoute({
    getParentRoute: () => AuthDashboardLayoutRoute,
    path: 'bookings',
    component: BookingsPage,
    validateSearch: (data: BookingsRouteSearch) => {
        return {
            page: data.page ?? 1,
        }
    },
})

export function BookingsPage() {
    const page = BookingsRoute.useSearch({
        select: data => data.page,
    })
    const { data: bookings, isLoading, isError } = useQuery(queryBookingVisit_GetAll({ page, limit }))
    const searchColumnProps = GetColumnSearchProps<BookingVisit>()

    if (isError) return <div>Error</div>

    return (
        <Flex vertical gap={20}>
            <Typography.Title
                level={2}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                Bookings List
                <Button
                    size='small'
                    icon={<ArrowsClockwise size={12} weight='fill' />}
                    onClick={() => {
                        queryClient.invalidateQueries({
                            queryKey: [queryBookingVisit_GetAll({ page, limit }).queryKey[0]],
                        })
                    }}
                ></Button>
            </Typography.Title>
            <Flex justify='space-between'>
                <CreateBookingModal>
                    {({ handleOpen }) => (
                        <Button type='primary' icon={<Plus />} onClick={handleOpen}>
                            Add Booking
                        </Button>
                    )}
                </CreateBookingModal>
            </Flex>
            <Table
                dataSource={bookings?.data ?? []}
                columns={[
                    {
                        title: 'No.',
                        render: (_, __, index) => index + 1,
                    },
                    {
                        key: 'customer_name',
                        title: 'Customer Name',
                        dataIndex: 'customer_name',
                        ...searchColumnProps('customer_name'),
                        sortDirections: ['ascend', 'descend'],
                        sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
                        defaultSortOrder: 'ascend',
                    },
                    {
                        key: 'visit_date',
                        title: 'Visit Date',
                        dataIndex: 'visit_date',
                        render: (value: Date) => {
                            if (!isNaN(value.getTime())) {
                                return format(value, 'dd/MM/yyyy')
                            } else {
                                return 'Invalid Date'
                            }
                        },
                        sorter: (a, b) => a.visit_date.getTime() - b.visit_date.getTime(),
                        sortDirections: ['ascend', 'descend'],
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
                        render: () => (
                            <Dropdown.Button
                                menu={{
                                    items: [
                                        {
                                            label: 'Delete',
                                            key: '1',
                                            icon: <Trash />,
                                            danger: true,
                                        },
                                    ],
                                }}
                            >
                                View
                            </Dropdown.Button>
                        ),
                    },
                ]}
                pagination={{
                    pageSize: 8,
                }}
                loading={isLoading}
            />
        </Flex>
    )
}
