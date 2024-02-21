import { Auth_VerifyTokenAdmin } from '@/api/auth/Auth_VerifyTokenAdmin'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { LoginRoute } from '@/routes/Login'
import { Await, Navigate, Outlet, createRoute, defer } from '@tanstack/react-router'
import { AxiosResponse } from 'axios'
import { Suspense } from 'react'

export const AuthDashboardLayoutRoute = createRoute({
    component: AuthenticatedLayout,
    getParentRoute: () => DashboardLayoutRoute,
    id: 'authenticated-layout',
    loader: () => {
        let isAuthenticated

        if (AuthenticationHandler.quickTokenValidate()) {
            isAuthenticated = new Promise(resolve =>
                resolve({
                    data: true,
                    status: 200,
                    statusText: 'OK',
                } as AxiosResponse<boolean, any>),
            )
        } else {
            isAuthenticated = Auth_VerifyTokenAdmin()
        }

        return {
            isAuthenticated: defer(isAuthenticated),
        }
    },
})

function AuthenticatedLayout() {
    const isAuthenticated = AuthDashboardLayoutRoute.useLoaderData({
        select: res => res.isAuthenticated,
    })

    return (
        <Suspense fallback={'Loading...'}>
            <Await promise={isAuthenticated}>
                {(res: any) => {
                    if (res.data === true) {
                        return <Outlet key={'OUTLET_MAIN'} />
                    } else {
                        AuthenticationHandler.logout()
                        return (
                            <Navigate
                                to={LoginRoute.to}
                                search={{
                                    error: 'You do not have permission to view this page',
                                }}
                            />
                        )
                    }
                }}
            </Await>
        </Suspense>
    )
}
