import { Account_GetAll } from '@/api/account/Account_GetAll'
import { Order_GetAll } from '@/api/order/Order_GetAll'
import { Staff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import { Order } from '@/lib/types/Order'
import { OrderDesign } from '@/lib/types/OrderDesign'
import { useSuspenseQueries } from '@tanstack/react-query'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const gcTime = 1000 * 60
const staleTime = 1000 * 60
const thirtyDaysAgo = dayjs().subtract(10, 'days')
const today = dayjs()

export default function LineChart() {
    const { orders, accounts, orderDesigns } = useSuspenseQueries({
        queries: [
            {
                queryKey: ['orders'],
                queryFn: () => Order_GetAll(),
                gcTime,
                staleTime,
            },
            {
                queryKey: ['accounts', 1, 0],
                queryFn: () => Account_GetAll({ page: 1, size: 0 }),
                gcTime,
                staleTime,
            },
            {
                queryKey: ['staff', 'order-design'],
                queryFn: () => Staff_OrderDesigns_GetAll(),
                gcTime,
                staleTime,
            },
        ],
        combine: result => {
            return {
                orders: result[0],
                accounts: result[1],
                orderDesigns: result[2],
            }
        },
    })

    const orderDesignsByMonth: { data: number[] } = useMemo(() => {
        const ordersLastYear = orderDesigns.data.data
            .filter(order => dayjs(order.createdAt).isAfter(thirtyDaysAgo))
            .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
        const data = ordersLastYear.reduce((acc: { [key: string]: number }, order: OrderDesign) => {
            const date = dayjs(order.createdAt).toDate().toDateString()

            if (!acc[date]) {
                acc[date] = 0
            }

            acc[date]++

            return acc
        }, {})

        const dates = Object.keys(data)
        const values = Object.values(data)
        const rightDate = dayjs(dates[dates.length - 1])
        const leftDate = dayjs(dates[0])
        const differenceRight = rightDate.diff(today, 'day')
        for (let i = 0; i < differenceRight; i++) {
            values.push(0)
        }
        const differenceLeft = leftDate.diff(thirtyDaysAgo, 'day')
        for (let i = 0; i < differenceLeft; i++) {
            values.unshift(0)
        }

        return {
            data: values,
        }
    }, [orderDesigns.data.data])

    const ordersByMonth: { data: number[] } = useMemo(() => {
        const ordersLastYear = orders.data.data
            .filter(order => dayjs(order.createdAt).isAfter(thirtyDaysAgo))
            .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
        const data = ordersLastYear.reduce((acc: { [key: string]: number }, order: Order) => {
            const date = dayjs(order.createdAt).toDate().toDateString()

            if (!acc[date]) {
                acc[date] = 0
            }

            acc[date]++

            return acc
        }, {})

        const dates = Object.keys(data)
        const values = Object.values(data)
        const rightDate = dayjs(dates[dates.length - 1])
        const leftDate = dayjs(dates[0])
        const differenceRight = rightDate.diff(today, 'day') + 1
        for (let i = 0; i < differenceRight; i++) {
            values.push(0)
        }
        const differenceLeft = leftDate.diff(thirtyDaysAgo, 'day')
        for (let i = 0; i < differenceLeft; i++) {
            values.unshift(0)
        }

        return {
            data: values,
        }
    }, [orders.data.data])

    const accountsByMonth: { data: number[] } = useMemo(() => {
        const accountsLastYear = accounts.data.data.data
            .filter(account => dayjs(account.createdAt).isAfter(thirtyDaysAgo))
            .sort((a, b) => dayjs(a.createdAt).diff(dayjs(b.createdAt)))
        const data = accountsLastYear.reduce((acc: { [key: string]: number }, account) => {
            const date = dayjs(account.createdAt).toDate().toDateString()

            if (!acc[date]) {
                acc[date] = 0
            }

            acc[date]++

            return acc
        }, {})

        // pad the data with 0s for the days that have no accounts
        const dates = Object.keys(data)
        const values = Object.values(data)
        const rightDate = dayjs(dates[dates.length - 1])
        const leftDate = dayjs(dates[0])
        const differenceRight = rightDate.diff(today, 'day') + 1
        for (let i = 0; i < differenceRight; i++) {
            values.push(0)
        }
        const differenceLeft = leftDate.diff(thirtyDaysAgo, 'day')
        for (let i = 0; i < differenceLeft; i++) {
            values.unshift(0)
        }

        return {
            data: values,
        }
    }, [accounts.data.data])

    return (
        <>
            <div className='linechart'>
                <div>
                    <Typography.Title level={5}>Site Data</Typography.Title>
                </div>

                <ReactApexChart
                    className='full-width'
                    options={{
                        chart: {
                            width: '100%',
                            type: 'area',
                            toolbar: {
                                show: true,
                                offsetY: 0,
                            },
                        },

                        legend: {
                            show: true,
                            horizontalAlign: 'left',
                            position: 'top',
                        },

                        dataLabels: {
                            enabled: false,
                        },
                        stroke: {
                            curve: 'smooth',
                        },

                        yaxis: {},

                        xaxis: {
                            categories: [
                                'Start',
                                ...new Array(10)
                                    .fill(0)
                                    .map((_, i) => {
                                        return dayjs().subtract(i, 'days').format('MMM DD')
                                    })
                                    .reverse(),
                            ],
                        },

                        tooltip: {
                            y: {
                                formatter: function (val: any) {
                                    return val
                                },
                            },
                        },
                    }}
                    series={[
                        {
                            name: 'Orders',
                            data: [0, ...ordersByMonth.data],
                        },
                        {
                            name: 'Users',
                            data: [0, ...accountsByMonth.data],
                        },
                        {
                            name: 'Order Designs',
                            data: [0, ...orderDesignsByMonth.data],
                        },
                    ]}
                    type='area'
                    height={374}
                    width={'100%'}
                />
            </div>
        </>
    )
}
