import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type ProductViewSearch = {
    editing?: boolean
}

export const ProductViewRoute = createRoute({
    path: '/products/$id',
    parseParams({ id }) {
        return {
            id: id ? String(id) : '',
        }
    },
    validateSearch: (search: ProductViewSearch) => {
        return {
            editing: search.editing ? Boolean(search.editing) : false,
        }
    },
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
