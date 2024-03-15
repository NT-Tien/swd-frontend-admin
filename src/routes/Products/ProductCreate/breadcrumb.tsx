import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'

export const ProductCreateBreadcrumb = makeBreadcrumb({
    title: 'Create Product',
    onClick: () =>
        router.navigate({
            to: ProductCreateRoute.to,
        }),
})
