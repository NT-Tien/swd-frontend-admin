import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

export const TransactionListRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.STAFF, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: '/wallet-transactions',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
