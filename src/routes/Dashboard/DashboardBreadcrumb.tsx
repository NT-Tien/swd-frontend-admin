import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { DashboardRoute } from '@/routes/Dashboard'
import { HomeFilled } from '@ant-design/icons'

export const DashboardBreadcrumb = makeBreadcrumb({
    title: <HomeFilled />,
    onClick: () => {
        router.navigate({
            to: DashboardRoute.to,
        })
    },
    show: isAuthorized(Role.ADMIN, AuthenticationHandler.getCurrentRole()),
})
