import { Category_Delete } from '@/api/category/Category_Delete'

type Category_DeleteMany_Req = {
    ids: string[]
}

export async function Category_DeleteMany({ ids }: Category_DeleteMany_Req) {
    return await Promise.all(ids.map(async id => await Category_Delete({ id })))
}
