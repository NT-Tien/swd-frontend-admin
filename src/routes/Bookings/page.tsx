import RefreshButton from '@/common/components/RefreshButton'
import { BookingsRoute } from '@/routes/Bookings'
import CreateBookingModal from '@/routes/Bookings/components/CreateBookingModal'
import { Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Button, Dropdown, Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { queryBookingVisit_GetAll } from '../../api/booking-visit/Booking-Visit_GetAll'
import { BookingVisit } from '../../lib/types/BookingVisit'
import GetColumnSearchProps from '../../lib/util/getColumnSearchProps'

const limit = 5

export default function BookingsPage() {
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
                <RefreshButton queryKey={['booking-visits']} isLoading={isLoading} />
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
                            return dayjs(value).format('DD-MM-YYYY')
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
