import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToWalletTransactionList, WalletTransaction } from '@/lib/types/WalletTransaction'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type WalletTransaction_GetAll_Res = WalletTransaction[]

export async function WalletTransaction_GetAll() {
    return await axios.get<WalletTransaction_GetAll_Res>('/transaction/get-all', {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<WalletTransaction_GetAll_Res>) => {
                if ('data' in res) {
                    return ResponseToWalletTransactionList(res.data)
                } else {
                    devLog('Error while getting wallet transaction list', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyWalletTransaction_GetAll = () => ['wallet-transaction']
export const queryWalletTransaction_GetAll = () =>
    queryOptions({
        queryKey: queryKeyWalletTransaction_GetAll(),
        queryFn: () => WalletTransaction_GetAll(),
        select: res => res.data,
    })
