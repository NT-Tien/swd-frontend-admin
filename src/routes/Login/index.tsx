import { rootRoute } from '@/router'
import CredentialsLoginForm from '@/routes/Login/components/CredentialsLoginForm'
import { createRoute } from '@tanstack/react-router'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import theme from 'antd/es/theme'
import Typography from 'antd/es/typography'

const { useToken } = theme

const component = function LoginPage() {
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

export const LoginRoute = createRoute({
    component,
    getParentRoute: () => rootRoute,
    path: '/',
})
