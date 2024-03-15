import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { AccountListRoute } from '@/routes/Accounts/AccountList'

export const AccountListBreadcrumb = makeBreadcrumb({
    title: 'Accounts',
    onClick: () =>
        router.navigate({
            to: AccountListRoute.to,
        }),
})
