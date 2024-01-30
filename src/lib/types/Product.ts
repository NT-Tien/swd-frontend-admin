import { Category } from '@/lib/types/Category'

export type Product = {
    id: string
    key: string
    name: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    images: string[]
    description: string
    category_id: Category
}

export function ResponseToProduct(response: Record<string, any>): Product {
    return {
        id: response.id,
        key: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        name: response.name,
        images: response.images,
        description: response.description,
        category_id: response.category_id,
    } satisfies Product
}

export function ResponseToProductList(
    response: Record<string, any>[],
): Product[] {
    return response.map(item => ResponseToProduct(item))
}
