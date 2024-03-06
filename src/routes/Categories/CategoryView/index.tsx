import { queryCategory_GetOne } from '@/api/category/Category_GetOne'
import { queryProduct_GetAll } from '@/api/product/Product_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role } from '@/lib/types/Account'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { Navigate, createRoute, defer, lazyRouteComponent, redirect } from '@tanstack/react-router'

type CategoryViewSearch = {
    page: number
}

export const CategoryViewRoute = createRoute({
    beforeLoad: async () => {
        await AuthenticationHandler.authorize(Role.ADMIN, loginRoute => {
            throw redirect({
                to: loginRoute,
                search: {
                    pageAccessDenied: true,
                },
            })
        })
    },
    path: 'category/$id',
    getParentRoute: () => DashboardLayoutRoute,
    component: lazyRouteComponent(() => import('./page')),
    parseParams: ({ id }) => ({
        id: String(id),
    }),
    validateSearch: (search: Record<string, unknown>) => {
        return {
            page: Number(search.page ?? 0),
        } as CategoryViewSearch
    },
    loaderDeps: ({ search: { page } }) => ({
        page,
    }),
    loader: ({ context: { queryClient }, params: { id }, deps: { page } }) => {
        const category = queryClient.ensureQueryData(queryCategory_GetOne({ id }))
        const products = queryClient.ensureQueryData(queryProduct_GetAll({ page, size: 5, categoryId: id }))

        return {
            category: defer(category),
            products: defer(products),
        }
    },
    errorComponent: () => {
        return <Navigate to={CategoryListRoute.to} search={{ tab: 'all' }} />
    },
})
