import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router'

type BookingsRouteSearch = {
    page?: number
}

export const BookingsRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.STAFF, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    getParentRoute: () => DashboardLayoutRoute,
    path: 'bookings',
    component: lazyRouteComponent(() => import('./page')),
    validateSearch: (data: BookingsRouteSearch) => {
        return {
            page: data.page ?? 1,
        }
    },
})
