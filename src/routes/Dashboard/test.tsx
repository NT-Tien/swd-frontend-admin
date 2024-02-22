import { CarryOutFilled, MoneyCollectFilled, ProfileFilled, SunFilled } from '@ant-design/icons'
import { Card, Col, Row, Typography } from 'antd'
import './style.css'
import LineChart from '@/common/components/chart/LineChart'
import EChart from '@/common/components/chart/EChart'

function Home() {
    const count = [
        {
            today: 'Today’s Sales',
            title: '$53,000',
            percent: '+30%',
            icon: <MoneyCollectFilled />,
            bnb: 'bnb2',
        },
        {
            today: 'Today’s Users',
            title: '3,200',
            percent: '+20%',
            icon: <ProfileFilled />,
            bnb: 'bnb2',
        },
        {
            today: 'New Clients',
            title: '+1,200',
            percent: '-20%',
            icon: <SunFilled />,
            bnb: 'redtext',
        },
        {
            today: 'New Orders',
            title: '$13,200',
            percent: '10%',
            icon: <CarryOutFilled />,
            bnb: 'bnb2',
        },
    ]

    // const list = [
    //     {
    //         img: ava1,
    //         Title: 'Soft UI Shopify Version',
    //         bud: '$14,000',
    //         progress: <Progress percent={60} size='small' />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team2} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Alexander Smith'>
    //                     <img className='tootip-img' src={team3} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Jessica Doe'>
    //                     <img className='tootip-img' src={team4} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    //     {
    //         img: ava2,
    //         Title: 'Progress Track',
    //         bud: '$3,000',
    //         progress: <Progress percent={10} size='small' />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team2} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    //     {
    //         img: ava3,
    //         Title: 'Fix Platform Errors',
    //         bud: 'Not Set',
    //         progress: <Progress percent={100} size='small' status='active' />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Alexander Smith'>
    //                     <img className='tootip-img' src={team3} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    //     {
    //         img: ava4,
    //         Title: 'Launch new Mobile App',
    //         bud: '$20,600',
    //         progress: <Progress percent={100} size='small' status='active' />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team2} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    //     {
    //         img: ava5,
    //         Title: 'Add the New Landing Page',
    //         bud: '$4,000',
    //         progress: <Progress percent={80} size='small' />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team2} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Alexander Smith'>
    //                     <img className='tootip-img' src={team3} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Jessica Doe'>
    //                     <img className='tootip-img' src={team4} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },

    //     {
    //         img: ava6,
    //         Title: 'Redesign Online Store',
    //         bud: '$2,000',
    //         progress: <Progress percent={100} size='small' status='exception' format={() => 'Cancel'} />,
    //         member: (
    //             <div className='avatar-group mt-2'>
    //                 <Tooltip placement='bottom' title='Ryan Tompson'>
    //                     <img className='tootip-img' src={team1} alt='' />
    //                 </Tooltip>
    //                 <Tooltip placement='bottom' title='Romina Hadid'>
    //                     <img className='tootip-img' src={team2} alt='' />
    //                 </Tooltip>
    //             </div>
    //         ),
    //     },
    // ]

    // const timelineList = [
    //     {
    //         title: '$2,400 - Redesign store',
    //         time: '09 JUN 7:20 PM',
    //         color: 'green',
    //     },
    //     {
    //         title: 'New order #3654323',
    //         time: '08 JUN 12:20 PM',
    //         color: 'green',
    //     },
    //     {
    //         title: 'Company server payments',
    //         time: '04 JUN 3:10 PM',
    //     },
    //     {
    //         title: 'New card added for order #4826321',
    //         time: '02 JUN 2:45 PM',
    //     },
    //     {
    //         title: 'Unlock folders for development',
    //         time: '18 MAY 1:30 PM',
    //     },
    //     {
    //         title: 'New order #46282344',
    //         time: '14 MAY 3:30 PM',
    //         color: 'gray',
    //     },
    // ]

    // const uploadProps = {
    //     name: 'file',
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     headers: {
    //         authorization: 'authorization-text',
    //     },
    //     onChange(info: any) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList)
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} file uploaded successfully`)
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} file upload failed.`)
    //         }
    //     },
    // }

    return (
        <>
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
                                boxShadow: '0px 20px 27px #0000000d',
                                borderRadius: '12px',
                            }}
                        >
                            <div className='number'>
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

            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <EChart />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={14} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <LineChart />
                    </Card>
                </Col>
            </Row>

            {/*

            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={16} className='mb-24'>
                    <Card bordered={false} className='criclebox cardbody h-full'>
                        <div className='project-ant'>
                            <div>
                                <Title level={5}>Projects</Title>
                                <Paragraph className='lastweek'>
                                    done this month<span className='blue'>40%</span>
                                </Paragraph>
                            </div>
                            <div className='ant-filtertabs'>
                                <div className='antd-pro-pages-dashboard-analysis-style-salesExtra'>
                                    <Radio.Group onChange={onChange} defaultValue='a'>
                                        <Radio.Button value='a'>ALL</Radio.Button>
                                        <Radio.Button value='b'>ONLINE</Radio.Button>
                                        <Radio.Button value='c'>STORES</Radio.Button>
                                    </Radio.Group>
                                </div>
                            </div>
                        </div>
                        <div className='ant-list-box table-responsive'>
                            <table className='width-100'>
                                <thead>
                                    <tr>
                                        <th>COMPANIES</th>
                                        <th>MEMBERS</th>
                                        <th>BUDGET</th>
                                        <th>COMPLETION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((d, index) => (
                                        <tr key={index}>
                                            <td>
                                                <h6>
                                                    <img src={d.img} alt='' className='avatar-sm mr-10' /> {d.Title}
                                                </h6>
                                            </td>
                                            <td>{d.member}</td>
                                            <td>
                                                <span className='text-xs font-weight-bold'>{d.bud} </span>
                                            </td>
                                            <td>
                                                <div className='percent-progress'>{d.progress}</div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='uploadfile shadow-none'>
                            <Upload {...uploadProps}>
                                <Button type='dashed' className='ant-full-box' icon={<ToTopOutlined />}>
                                    <span className='click'>Click to Upload</span>
                                </Button>
                            </Upload>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <div className='timeline-box'>
                            <Title level={5}>Orders History</Title>
                            <Paragraph className='lastweek' style={{ marginBottom: 24 }}>
                                this month <span className='bnb2'>20%</span>
                            </Paragraph>

                            <Timeline pending='Recording...' className='timelinelist' reverse={reverse}>
                                {timelineList.map((t, index) => (
                                    <Timeline.Item color={t.color} key={index}>
                                        <Title level={5}>{t.title}</Title>
                                        <Text>{t.time}</Text>
                                    </Timeline.Item>
                                ))}
                            </Timeline>
                            <Button type='primary' className='width-100' onClick={() => setReverse(!reverse)}>
                                {<MenuUnfoldOutlined />} REVERSE
                            </Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[24, 0]}>
                <Col xs={24} md={12} sm={24} lg={12} xl={14} className='mb-24'>
                    <Card bordered={false} className='criclebox h-full'>
                        <Row gutter={10}>
                            <Col xs={24} md={12} sm={24} lg={12} xl={14} className='mobile-24'>
                                <div className='h-full col-content p-20'>
                                    <div className='ant-muse'>
                                        <Text>Built by developers</Text>
                                        <Title level={5}>Muse Dashboard for Ant Design</Title>
                                        <Paragraph className='lastweek mb-36'>
                                            From colors, cards, typography to complex elements, you will find the full documentation.
                                        </Paragraph>
                                    </div>
                                    <div className='card-footer'>
                                        <a className='icon-move-right' href='#pablo'>
                                            Read More
                                            {<RightOutlined />}
                                        </a>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={24} md={12} sm={24} lg={12} xl={10} className='col-img'>
                                <div className='ant-cret text-right'>
                                    <img src={card} alt='' className='border10' />
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xs={24} md={12} sm={24} lg={12} xl={10} className='mb-24'>
                    <Card bordered={false} className='criclebox card-info-2 h-full'>
                        <div className='gradent h-full col-content'>
                            <div className='card-content'>
                                <Title level={5}>Work with the best</Title>
                                <p>
                                    Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the
                                    opportunity first.
                                </p>
                            </div>
                            <div className='card-footer'>
                                <a className='icon-move-right' href='#pablo'>
                                    Read More
                                    <RightOutlined />
                                </a>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row> */}
        </>
    )
}

export default Home
