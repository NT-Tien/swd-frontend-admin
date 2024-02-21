import { Breadcrumb } from '@/lib/types/globals'
import { router } from '@/main'
import { AccountListRoute } from '@/routes/Accounts/AccountList'

export const AccountListBreadcrumb = {
    key: 'bc-account_list',
    breadcrumbName: 'Accounts',
    title: 'Accounts',
    href: '',
    onClick: () =>
        router.navigate({
            to: AccountListRoute.to,
            search: {
                page: 1,
            },
        }),
} as Breadcrumb
