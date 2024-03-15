import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type OrdersListRouteSearch = {
    tab?: tabKeys
    page?: number
    size?: number
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
    validateSearch: (search: OrdersListRouteSearch): OrdersListRouteSearch => {
        const canViewAll = isAuthorized(Role.STAFF, AuthenticationHandler.getCurrentRole())

        if (!search.tab) {
            search.tab = 'all'
        }

        if (!canViewAll) {
            search.tab = 'orders-to-deliver'
        }

        return {
            tab: search.tab,
            page: Number(search.page) || 1,
            size: Number(search.size) || 8,
        }
    },
})
