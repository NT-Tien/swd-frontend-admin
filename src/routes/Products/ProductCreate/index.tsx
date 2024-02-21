import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, defer, lazyRouteComponent } from '@tanstack/react-router'

export const ProductCreateRoute = createRoute({
    path: '/products/create',
    getParentRoute: () => AuthDashboardLayoutRoute,
    loader: ({ context: { queryClient } }) => {
        const categories = queryClient.ensureQueryData(queryCategory_GetAll())

        return {
            categories: defer(categories),
        }
    },
    component: lazyRouteComponent(() => import('./page')),
})
