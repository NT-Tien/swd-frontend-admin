import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

export const CategoryCreateRoute = new Route({
    path: '/categories/create',
    getParentRoute: () => DashboardLayoutRoute,
    component: CategoryCreatePage,
})

function CategoryCreatePage() {
    return <div>This is the category create page</div>
}
