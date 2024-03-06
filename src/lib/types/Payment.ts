export type Transaction = {
    amount: number
    reference: string
    description: string
    accountNumber: string
    counterAccountName: string | null
    virtualAccountName: string | null
    transactionDateTime: Date
    counterAccountBankId: string | null
    counterAccountNumber: string | null
    virtualAccountNumber: string | null
    counterAccountBankName: string | null
}

export type Payment = {
    id: string
    amount: number
    createdAt: Date
    status: string
    orderCode: number
    amountPaid: number
    canceledAt: Date | null
    transactions: Transaction[]
    amountRemaining: number
    cancellationReason: string | null
}

export function ResponseToTransaction(record: Record<string, any>) {
    return {
        amount: record.amount,
        reference: record.reference,
        description: record.description,
        accountNumber: record.accountNumber,
        counterAccountName: record.counterAccountName,
        virtualAccountName: record.virtualAccountName,
        transactionDateTime: new Date(record.transactionDateTime),
        counterAccountBankId: record.counterAccountBankId,
        counterAccountNumber: record.counterAccountNumber,
        virtualAccountNumber: record.virtualAccountNumber,
        counterAccountBankName: record.counterAccountBankName,
    } as Transaction
}

export function ResponseToPayment(record: Record<string, any>) {
    return {
        id: record.id,
        amount: record.amount,
        createdAt: new Date(record.createdAt),
        status: record.status,
        orderCode: record.orderCode,
        amountPaid: record.amountPaid,
        canceledAt: record.canceledAt ? new Date(record.canceledAt) : null,
        transactions: record.transactions ? record.transactions.map(ResponseToTransaction) : [],
        amountRemaining: record.amountRemaining,
        cancellationReason: record.cancellationReason,
    } as Payment
}
