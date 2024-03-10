import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import axios from 'axios'

export type Staff_OrderDesigns_SendEmail_Req = {
    email: string
    orderId: string
}

export type Staff_OrderDesigns_SendEmail_Res = {
    success: boolean
}

export async function Staff_OrderDesigns_SendEmail(payload: Staff_OrderDesigns_SendEmail_Req) {
    const token = AuthenticationHandler.getMemoryToken()

    return await axios.post<Staff_OrderDesigns_SendEmail_Res>(
        'staff/send-email-to-user',
        {
            email: payload.email,
            id_order: payload.orderId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            transformResponse: [
                ParseResponse,
                (res: ApiResponse<any>) => {
                    return {
                        success: res.statusCode === 201,
                    }
                },
            ],
        },
    )
}
