import { Spin, Typography } from 'antd'

export default function LoadingComponent() {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                placeItems: 'center',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Spin size='large' />
                <Typography.Title
                    level={5}
                    style={{
                        textAlign: 'center',
                        marginTop: '20px',
                    }}
                >
                    Loading Page
                </Typography.Title>
            </div>
        </div>
    )
}
