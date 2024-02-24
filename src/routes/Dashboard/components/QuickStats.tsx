import { MoneyCollectFilled, ProfileFilled, SunFilled, CarryOutFilled } from '@ant-design/icons'
import { Row, Col, Card, Typography, theme } from 'antd'

const { useToken } = theme

export default function QuickStats() {
    const { token } = useToken()

    const count = [
        {
            today: 'New Orders',
            title: '$13,200',
            percent: '10%',
            icon: <CarryOutFilled />,
        },
        {
            today: 'Total Products',
            title: '50,000',
            percent: 'items',
            icon: <MoneyCollectFilled />,
        },
        {
            today: 'Today’s Categories',
            title: '3,200',
            percent: 'people',
            icon: <ProfileFilled />,
        },
        {
            today: 'New Clients',
            title: '+1,200',
            percent: '-20%',
            icon: <SunFilled />,
        },
    ]

    return (
        <Row gutter={[24, 0]}>
            {count.map((c, index) => (
                <Col
                    key={index}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                    style={{
                        marginBottom: '24px',
                    }}
                >
                    <Card
                        bordered={false}
                        style={{
                            boxShadow: token.boxShadowSecondary,
                            borderRadius: token.borderRadiusLG,
                        }}
                    >
                        <div>
                            <Row align='middle' gutter={[24, 0]}>
                                <Col xs={18}>
                                    <span>{c.today}</span>
                                    <Typography.Title
                                        level={3}
                                        style={{
                                            fontWeight: 700,
                                            marginBottom: '0px',
                                            fontSize: '30px',
                                        }}
                                    >
                                        {c.title}{' '}
                                        <small
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {c.percent}
                                        </small>
                                    </Typography.Title>
                                </Col>
                                <Col xs={6}>
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            textAlign: 'center',
                                            background: '#1890ff',
                                            color: '#fff',
                                            borderRadius: '0.5rem',
                                            marginLeft: 'auto',
                                            display: 'grid',
                                            placeItems: 'center',
                                        }}
                                        className='card-icon-container'
                                    >
                                        {c.icon}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}
