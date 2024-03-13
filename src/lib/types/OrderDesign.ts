export type OrderDesign = {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    user_id: string
    file: string
    username: string
    phone: string
    address: string
    set_price: string | null
    isMailed: boolean
    isPaid: boolean
    isDenied: boolean
}

export function ResponseToOrderDesign(record: Record<string, any>) {
    return {
        id: record.id,
        createdAt: new Date(record.createdAt),
        updatedAt: new Date(record.updatedAt),
        deletedAt: record.deletedAt ? new Date(record.deletedAt) : null,
        user_id: record.user_id,
        file: record.file,
        username: record.username,
        phone: record.phone,
        address: record.address,
        set_price: record.set_price,
        isMailed: record.isMailed,
        isPaid: record.isPaid,
        isDenied: record.isDenied,
    } as OrderDesign
}

export function ResponseToOrderDesignList(record: Record<string, any>[]) {
    return record.map(ResponseToOrderDesign)
}
