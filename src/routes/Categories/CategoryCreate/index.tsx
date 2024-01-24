import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

const component = function CategoryCreatePage() {
    return <div>This is the category create page</div>
}

export const CategoryCreateRoute = new Route({
    path: '/categories/create',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})

