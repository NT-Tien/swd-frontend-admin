import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { TransactionListRoute } from '@/routes/Transactions/TransactionList'

export const TransactionListBreadcrumb = makeBreadcrumb({
    title: 'Transactions',
    onClick: () =>
        router.navigate({
            to: TransactionListRoute.to,
        }),
})
