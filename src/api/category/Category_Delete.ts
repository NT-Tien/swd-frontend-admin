import axios from 'axios'

export type Category_Delete_Req = {
    id: string
}

export type Category_Delete_Res = {
    success: boolean
}

type Category_Delete_Res_Raw = {
    affected: number
    generatedMaps: string[]
    raw: string[]
}

export async function Category_Delete({ id }: Category_Delete_Req) {
    return await axios.delete<Category_Delete_Res>(
        'category/delete/' + encodeURIComponent(id),
        {
            transformResponse: [
                (data: any) => {
                    const dataParsed = JSON.parse(
                        data,
                    ) as Category_Delete_Res_Raw

                    return {
                        success: dataParsed.affected > 0,
                    }
                },
            ],
        },
    )
}
