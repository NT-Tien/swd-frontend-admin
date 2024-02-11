import { File_Upload } from '@/api/file/File_Upload'
import { Product_Update, Product_Update_Req } from '@/api/product/Product_Update'
import { FileUploadError } from '@/routes/Products/ProductCreate/util/error'
import { UploadFile } from 'antd'

type UpdateProductProps = {
    product: Product_Update_Req
    images: UploadFile<any>[]
}

export async function UpdateProduct({ product, images }: UpdateProductProps) {
    // Upload Images
    let uploadedImages: string[] = []
    try {
        uploadedImages = await Promise.all(
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
    } catch (error) {
        console.error('Error while uploading images', error)
        throw new FileUploadError('Error while uploading images')
    }

    // Update Product
    let productRes
    product.payload.images = uploadedImages
    try {
        productRes = await Product_Update(product)
    } catch (error) {
        console.error('Error while updating product', error)
        throw new Error('Error while updating product')
    }

    return {
        product: productRes,
    }
}
