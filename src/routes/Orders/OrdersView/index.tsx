import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { Order_GetAll, queryKeyOrder_GetAll } from '@/api/order/Order_GetAll'
import LoadingComponent from '@/common/components/LoadingComponent'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { Navigate, createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

type OrdersViewParams = {
    id: string
}

export const OrdersViewRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.DSTAFF, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: '/orders/$id',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    parseParams: (raw: Record<string, unknown>): OrdersViewParams => {
        return {
            id: raw.id as string,
        }
    },
    loader: async ({ context: { queryClient }, params: { id } }) => {
        const orders = await queryClient.fetchQuery({
            queryKey: queryKeyOrder_GetAll(),
            queryFn: () => Order_GetAll(),
            gcTime: 1000 * 15, // 15 second cache
        })
        const result = orders.data.filter(order => order.id === id)

        if (!result || result.length === 0) {
            devLog(`Order ${id} cannot be found`)
            throw new Error('Order not found')
        }

        const order = result[0]
        const currentUser = queryClient.ensureQueryData(queryAccount_GetById({ id: order.user_id }))

        return {
            order,
            user: defer(currentUser),
        }
    },
    errorComponent: ({ error }) => {
        devLog(error)
        return <Navigate to={OrdersListRoute.to} search={{ tab: 'all' }} />
    },
    pendingComponent: () => {
        return <LoadingComponent />
    },
    validateSearch: (search: Record<string, unknown>) => {
        return {
            refresh: search.refresh || undefined,
        } as {
            refresh: boolean | undefined
        }
    },
})
