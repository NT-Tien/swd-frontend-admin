import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

const component = function CategoryListPage() {
    return <div>This is the category list page</div>
}

export const CategoryListRoute = new Route({
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
