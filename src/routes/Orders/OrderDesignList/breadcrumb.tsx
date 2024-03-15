import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { OrderDesignListRoute } from '@/routes/Orders/OrderDesignList'

export const OrderDesignListBreadcrumb = makeBreadcrumb({
    title: 'Order Designs',
    onClick: () =>
        router.navigate({
            to: OrderDesignListRoute.to,
        }),
})
