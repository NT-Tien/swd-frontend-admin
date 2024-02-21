import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute, defer, lazyRouteComponent } from '@tanstack/react-router'

export const AccountViewRoute = createRoute({
    path: '/accounts/$id',
    getParentRoute: () => AuthDashboardLayoutRoute,
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
