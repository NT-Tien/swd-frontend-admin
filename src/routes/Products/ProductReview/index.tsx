import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute } from '@tanstack/react-router'

const component = function ProductReviewPage() {
    return <div>This is the product review page</div>
}

export const ProductReviewRoute = createRoute({
    path: '/products/review',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
