import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type OrdersListRouteSearch = {
    tab: tabKeys
}

export const OrdersListRoute = createRoute({
    path: '/orders',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<OrdersListRouteSearch>): OrdersListRouteSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
