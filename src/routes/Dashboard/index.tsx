import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { createRoute } from '@tanstack/react-router'

const component = function DashboardPage() {
    return <div>Hello world</div>
}

export const DashboardRoute = createRoute({
    component,
    getParentRoute: () => AuthDashboardLayoutRoute,
    path: '/dashboard',
})
