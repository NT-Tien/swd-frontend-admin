import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type ProductListSearch = {
    page: number
    tab: tabKeys
}

export const ProductListRoute = createRoute({
    path: '/products',
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<ProductListSearch>): ProductListSearch => {
        return {
            page: search.page ? Number(search.page) : 1,
            tab: search.tab ? search.tab : 'all',
        }
    },
    getParentRoute: () => AuthDashboardLayoutRoute,
})
