export type Voucher = {
    code: string
    expired_date: Date
    amount: number
    limit_total_max: number
    limit_total_min: number
    discount_percent: number
    deletedAt: Date | null
    id: string
    createdAt: Date
    updatedAt: Date
}

export function ResponseToVoucher(response: Record<string, any>): Voucher {
    return {
        code: response.code,
        expired_date: new Date(response.expired_date),
        amount: response.amount,
        limit_total_max: response.limit_total_max,
        limit_total_min: response.limit_total_min,
        discount_percent: response.discount_percent,
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        id: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
    }
}

export function ResponseToVoucherList(response: Record<string, any>[]): (Voucher | null)[] {
    return response.map(voucher => (voucher ? ResponseToVoucher(voucher) : null))
}
