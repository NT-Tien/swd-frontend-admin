import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

export const ProductCreateRoute = new Route({
    path: '/products/create',
    getParentRoute: () => DashboardLayoutRoute,
    component: ProductCreatePage,
})

function ProductCreatePage() {
    return <div>This is the product create page</div>
}
