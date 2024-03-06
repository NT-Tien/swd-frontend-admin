import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { tabKeys } from '@/routes/Vouchers/util/tabItems'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type VouchersRouteSearch = {
    tab: tabKeys
}

export const VouchersRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.ADMIN, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: '/vouchers',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<VouchersRouteSearch>): VouchersRouteSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
