import { File_Upload } from '@/api/file/File_Upload'
import {
    Optional_Create,
    Optional_Create_Req,
} from '@/api/option-product/Optional_Create'
import {
    Product_Create,
    Product_Create_Req,
} from '@/api/product/Product_Create'
import { UploadFile } from 'antd'

type CreateProductWrapperProps = Omit<Product_Create_Req, 'images'> & {
    optionals: Optional_Create_Req[]
    images: UploadFile<any>[]
}
export async function createProductWrapper({
    name,
    description,
    category_id,
    images,
    optionals,
}: CreateProductWrapperProps) {
    // Upload Images. If error, return error
    const uploadedImages = await Promise.all(
        images.map(async image => {
            const response = await File_Upload({
                fileBinary: image.originFileObj as File,
            })
            return response.data.path
        }),
    ).catch(error => {
        console.error(error)
        throw error
    })

    // Create Product with uploaded image URLs. If error, return error
    const product = await Product_Create({
        category_id,
        description,
        images: uploadedImages ?? [],
        name,
    }).catch(error => {
        console.error(error)
        throw error
    })

    // Create Optionals with Product ID. If error, return error
    const optionalProducts = await Promise.all(
        optionals.map(async optional => {
            const optionalProduct = await Optional_Create({
                ...optional,
                product_id: product.data.id,
            })
            return optionalProduct
        }),
    ).catch(error => {
        console.error(error)
        throw error
    })

    // Return Product ID
    return {
        product,
        optionalProducts,
    }
}
