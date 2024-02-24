import { Timeline, Typography } from 'antd'

export default function OrderHistory() {
    const timelineList = [
        {
            title: '$2,400 - Redesign store',
            time: '09 JUN 7:20 PM',
            color: 'green',
        },
        {
            title: 'New order #3654323',
            time: '08 JUN 12:20 PM',
            color: 'green',
        },
        {
            title: 'Company server payments',
            time: '04 JUN 3:10 PM',
        },
        {
            title: 'New card added for order #4826321',
            time: '02 JUN 2:45 PM',
        },
        {
            title: 'Unlock folders for development',
            time: '18 MAY 1:30 PM',
        },
        {
            title: 'New order #46282344',
            time: '14 MAY 3:30 PM',
            color: 'gray',
        },
    ]

    return (
        <div className='timeline-box'>
            <Typography.Title level={5}>Orders History</Typography.Title>
            <Typography.Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                this month <span className='bnb2'>20%</span>
            </Typography.Paragraph>

            <Timeline className='timelinelist'>
                {timelineList.map((t, index) => (
                    <Timeline.Item color={t.color} key={index}>
                        <Typography.Title level={5}>{t.title}</Typography.Title>
                        <Typography.Text>{t.time}</Typography.Text>
                    </Timeline.Item>
                ))}
            </Timeline>
        </div>
    )
}
