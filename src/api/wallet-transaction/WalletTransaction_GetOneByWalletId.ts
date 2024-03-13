import { ParseResponse } from '@/api/defaults'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { ResponseToWalletTransactionList, WalletTransaction } from '@/lib/types/WalletTransaction'
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export type WalletTransaction_GetOneByWalletId_Req = {
    wallet_id: string
}

export type WalletTransaction_GetOneByWalletId_Res = WalletTransaction[]

export async function WalletTransaction_GetOneByWalletId({ wallet_id }: WalletTransaction_GetOneByWalletId_Req) {
    return await axios.get<WalletTransaction_GetOneByWalletId_Res>(`/transaction/${encodeURIComponent(wallet_id)}`, {
        headers: {
            Authorization: `Bearer ${AuthenticationHandler.getMemoryToken()}`,
        },
        transformResponse: [
            ParseResponse,
            (res: ApiResponse<WalletTransaction_GetOneByWalletId_Res>) => {
                if ('data' in res) {
                    return ResponseToWalletTransactionList(res.data)
                } else {
                    devLog('Error while getting wallet transaction list by wallet ID', res.message, ' (', res.statusCode, ')')
                    throw new Error(res.message)
                }
            },
        ],
    })
}

export const queryKeyWalletTransaction_GetOneByWalletId = ({ wallet_id }: WalletTransaction_GetOneByWalletId_Req) => [
    'wallet-transaction',
    wallet_id,
]
export const queryWalletTransaction_GetOneByWalletId = ({ wallet_id }: WalletTransaction_GetOneByWalletId_Req) =>
    queryOptions({
        queryKey: queryKeyWalletTransaction_GetOneByWalletId({ wallet_id }),
        queryFn: () => WalletTransaction_GetOneByWalletId({ wallet_id }),
        select: res => res.data,
    })
