/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from 'react-apexcharts'
import { Row, Col, Typography } from 'antd'

function EChart() {
    const { Title, Paragraph } = Typography

    const items = [
        {
            Title: '3,6K',
            user: 'Users',
        },
        {
            Title: '2m',
            user: 'Clicks',
        },
        {
            Title: '$772',
            user: 'Sales',
        },
        {
            Title: '82',
            user: 'Items',
        },
    ]

    return (
        <>
            <div id='chart'>
                <ReactApexChart
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
                            borderColor: '#ccc',
                            strokeDashArray: 2,
                        },
                        xaxis: {
                            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                            labels: {
                                show: true,
                                style: {
                                    colors: [
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                    ],
                                },
                            },
                        },
                        yaxis: {
                            labels: {
                                show: true,
                                style: {
                                    colors: [
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                        'rgb(243, 11, 11)',
                                    ],
                                },
                            },
                        },

                        tooltip: {
                            y: {
                                formatter: function (val: any) {
                                    return '$ ' + val + ' thousands'
                                },
                            },
                        },
                    }}
                    series={[
                        {
                            name: 'Sales',
                            data: [450, 200, 100, 220, 500, 100, 400, 230, 500],
                            color: 'rgb(243, 11, 11)',
                        },
                    ]}
                    type='bar'
                    height={220}
                />
            </div>
            <div className='chart-vistior'>
                <Title level={5}>Active Users</Title>
                <Paragraph className='lastweek'>
                    than last week <span className='bnb2'>+30%</span>
                </Paragraph>
                <Paragraph className='lastweek'>
                    We have created multiple options for you to put together and customise into pixel perfect pages.
                </Paragraph>
                <Row gutter={5}>
                    {items.map(v => (
                        <Col xs={6} xl={6} sm={6} md={6} key={v.Title}>
                            <div className='chart-visitor-count'>
                                <Title level={4}>{v.Title}</Title>
                                <span>{v.user}</span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    )
}

export default EChart
