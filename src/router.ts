import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import RootLayout from '@/layouts/RootLayout'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { LoginRoute } from '@/routes/Login'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductReviewRoute } from '@/routes/Products/ProductReview'
import { RootRoute, Router } from '@tanstack/react-router'

export const rootRoute = new RootRoute({
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
export const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}