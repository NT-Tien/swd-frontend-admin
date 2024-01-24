import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

const component = function DashboardPage() {
    return <div>Hello world</div>
}

export const DashboardRoute = new Route({
    component,
    getParentRoute: () => DashboardLayoutRoute,
    path: '/dashboard',
})
