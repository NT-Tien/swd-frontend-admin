import { Breadcrumb } from '@/lib/types/globals'
import { router } from '@/main'
import { DashboardRoute } from '@/routes/Dashboard'
import { HomeFilled } from '@ant-design/icons'

export const DashboardBreadcrumb = {
    key: 'bc-dashboard',
    breadcrumbName: 'Dashboard',
    title: <HomeFilled />,
    onClick: () =>
        router.navigate({
            to: DashboardRoute.to,
        }),
} as Breadcrumb
