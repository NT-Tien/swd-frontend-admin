import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToVoucher, Voucher } from '@/lib/types/Voucher'
import axios from 'axios'

export type Voucher_Update_Req = {
    id: string
    payload: {
        code: string
        expired_date: string // utc string date (date.toISOString())
        amount: number
        limit_total_max: number
        limit_total_min: number
        discount_percent: number
    }
}

export type Voucher_Update_Res = Voucher

export function Voucher_Update(payload: Voucher_Update_Req) {
    return axios.put<Voucher_Update_Res>('voucher/update/' + encodeURIComponent(payload.id), payload.payload, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getToken()}`,
        },
        responseType: 'json',
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<string>) => {
                if ('data' in res) {
                    return ResponseToVoucher(res)
                } else {
                    devLog('Error while updating voucher', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}
