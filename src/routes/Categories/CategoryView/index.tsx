import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

export const CategoryViewRoute = createRoute({
    path: 'category/$id',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    parseParams: ({ id }) => ({
        id: String(id),
    }),
})
