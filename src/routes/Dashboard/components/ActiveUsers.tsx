import { Col, Row, Typography, theme } from 'antd'
import ReactApexChart from 'react-apexcharts'

const { useToken } = theme

const options: ApexCharts.ApexOptions = {
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
}

export default function ActiveUsers() {
    const { token } = useToken()
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
            <ReactApexChart
                className='bar-chart'
                options={options}
                series={[
                    {
                        name: 'Users',
                        data: [450, 200, 100, 220, 500, 100, 400, 230, 500, 500, 234, 333],
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
            />
            <div
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
                    Active Users
                </Title>
                <Paragraph
                    style={{
                        fontWeight: 600,
                        color: token.colorTextTertiary,
                    }}
                >
                    than last week{' '}
                    <span
                        style={{
                            color: token.colorSuccess,
                            fontWeight: 700,
                        }}
                    >
                        +30%
                    </span>
                </Paragraph>
                <Paragraph
                    style={{
                        color: token.colorTextTertiary,
                        fontWeight: 600,
                        marginBottom: '24px',
                    }}
                >
                    We have created multiple options for you to put together and customise into pixel perfect pages.
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
            </div>
        </>
    )
}
