import { Auth_VerifyTokenAdmin } from '@/api/auth/Auth_VerifyTokenAdmin'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { LoginRoute } from '@/routes/Login'
import { Await, Navigate, Outlet, createRoute, defer } from '@tanstack/react-router'
import { Suspense } from 'react'
import Cookies from 'js-cookie'

export const AuthDashboardLayoutRoute = createRoute({
    component: AuthenticatedLayout,
    getParentRoute: () => DashboardLayoutRoute,
    id: 'authenticated-layout',
    loader: () => {
        const isAuthenticated = Auth_VerifyTokenAdmin()

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
        <Suspense>
            <Await promise={isAuthenticated}>
                {res => {
                    if (res.data === true) {
                        return <Outlet key={'OUTLET_MAIN'} />
                    } else {
                        Cookies.remove('token')
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
