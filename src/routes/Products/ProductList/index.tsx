import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import ListTemplate from '@/lib/template/ListTemplate'
import { createRoute } from '@tanstack/react-router'

const component = function ProductListPage() {
    return <ListTemplate />
}

export const ProductListRoute = createRoute({
    path: '/products',
    component,
    getParentRoute: () => DashboardLayoutRoute,
})


