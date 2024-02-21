import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const AccountCreateRoute = createRoute({
    path: '/accounts/create',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
