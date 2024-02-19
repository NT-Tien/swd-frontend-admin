import { File_Upload } from '@/api/file/File_Upload'
import { Optional_Create_Req } from '@/api/option-product/Optional_Create'
import { Optional_CreateMany } from '@/api/option-product/Optional_CreateMany'
import { Product_Create, Product_Create_Req } from '@/api/product/Product_Create'
import { CreateProductMainError, CreateProductOptionalsError, FileUploadError } from '@/routes/Products/ProductCreate/util/error'
import { UploadFile } from 'antd'

type CreateProductWrapperProps = Omit<Product_Create_Req, 'images'> & {
    optionals: Optional_Create_Req[]
    images: UploadFile<any>[]
}
export async function createProductWrapper({ name, description, category_id, images, optionals }: CreateProductWrapperProps) {
    try {
        // Upload Images. If error, return error
        const uploadedImages = await Promise.all(
            images.map(async image => {
                const response = await File_Upload({
                    fileBinary: image.originFileObj as File,
                })
                if (!response?.data?.path) {
                    throw new Error('Upload failed')
                }
                return response.data.path
            }),
        )
        // Create Product with uploaded image URLs. If error, return error
        try {
            const product = await Product_Create({
                category_id,
                description,
                images: uploadedImages,
                name,
            })
            // Create Optionals with Product ID. If error, return error
            try {
                const optionalProducts = await Optional_CreateMany({
                    list: optionals.map(o => ({
                        ...o,
                        product_id: product.data.id,
                    })),
                })
                // Return Product ID
                return {
                    product,
                    optionalProducts,
                    uploadedImages,
                }
            } catch (error) {
                devLog('Error while creating optionals', error)
                throw new CreateProductOptionalsError('Error while creating optionals')
            }
        } catch (error) {
            devLog('Error while creating product', error)
            throw new CreateProductMainError('Error while creating product')
        }
    } catch (error) {
        devLog('Error while uploading images', error)
        throw new FileUploadError('Error while uploading images')
    }


}
