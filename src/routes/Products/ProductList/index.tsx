import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

export const ProductListRoute = new Route({
    path: '/products',
    component: ProductListPage,
    getParentRoute: () => DashboardLayoutRoute,
})

function ProductListPage() {
    return <div>This is the product list</div>
}
