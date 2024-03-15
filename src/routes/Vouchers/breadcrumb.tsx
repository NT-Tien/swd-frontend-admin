import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { VouchersRoute } from '@/routes/Vouchers'

export const VouchersBreadcrumb = makeBreadcrumb({
    title: 'Vouchers',
    onClick: () =>
        router.navigate({
            to: VouchersRoute.to,
        }),
})
