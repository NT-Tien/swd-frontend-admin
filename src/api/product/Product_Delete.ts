import axios from 'axios'

export type Product_Delete_Req = {
    id: string
}

export type Product_Delete_Res = {
    success: boolean
}

export type Product_Delete_Res_Raw = {
    affected: number
    generatedMaps: string[]
    raw: string[]
}

export function Product_Delete({ id }: Product_Delete_Req) {
    return axios.delete<Product_Delete_Res>('product/delete/' + encodeURIComponent(id), {
        transformResponse: [
            (data: any) => {
                const dataParsed = JSON.parse(data) as Product_Delete_Res_Raw

                console.log(dataParsed)

                return {
                    success: dataParsed.affected > 0,
                }
            },
        ],
    })
}
