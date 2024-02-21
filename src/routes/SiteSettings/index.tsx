import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const SiteSettingsRoute = createRoute({
    path: '/settings',
    getParentRoute: () => AuthDashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
