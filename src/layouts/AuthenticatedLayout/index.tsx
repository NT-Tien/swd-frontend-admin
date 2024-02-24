import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { rootRoute } from '@/routeTree'
import { LoginRoute } from '@/routes/Login'
import { Await, Navigate, Outlet, createRoute, defer } from '@tanstack/react-router'
import { Suspense } from 'react'

export const AuthLayoutRoute = createRoute({
    component: AuthenticatedLayout,
    getParentRoute: () => rootRoute,
    id: 'authenticated-layout',
    loader: () => {
        const quickValidated = AuthenticationHandler.clientVerifyToken()

        /**
         * quickValidated will be false upon first login.
         * This is to force the client to server-check if the token is from an authorized user.
         * After the server-check, quickValidated will be true unless:
         * 1) The token is expired
         * 2) Someone changed the token cookie
         */
        if (quickValidated) {
            return {
                isAuthenticated: defer(new Promise<boolean>(resolve => resolve(true))),
            }
        } else {
            return {
                isAuthenticated: defer(AuthenticationHandler.serverVerifyToken()),
            }
        }
    },
})

function AuthenticatedLayout() {
    const isAuthenticated = AuthLayoutRoute.useLoaderData({
        select: res => res.isAuthenticated,
    })

    return (
        <Suspense fallback={'Loading...'}>
            <Await promise={isAuthenticated}>
                {(res: boolean) => {
                    if (res === true) {
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
