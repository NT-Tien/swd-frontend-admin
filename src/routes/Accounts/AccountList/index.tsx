import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type AccountListSearch = {
    page?: number
}

export const AccountListRoute = createRoute({
    path: '/accounts',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: AccountListSearch) => {
        return {
            page: search.page ? Number(search.page) : 1,
        }
    },
})
