import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute, defer, lazyRouteComponent } from '@tanstack/react-router'

export const AccountViewRoute = createRoute({
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
