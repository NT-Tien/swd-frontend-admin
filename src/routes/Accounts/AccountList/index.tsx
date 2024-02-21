import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type AccountListSearch = {
    page?: number
}

export const AccountListRoute = createRoute({
    path: '/accounts',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: AccountListSearch) => {
        return {
            page: search.page ? Number(search.page) : 1,
        }
    },
})