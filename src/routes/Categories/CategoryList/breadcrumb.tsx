import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'

export const CategoryListBreadcrumb = makeBreadcrumb({
    title: 'Categories',
    onClick: () =>
        router.navigate({
            to: CategoryListRoute.to,
        }),
})
