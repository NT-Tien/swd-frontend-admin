import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute } from '@tanstack/react-router'

const component = function CategoryCreatePage() {
    return <div>This is the category create page</div>
}

export const CategoryCreateRoute = createRoute({
    path: '/categories/create',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})

