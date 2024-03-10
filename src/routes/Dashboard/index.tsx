import { Account_GetAll } from '@/api/account/Account_GetAll'
import { BookingVisit_GetAll } from '@/api/booking-visit/Booking-Visit_GetAll'
import { Order_GetAll } from '@/api/order/Order_GetAll'
import { Product_GetAll } from '@/api/product/Product_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { queryOrder_RecentWithUser_DB } from '@/routes/Dashboard/util/queryOrder_GetAll_WithUser'
import { createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

const gcTime = 1000 * 60
const staleTime = 1000 * 60

export const DashboardRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.ADMIN, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    component: lazyRouteComponent(() => import('./page')),
    getParentRoute: () => DashboardLayoutRoute,
    path: '/dashboard',
    pendingComponent: () => 'LOADING...',
    loader: ({ context: { queryClient } }) => {
        const allProducts = queryClient.ensureQueryData({
            queryKey: ['products', 1, 0],
            queryFn: () => Product_GetAll({ page: 1, size: 10 }),
            gcTime,
            staleTime,
        })
        const allUsers = queryClient.ensureQueryData({
            queryKey: ['accounts', 1, 0],
            queryFn: () => Account_GetAll({ page: 1, size: 10 }),
            gcTime,
            staleTime,
        })
        // TODO fix bookings
        const allBookings = queryClient.ensureQueryData({
            queryKey: ['booking-visits', 1, 0],
            queryFn: () => BookingVisit_GetAll({ page: 1, limit: 500 }),
            gcTime,
            staleTime,
        })
        const allOrders = queryClient.ensureQueryData({
            queryKey: ['orders'],
            queryFn: () => Order_GetAll(),
            gcTime,
            staleTime,
        })

        queryClient.ensureQueryData(queryOrder_RecentWithUser_DB({ limit: 6 }))

        return {
            allProducts: defer(allProducts),
            allUsers: defer(allUsers),
            allBookings: defer(allBookings),
            allOrders: defer(allOrders),
        }
    },
})
