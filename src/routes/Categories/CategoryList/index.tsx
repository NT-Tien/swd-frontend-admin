import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

export const CategoryListRoute = new Route({
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component: CategoryListPage,
})

function CategoryListPage() {
    return <div>This is the category list page</div>
}
