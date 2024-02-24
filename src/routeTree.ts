import { AuthLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import RootLayout from '@/layouts/RootLayout'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { DashboardRoute } from '@/routes/Dashboard'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { TestRoute } from '@/routes/Test'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { LoginRoute } from './routes/Login'
import { BookingsRoute } from './routes/Bookings'
import { SiteSettingsRoute } from '@/routes/SiteSettings'
import { VouchersRoute } from '@/routes/Vouchers'
import { AccountCreateRoute } from '@/routes/Accounts/AccountCreate'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'

export type RouterContext = {
    queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
    component: RootLayout,
})

export const routeTree = rootRoute.addChildren([
    LoginRoute,
    AuthLayoutRoute.addChildren([
        DashboardLayoutRoute.addChildren([
            DashboardRoute,
            ProductListRoute,
            ProductCreateRoute,
            ProductViewRoute,
            CategoryListRoute,
            CategoryCreateRoute,
            CategoryViewRoute,
            AccountListRoute,
            AccountCreateRoute,
            AccountViewRoute,
            OrdersListRoute,
            BookingsRoute,
            SiteSettingsRoute,
            VouchersRoute,
        ]),
    ]),
    TestRoute,
])
