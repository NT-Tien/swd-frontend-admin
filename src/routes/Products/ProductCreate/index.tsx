import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

export const ProductCreateRoute = createRoute({
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
    path: '/products/create',
    getParentRoute: () => DashboardLayoutRoute,
    loader: ({ context: { queryClient } }) => {
        const categories = queryClient.ensureQueryData(queryCategory_GetAll())

        return {
            categories: defer(categories),
        }
    },
    component: lazyRouteComponent(() => import('./page')),
})
