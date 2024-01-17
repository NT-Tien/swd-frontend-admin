import { rootRoute } from '@/router'
import CredentialsLoginForm from '@/routes/Login/components/CredentialsLoginForm'
import { Route } from '@tanstack/react-router'
import { Button, Row, Typography, theme } from 'antd'

const { useToken } = theme

export const LoginRoute = new Route({
    component: LoginPage,
    getParentRoute: () => rootRoute,
    path: '/',
})

function LoginPage() {
    const { token } = useToken()

    return (
        <Row
            justify='center'
            align='middle'
            style={{ height: '100vh', backgroundColor: token.colorPrimaryBg }}
        >
            <div
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'max-content',
                    padding: token.paddingLG,
                    backgroundColor: token.colorBgBase,
                    boxShadow: token.boxShadow,
                    borderRadius: token.borderRadius,
                    color: token.colorTextBase,
                }}
            >
                <header
                    style={{
                        textAlign: 'center',
                    }}
                >
                    <Typography.Title
                        level={1}
                        style={{
                            marginBottom: token.marginXS,
                        }}
                    >
                        Admin Login
                    </Typography.Title>
                    <Typography.Paragraph>
                        Login with your Admin Credentials.
                    </Typography.Paragraph>
                </header>
                <CredentialsLoginForm
                    style={{
                        marginTop: token.marginXL,
                    }}
                />
                <Button>Google</Button>
            </div>
        </Row>
    )
}
