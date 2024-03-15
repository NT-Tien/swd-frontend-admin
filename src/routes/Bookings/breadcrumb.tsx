import makeBreadcrumb from '@/lib/util/makeBreadcrumb'
import { router } from '@/main'
import { BookingsRoute } from '@/routes/Bookings'

export const BookingsBreadcrumb = makeBreadcrumb({
    title: 'Bookings',
    onClick: () =>
        router.navigate({
            to: BookingsRoute.to,
        }),
})
