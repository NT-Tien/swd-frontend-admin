import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const CategoryCreateRoute = createRoute({
    path: '/categories/create',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
