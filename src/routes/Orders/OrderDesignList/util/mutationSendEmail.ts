import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { Staff_OrderDesigns_SendEmail } from '@/api/staff/Staff_OrderDesigns_SendEmail'
import { queryClient } from '@/main'

export async function mutationSendEmail({ orderId, userId }: { orderId: string; userId: string }) {
    const user = await queryClient.fetchQuery(queryAccount_GetById({ id: userId }))

    if (!user.data) {
        return false
    }

    const response = await Staff_OrderDesigns_SendEmail({
        email: user.data.email,
        orderId,
    })

    return response.data.success
}
