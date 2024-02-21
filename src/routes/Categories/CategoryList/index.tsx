import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { tabKeys } from '@/routes/Categories/CategoryList/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type CategoryListSearch = {
    tab: tabKeys
}

export const CategoryListRoute = createRoute({
    path: '/categories',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<CategoryListSearch>): CategoryListSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
