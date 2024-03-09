import { rootRoute } from '@/routeTree'
import { createRoute } from '@tanstack/react-router'

const component = function TestPage() {
    return <div></div>
}

export const TestRoute = createRoute({
    path: '/test',
    getParentRoute: () => rootRoute,
    component,
})
