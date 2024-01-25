import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute } from '@tanstack/react-router'

const component = function ProductCreatePage() {
    return <div>This is the product create page</div>
}

export const ProductCreateRoute = createRoute({
    path: '/products/create',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})


