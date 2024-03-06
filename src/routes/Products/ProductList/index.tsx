import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type ProductListSearch = {
    page: number
    tab: tabKeys
}

export const ProductListRoute = createRoute({
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
    path: '/products',
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<ProductListSearch>): ProductListSearch => {
        return {
            page: search.page ? Number(search.page) : 1,
            tab: search.tab ? search.tab : 'all',
        }
    },
    getParentRoute: () => DashboardLayoutRoute,
})
