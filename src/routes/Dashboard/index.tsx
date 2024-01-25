import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { createRoute } from '@tanstack/react-router'

const component = function DashboardPage() {
    return <div>Hello world</div>
}

export const DashboardRoute = createRoute({
    component,
    getParentRoute: () => DashboardLayoutRoute,
    path: '/dashboard',
})
