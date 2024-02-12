// * Currently, each login calls the api three times:
// 1. Authenticate account
// 2. Check if admin
// 3. Another check if admin when accessing admin

import { Auth_LoginGoogle } from '@/api/auth/Auth_LoginGoogle'
import { Auth_VerifyTokenAdmin } from '@/api/auth/Auth_VerifyTokenAdmin'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { auth } from '@/firebase'
import { rootRoute } from '@/routeTree'
import { DashboardRoute } from '@/routes/Dashboard'
import { GoogleLogo } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { createRoute, useNavigate } from '@tanstack/react-router'
import Button from 'antd/es/button'
import Row from 'antd/es/row'
import theme from 'antd/es/theme'
import Typography from 'antd/es/typography'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Cookies from 'js-cookie'
import { useEffect } from 'react'

const { useToken } = theme

const component = function LoginPage() {
    const { token } = useToken()
    const { messageApi } = useMessage()
    const error = LoginRoute.useSearch({
        select: data => data.error,
    })
    const navigate = useNavigate()

    const signInMutation = useMutation({
        mutationFn: Auth_LoginGoogle,
        onSuccess: data => {
            Cookies.set('token', data.data.token, {
                expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours
            })
        },
        onError: () => {
            Cookies.remove('token')
            messageApi.error('Error while logging in. Please try again.')
        },
    })

    const verifyTokenMutation = useMutation({
        mutationFn: Auth_VerifyTokenAdmin,
        onSuccess: res => {
            if (res.data === true) {
                // Redirect to admin dashboard
                messageApi.success('Login Successful. Happy hacking!')
                navigate({
                    to: DashboardRoute.to,
                })
            } else {
                Cookies.remove('token')
                messageApi.error('You are not allowed to access this page.')
            }
        },
        onError: () => {
            Cookies.remove('token')
            messageApi.error('You are not allowed to access this page.')
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

        await verifyTokenMutation.mutateAsync()
    }

    useEffect(() => {
        if (error) {
            messageApi.error(error)
        }
    }, [error, messageApi])

    return (
        <Row justify='center' align='middle' style={{ height: '100vh', backgroundColor: token.colorPrimaryBg }}>
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
                    <Typography.Paragraph>Login with your Admin Credentials.</Typography.Paragraph>
                </header>
                {/* <CredentialsLoginForm
                    style={{
                        marginTop: token.marginXL,
                    }}
                /> */}
                <Button icon={<GoogleLogo size={16} weight='bold' />} onClick={loginGoogle}>
                    Google
                </Button>
            </div>
        </Row>
    )
}

type LoginRouteSearch = {
    error?: string
}

export const LoginRoute = createRoute({
    component,
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: (search: LoginRouteSearch) => {
        return {
            error: search.error,
        } as LoginRouteSearch
    },
})
