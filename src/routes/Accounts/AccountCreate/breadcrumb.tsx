import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { AccountCreateRoute } from '@/routes/Accounts/AccountCreate'

export const AccountCreateBreadcrumb = makeBreadcrumb({
    title: 'Create Account',
    onClick: () =>
        router.navigate({
            to: AccountCreateRoute.to,
        }),
})
