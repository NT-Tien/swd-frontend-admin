import { Account_GetAll } from '@/api/account/Account_GetAll'
import { Order_GetAll } from '@/api/order/Order_GetAll'
import { Order } from '@/lib/types/Order'
import { useSuspenseQueries } from '@tanstack/react-query'
import { Typography } from 'antd'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const gcTime = 1000 * 60
const staleTime = 1000 * 60
const oneYearAgo = dayjs().subtract(2, 'months')

export default function LineChart() {
    const { orders, accounts } = useSuspenseQueries({
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
        ],
        combine: result => {
            return {
                orders: result[0],
                accounts: result[1],
            }
        },
    })

    const ordersByMonth: { [key: string]: Order[] } = useMemo(() => {
        const ordersLastYear = orders.data.data.filter(order => dayjs(order.createdAt).isAfter(oneYearAgo))
        return ordersLastYear.reduce((acc: { [key: string]: Order[] }, order: Order) => {
            const month = dayjs(order.createdAt).week()

            if (!acc[month]) {
                acc[month] = []
            }

            acc[month].push(order)

            return acc
        }, {})
    }, [orders.data.data])

    const accountsByMonth: { [key: string]: number } = useMemo(() => {
        const accountsLastYear = accounts.data.data.data.filter(account => dayjs(account.createdAt).isAfter(oneYearAgo))
        return accountsLastYear.reduce((acc: { [key: string]: number }, account) => {
            const month = dayjs(account.createdAt).week()

            if (!acc[month]) {
                acc[month] = 0
            }

            acc[month]++

            return acc
        }, {})
    }, [accounts.data.data])

    return (
        <>
            <div className='linechart'>
                <div>
                    <Typography.Title level={5}>Active Users</Typography.Title>
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
                                ...(Object.keys(accountsByMonth).length > Object.keys(ordersByMonth).length
                                    ? Object.keys(accountsByMonth)
                                    : Object.keys(ordersByMonth)
                                ).map(data => `Week ${data}`),
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
                            data: [0, ...Object.values(ordersByMonth).map(orders => orders.length)],
                        },
                        {
                            name: 'Users',
                            data: [0, ...Object.values(accountsByMonth)],
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
