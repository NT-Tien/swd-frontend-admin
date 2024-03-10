import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type AccountListSearch = {
    page?: number
    size?: number
}

export const AccountListRoute = createRoute({
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
    path: '/accounts',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: AccountListSearch) => {
        return {
            page: search.page ? Number(search.page) : 1,
            size: search.size ? Number(search.size) : 8,
        }
    },
})
