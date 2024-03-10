import { Auth_LoginGoogle } from '@/api/auth/Auth_LoginGoogle'
import Head from '@/common/components/Head'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { auth } from '@/firebase'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { DashboardRoute } from '@/routes/Dashboard'
import { LoginRoute } from '@/routes/Login'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { socket } from '@/socket'
import { GoogleOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import theme from 'antd/es/theme'
import Typography from 'antd/es/typography'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useEffect } from 'react'

const { useToken } = theme

export default function LoginPage() {
    const { token } = useToken()
    const { messageApi } = useMessage()
    const { error, pageAccessDenied } = LoginRoute.useSearch()
    const navigate = useNavigate()

    const signInMutation = useMutation({
        mutationFn: Auth_LoginGoogle,
        onSuccess: async res => {
            AuthenticationHandler.login(res.data)

            switch (res.data.profile.user.role) {
                case Role.ADMIN: {
                    navigate({
                        to: DashboardRoute.to,
                    })
                    break
                }
                case Role.STAFF: {
                    navigate({
                        to: OrdersListRoute.to,
                        search: {
                            tab: 'all',
                        },
                    })
                    break
                }
                case Role.DSTAFF: {
                    navigate({
                        to: OrdersListRoute.to,
                        search: {
                            tab: 'orders-to-deliver',
                        },
                    })
                    break
                }
                default: {
                    devLog('Unrecognized Role. Logging out...')
                    AuthenticationHandler.logout()
                    navigate({
                        to: LoginRoute.to,
                    })
                }
            }
        },
        onError: () => {
            // There should be no case where this is called, since login with google is both login and register.
            AuthenticationHandler.logout()
            setTimeout(() => messageApi.error('Error while logging in. Please try again.'), 250)
        },
        onSettled: () => messageApi.destroy('logging-in'),
        onMutate: () => {
            messageApi.open({
                type: 'loading',
                content: 'Logging in...',
                key: 'logging-in',
                duration: 0,
            })
        },
    })

    async function loginGoogle() {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({
            prompt: 'select_account',
        })
        const result = await signInWithPopup(auth, new GoogleAuthProvider())
        const token = await result.user.getIdToken()
        await signInMutation.mutateAsync({ token })
    }

    useEffect(() => {
        if (pageAccessDenied) {
            messageApi.error('You do not have permission to access this page.')
        }

        if (error) {
            messageApi.error(error)
        }

        return () => {
            messageApi.destroy()
        }
    }, [error, messageApi, pageAccessDenied])

    useEffect(() => {
        socket.disconnect()
    }, [])

    return (
        <>
            <Head title='Login' />
            <Row
                justify='center'
                align='middle'
                style={{
                    minHeight: '100vh',
                    background: 'url("/images/login-background.png") center/cover no-repeat',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        height: '100%',
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
                        <Typography.Paragraph>Login with your Admin Credentials.</Typography.Paragraph>
                    </header>

                    <main
                        style={{
                            marginTop: token.marginLG,
                        }}
                    >
                        <Button
                            icon={<GoogleOutlined />}
                            onClick={loginGoogle}
                            size='large'
                            type='primary'
                            style={{
                                width: '100%',
                            }}
                        >
                            Google
                        </Button>
                    </main>
                </div>
            </Row>
        </>
    )
}
