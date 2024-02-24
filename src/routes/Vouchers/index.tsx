import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { tabKeys } from '@/routes/Vouchers/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type VouchersRouteSearch = {
    tab: tabKeys
}

export const VouchersRoute = createRoute({
    path: '/vouchers',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<VouchersRouteSearch>): VouchersRouteSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
