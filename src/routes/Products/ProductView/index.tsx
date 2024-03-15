import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type ProductViewSearch = {
    editing?: boolean
}

export const ProductViewRoute = createRoute({
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