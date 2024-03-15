import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { ProductListRoute } from '@/routes/Products/ProductList'

export const ProductListBreadcrumb = makeBreadcrumb({
    title: 'Products',
    onClick: () =>
        router.navigate({
            to: ProductListRoute.to,
        }),
})
