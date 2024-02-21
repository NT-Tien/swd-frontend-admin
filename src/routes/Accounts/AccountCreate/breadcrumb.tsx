import { Breadcrumb } from '@/lib/types/globals'
import { router } from '@/main'
import { AccountCreateRoute } from '@/routes/Accounts/AccountCreate'

export const AccountCreateBreadcrumb = {
    key: 'bc-account_create',
    breadcrumbName: 'Create',
    title: 'Create',
    href: '',
    onClick: () =>
        router.navigate({
            to: AccountCreateRoute.to,
        }),
} as Breadcrumb
