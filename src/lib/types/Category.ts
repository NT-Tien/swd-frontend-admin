export type Category = {
    id: string
    key: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    name: string
}

export function ResponseToCategory(response: Record<string, any>): Category {
    return {
        id: response.id,
        key: response.id,
        createdAt: new Date(response.createdAt),
        updatedAt: new Date(response.updatedAt),
        deletedAt: response.deletedAt ? new Date(response.deletedAt) : null,
        name: response.name,
    } satisfies Category
}

export function ResponseToCategoryList(response: Record<string, any>[]): (Category | null)[] {
    return response.map(item => ResponseToCategory(item))
}
