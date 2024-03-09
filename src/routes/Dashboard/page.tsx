import Head from '@/common/components/Head'
import ActiveUsers from '@/routes/Dashboard/components/ActiveUsers'
import LineChart from '@/routes/Dashboard/components/LineChart'
import OrderHistory from '@/routes/Dashboard/components/OrderHistory'
import QuickStats from '@/routes/Dashboard/components/QuickStats'
import { Card, Col, Row } from 'antd'

export default function DashboardPage() {
    return (
        <>
            <Head title='Dashboard' />
            <QuickStats />
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <ActiveUsers />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={14} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <LineChart />
                    </Card>
                </Col>
            </Row>
            <Row
                gutter={[24, 0]}
                style={{
                    marginTop: '24px',
                }}
            >
                <Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24'>
                    <Card bordered={false} className='criclebox cardbody h-full'></Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <OrderHistory />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
