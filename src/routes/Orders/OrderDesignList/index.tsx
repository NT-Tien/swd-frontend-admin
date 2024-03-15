import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type OrderDesignListRouteSearch = {
    page?: number
    size?: number
}

export const OrderDesignListRoute = createRoute({
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
    path: '/orders/design',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: OrderDesignListRouteSearch): OrderDesignListRouteSearch => {
        return {
            page: Number(search.page ?? 1),
            size: Number(search.size ?? 8),
        }
    },
})
