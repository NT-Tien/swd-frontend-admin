import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'

export const OrdersListBreadcrumb = makeBreadcrumb({
    title: 'Orders',
    onClick: () =>
        router.navigate({
            to: OrdersListRoute.to,
        }),
})
