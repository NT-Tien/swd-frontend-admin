import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import RootLayout from '@/layouts/RootLayout'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { LoginRoute } from './routes/Login'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductReviewRoute } from '@/routes/Products/ProductReview'
import { QueryClient } from '@tanstack/react-query'
import { rootRouteWithContext, createRouter } from '@tanstack/react-router'

export const queryClient = new QueryClient()

export const rootRoute = rootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootLayout,
})

const routeTree = rootRoute.addChildren([
    LoginRoute,
    DashboardLayoutRoute.addChildren([
        DashboardRoute,
        ProductListRoute,
        ProductCreateRoute,
        ProductReviewRoute,
        CategoryListRoute,
        CategoryCreateRoute,
    ]),
])
export const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}
