import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Route } from '@tanstack/react-router'

export const DashboardRoute = new Route({
    component: DashboardPage,
    getParentRoute: () => DashboardLayoutRoute,
    path: '/dashboard',
})

function DashboardPage() {
    return <div>Hello world</div>
}
