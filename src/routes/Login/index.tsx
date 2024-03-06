// * Currently, each login calls the api three times:
// 1. Authenticate account
// 2. Check if admin
// 3. Another check if admin when accessing admin

import { rootRoute } from '@/routeTree'
import LoginPage from '@/routes/Login/page'
import { createRoute } from '@tanstack/react-router'

type LoginRouteSearch = {
    error?: string
    pageAccessDenied?: boolean
}

export const LoginRoute = createRoute({
    component: LoginPage,
    getParentRoute: () => rootRoute,
    path: '/',
    validateSearch: (search: LoginRouteSearch) => {
        return {
            error: search.error,
            pageAccessDenied: search.pageAccessDenied ?? false,
        } as LoginRouteSearch
    },
})
