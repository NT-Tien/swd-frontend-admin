import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const DashboardRoute = createRoute({
    component: lazyRouteComponent(() => import('./page')),
    getParentRoute: () => DashboardLayoutRoute,
    path: '/dashboard',
})
