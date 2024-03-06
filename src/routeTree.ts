import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import RootLayout from '@/layouts/RootLayout'
import { AccountCreateRoute } from '@/routes/Accounts/AccountCreate'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { CategoryCreateRoute } from '@/routes/Categories/CategoryCreate'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { DashboardRoute } from '@/routes/Dashboard'
import { OrderDesignListRoute } from '@/routes/Orders/OrderDesignList'
import { OrderDesignViewRoute } from '@/routes/Orders/OrderDesignView'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { SiteSettingsRoute } from '@/routes/SiteSettings'
import { TestRoute } from '@/routes/Test'
import { VouchersRoute } from '@/routes/Vouchers'
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext } from '@tanstack/react-router'
import { BookingsRoute } from './routes/Bookings'
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
        OrderDesignListRoute,
        OrderDesignViewRoute,
        OrdersListRoute,
        OrdersViewRoute,
        BookingsRoute,
        SiteSettingsRoute,
        VouchersRoute,
    ]),
    TestRoute,
])
