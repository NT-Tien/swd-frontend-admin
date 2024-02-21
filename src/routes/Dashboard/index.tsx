import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const DashboardRoute = createRoute({
    component: lazyRouteComponent(() => import('./page')),
    getParentRoute: () => AuthDashboardLayoutRoute,
    path: '/dashboard',
})
