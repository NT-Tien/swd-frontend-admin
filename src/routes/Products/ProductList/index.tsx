import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import ListTemplate from '@/lib/template/ListTemplate'
import { Route } from '@tanstack/react-router'

const component = function ProductListPage() {
    return <ListTemplate />
}

export const ProductListRoute = new Route({
    path: '/products',
    component,
    getParentRoute: () => DashboardLayoutRoute,
})


