import { Breadcrumb } from '@/lib/types/globals'
import { router } from '@/main'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'

export const AccountViewBreadcrumb = (id: string) =>
    ({
        key: 'bc-account_view',
        breadcrumbName: id,
        title: id,
        href: '',
        onClick: () =>
            router.navigate({
                to: AccountViewRoute.to,
                params: {
                    id,
                },
            }),
    }) as Breadcrumb
