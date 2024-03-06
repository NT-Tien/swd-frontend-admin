import { DStaff_OrderToCancel } from '@/api/dstaff/DStaff_OrderToCancel'
import { DStaff_OrderToDelivered } from '@/api/dstaff/DStaff_OrderToDelivered'
import { DStaff_OrderToShipping } from '@/api/dstaff/DStaff_OrderToShipping'
import { DeliveryStatus } from '@/lib/types/Order'

type updateOrderStatusFnProps = {
    id: string
    status: DeliveryStatus
}

export async function updateOrderStatusFn({ id, status }: updateOrderStatusFnProps) {
    switch (status) {
        case DeliveryStatus.SHIPPING: {
            await DStaff_OrderToShipping({ id })
            break
        }
        case DeliveryStatus.DELIVERED: {
            await DStaff_OrderToDelivered({ id })
            break
        }
        case DeliveryStatus.CANCELED: {
            await DStaff_OrderToCancel({ id })
            break
        }
        default: {
            throw new Error('Invalid status')
        }
    }
}
