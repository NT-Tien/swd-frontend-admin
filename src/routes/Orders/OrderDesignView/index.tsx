import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { query_File_Show } from '@/api/file/File_Show'
import { queryStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

export const OrderDesignViewRoute = createRoute({
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
    path: '/orders/design/$id',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    parseParams: raw => {
        return {
            id: raw.id,
        }
    },
    loader: async ({ context: { queryClient }, params: { id } }) => {
        const orderDesigns = await queryClient.fetchQuery(queryStaff_OrderDesigns_GetAll())

        const currentOrderDesign = orderDesigns.data.find(orderDesign => orderDesign.id === id)
        if (!currentOrderDesign) {
            throw new Error('Order design not found')
        }

        const currentAccount = queryClient.ensureQueryData(queryAccount_GetById({ id: currentOrderDesign.user_id }))
        const currentFile = queryClient.ensureQueryData(query_File_Show({ path: currentOrderDesign.file }))

        return {
            orderDesign: currentOrderDesign,
            account: defer(currentAccount),
            currentFile: defer(currentFile),
        }
    },
})
