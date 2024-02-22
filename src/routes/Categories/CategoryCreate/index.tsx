import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const CategoryCreateRoute = createRoute({
    path: '/categories/create',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
