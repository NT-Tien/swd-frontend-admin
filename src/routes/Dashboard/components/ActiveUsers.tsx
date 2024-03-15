import { Account_GetAll } from '@/api/account/Account_GetAll'
import { Role } from '@/lib/types/Account'
import { useQuery } from '@tanstack/react-query'
import { Card, Typography } from 'antd'
import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'

const gcTime = 1000 * 60
const staleTime = 1000 * 60

export default function ActiveUsers() {
    const {
        data: accounts,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['account', 'cached'],
        queryFn: () => Account_GetAll({ page: 1, size: 1000 }),
        gcTime,
        staleTime,
    })

    const accountPercentages = useMemo(() => {
        if (!accounts) {
            return {
                users: 0,
                admins: 0,
                dstaff: 0,
                staff: 0,
            }
        }

        const total = accounts.data.total || 0
        const users = (accounts.data.data.filter(account => account.role === Role.USER).length * 100) / total
        const admins = (accounts.data.data.filter(account => account.role === Role.ADMIN).length * 100) / total
        const dstaff = (accounts.data.data.filter(account => account.role === Role.DSTAFF).length * 100) / total
        const staff = (accounts.data.data.filter(account => account.role === Role.STAFF).length * 100) / total

        return {
            users,
            admins,
            dstaff,
            staff,
        }
    }, [accounts])

    if (isLoading) {
        return <Card loading />
    }

    if (isError) {
        return <Card>Failed to load data</Card>
    }

    return (
        <>
            {/* <ReactApexChart
                className='bar-chart'
                options={{
                    chart: {
                        type: 'bar',
                        width: '100%',
                        height: 'auto',

                        toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            borderRadius: 5,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ['transparent'],
                    },
                    grid: {
                        show: true,
                        borderColor: '#fff',
                        strokeDashArray: 2,
                    },
                    xaxis: {
                        categories: [
                            ...new Array(numberOfDays)
                                .fill(0)
                                .map((_, i) => today.subtract(i, 'days').format('MMM DD'))
                                .reverse(),
                        ],
                        labels: {
                            show: true,
                            style: {
                                colors: '#fff',
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            show: true,
                            style: {
                                colors: '#fff',
                            },
                        },
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
                        name: 'Bookings',
                        data: bookingsByDay.data.reverse(),
                        color: '#fff',
                    },
                ]}
                type='bar'
                height={220}
                style={{
                    background: 'transparent linear-gradient(62deg, #00369e 0%, #005cfd 53%, #a18dff 100%) 0% 0% no-repeat padding-box',
                    boxShadow: token.boxShadowSecondary,
                    borderRadius: token.borderRadiusLG,
                }}
            /> */}
            <Typography.Title level={5}>Users</Typography.Title>
            <Typography.Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                Percentages of different user roles on the website
            </Typography.Paragraph>
            <ReactApexChart
                options={{
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: Object.keys(accountPercentages),
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={Object.values(accountPercentages)}
                type='pie'
                width='100%'
            />

            {/* <div
                style={{
                    marginTop: '20px',
                }}
            >
                <Title
                    level={5}
                    style={{
                        margin: 0,
                        fontWeight: 700,
                    }}
                >
                    Booking Details
                </Title>
                <Paragraph
                    style={{
                        fontWeight: 600,
                        color: token.colorTextTertiary,
                    }}
                >
                    than yesterday{' '}
                    <span
                        style={{
                            color: token.colorSuccess,
                            fontWeight: 700,
                        }}
                    >
                        {((bookingsByDay.data[bookingsByDay.data.length - 1] - bookingsByDay.data[bookingsByDay.data.length - 2]) * 100) /
                            bookingsByDay.data[bookingsByDay.data.length - 2]}
                        %
                    </span>
                </Paragraph>
                <Paragraph
                    style={{
                        color: token.colorTextTertiary,
                        fontWeight: 600,
                        marginBottom: '24px',
                    }}
                >
                    Here's some interesting information on the booking data of your website!
                </Paragraph>
                <Row gutter={5}>
                    {items.map((v, index) => (
                        <Col xs={6} xl={6} sm={6} md={6} key={index}>
                            <div>
                                <Title
                                    level={4}
                                    style={{
                                        fontWeight: 700,
                                        margin: 0,
                                    }}
                                >
                                    {v.Title}
                                </Title>
                                <span
                                    style={{
                                        color: token.colorTextTertiary,
                                        fontWeight: 600,
                                    }}
                                >
                                    {v.user}
                                </span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div> */}
        </>
    )
}
