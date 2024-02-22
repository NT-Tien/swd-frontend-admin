import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const SiteSettingsRoute = createRoute({
    path: '/settings',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
})
