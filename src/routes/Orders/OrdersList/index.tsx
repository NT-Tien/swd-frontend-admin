import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type OrdersListRouteSearch = {
    tab: tabKeys
}

export const OrdersListRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.DSTAFF, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: '/orders',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<OrdersListRouteSearch>): OrdersListRouteSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
