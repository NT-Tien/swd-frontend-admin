import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

const component = function ProductCreatePage() {
    return <div>This is the product create page</div>
}

export const ProductCreateRoute = new Route({
    path: '/products/create',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})


