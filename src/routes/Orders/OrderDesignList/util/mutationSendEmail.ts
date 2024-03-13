import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { Staff_OrderDesigns_SendDeniedEmail } from '@/api/staff/Staff_OrderDesigns_SendDeniedEmail'
import { Staff_OrderDesigns_SendEmail } from '@/api/staff/Staff_OrderDesigns_SendEmail'
import { queryClient } from '@/main'

export async function mutationSendEmail({ orderId, userId, isAccepting }: { orderId: string; userId: string; isAccepting: boolean }) {
    const user = await queryClient.ensureQueryData(queryAccount_GetById({ id: userId }))

    if (!user.data) {
        return false
    }

    let response

    if (isAccepting) {
        response = await Staff_OrderDesigns_SendEmail({
            email: user.data.email,
            orderId,
        })
    } else {
        response = await Staff_OrderDesigns_SendDeniedEmail({
            email: user.data.email,
            orderId,
        })
    }

    return response.data.success
}
