export type WalletTransaction = {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    wallet_id: string
    amount: number
    type: string // TODO get enum
    fee: number
}

export function ResponseToWalletTransaction(record: Record<string, any>) {
    return {
        id: record.id,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        deletedAt: record.deletedAt ? new Date(record.deletedAt) : null,
        wallet_id: record.wallet_id,
        amount: Number(record.amount),
        type: record.type,
        fee: Number(record.fee),
    } as WalletTransaction
}

export function ResponseToWalletTransactionList(record: Record<string, any>[]) {
    return record.map(ResponseToWalletTransaction)
}
