import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

export const AccountViewRoute = createRoute({
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
    path: '/accounts/$id',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    parseParams: ({ id }) => {
        return {
            id: id ? String(id) : '',
        }
    },
    loader: async ({ params: { id }, context: { queryClient } }) => {
        const currentAccount = queryClient.ensureQueryData(queryAccount_GetById({ id }))

        return {
            account: defer(currentAccount),
        }
    },
})
