import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { tabKeys } from '@/routes/Categories/CategoryList/util/tabItems'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type CategoryListSearch = {
    tab: tabKeys
}

export const CategoryListRoute = createRoute({
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (search: Partial<CategoryListSearch>): CategoryListSearch => {
        return {
            tab: search.tab || 'all',
        }
    },
})
