export type ProductOptional = {
    id: string
    key: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    product_id: string
    name: string
    material: string
    price: string
    quantity: number
}

export function ResponseToProductOptional(
    response: Record<string, any>,
): ProductOptional {
    return {
        id: response.id,
        key: response.key,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        product_id: response.product_id,
        name: response.name,
        material: response.material,
        price: response.price,
        quantity: response.quantity,
    } satisfies ProductOptional
}

export function ResponseToProductOptionalList(
    response: Record<string, any>[],
): ProductOptional[] {
    return response.map(ResponseToProductOptional)
}
