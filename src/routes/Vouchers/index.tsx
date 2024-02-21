import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { tabKeys } from '@/routes/Vouchers/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type VouchersRouteSearch = {
    tab: tabKeys
}

export const VouchersRoute = createRoute({
    path: '/vouchers',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<VouchersRouteSearch>): VouchersRouteSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
