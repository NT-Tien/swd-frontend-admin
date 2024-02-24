import { ProductOptional } from '@/lib/types/ProductOptional'

export enum DeliveryStatus {
    PENDING = 'PENDING',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
}

export type Order = {
    id: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    user_id: string
    total: string
    products: Omit<ProductOptional, 'createdAt' | 'updatedAt' | 'deletedAt' | 'key'>[]
    voucher_id: string | null
    address: string
    phone: string
    email: string
    payment: string | null
    wallet_payment: string | null
    status_delivery: DeliveryStatus
}

export function ResponseToOrder(response: Record<string, any>): Order {
    return {
        id: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        user_id: response.user_id,
        total: response.total,
        products: response.products,
        voucher_id: response.voucher_id,
        address: response.address,
        phone: response.phone,
        email: response.email,
        payment: response.payment,
        wallet_payment: response.wallet_payment,
        status_delivery: response.status_delivery,
    } satisfies Order
}

export function ResponseToOrderList(response: Record<string, any>[]): Order[] {
    return response.map(ResponseToOrder)
}
