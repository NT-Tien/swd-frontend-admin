import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

const component = function ProductReviewPage() {
    return <div>This is the product review page</div>
}

export const ProductReviewRoute = new Route({
    path: '/products/review',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
