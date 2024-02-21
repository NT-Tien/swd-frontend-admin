import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, lazyRouteComponent } from '@tanstack/react-router'

type BookingsRouteSearch = {
    page?: number
}

export const BookingsRoute = createRoute({
    getParentRoute: () => AuthDashboardLayoutRoute,
    path: 'bookings',
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (data: BookingsRouteSearch) => {
        return {
            page: data.page ?? 1,
        }
    },
})
