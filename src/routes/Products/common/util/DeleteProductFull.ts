import { Optional_Delete } from '@/api/option-product/Optional_Delete'
import { Product_Delete } from '@/api/product/Product_Delete'

export async function DeleteProductFull(productId: string, optionalProductIds: string[]) {
    const promises = optionalProductIds.map(async id => {
        try {
            await Optional_Delete({ id })
            return 1
        } catch (error) {
            return 0
        }
    })

    const results = await Promise.all(promises)

    if (!results.every(r => r === 1)) {
        throw new Error('Error deleting optional products')
    }

    try {
        await Product_Delete({ id: productId })
    } catch (error) {
        throw new Error('Error deleting product')
    }
}
