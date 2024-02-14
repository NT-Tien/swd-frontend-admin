import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import RootLayout from '@/layouts/RootLayout'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductReviewRoute } from '@/routes/Products/ProductReview'
import { ProductUpdateRoute } from '@/routes/Products/ProductUpdate'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { TestRoute } from '@/routes/Test'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { LoginRoute } from './routes/Login'

export type RouterContext = {
    queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
})

export const routeTree = rootRoute.addChildren([
    LoginRoute,
    DashboardLayoutRoute.addChildren([
        AuthDashboardLayoutRoute.addChildren([
            DashboardRoute,
            ProductListRoute,
            ProductCreateRoute,
            ProductReviewRoute,
            ProductUpdateRoute,
            ProductViewRoute,
            CategoryListRoute,
            CategoryCreateRoute,
            AccountListRoute,
        ]),
    ]),
    TestRoute,
])
