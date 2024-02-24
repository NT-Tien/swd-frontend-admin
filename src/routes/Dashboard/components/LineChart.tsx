import { Typography } from 'antd'
import ReactApexChart from 'react-apexcharts'

export default function LineChart() {
    return (
        <>
            <div className='linechart'>
                <div>
                    <Typography.Title level={5}>Active Users</Typography.Title>
                </div>
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

                    yaxis: {
                        labels: {
                            style: {
                                // fontSize: '14px',
                                // fontWeight: 600,
                                // colors: [token.colorTextLabel],
                            },
                        },
                    },

                    xaxis: {
                        labels: {
                            style: {
                                // fontSize: '14px',
                                // fontWeight: 600,
                                // colors: [token.colorTextLabel],
                            },
                        },
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'],
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
                        name: 'Active Users',
                        data: [10, 350, 40, 300, 220, 500, 250, 400, 230, 500, 500, 1000],
                    },
                    {
                        name: 'Orders',
                        data: [20, 30, 90, 40, 140, 290, 290, 340, 230, 400, 432, 133],
                    },
                ]}
                type='area'
                height={374}
                width={'100%'}
            />
        </>
    )
}
