import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'

export const CategoryCreateBreadcrumb = makeBreadcrumb({
    title: 'Create Category',
    onClick: () =>
        router.navigate({
            to: CategoryCreateRoute.to,
        }),
})
