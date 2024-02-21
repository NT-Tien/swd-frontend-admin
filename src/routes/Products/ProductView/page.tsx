import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import AboutProduct from '@/routes/Products/ProductView/components/AboutProduct'
import ProductSettings from '@/routes/Products/ProductView/components/ProductSettings'
import ProductStats from '@/routes/Products/ProductView/components/ProductStats'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
import DisableProductModal from '@/routes/Products/common/components/DisableProductModal'
import UpdateProductModal from '@/routes/Products/common/components/UpdateProductModal'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Flex, Tabs, Typography } from 'antd'

export default function ProductViewPage() {
    const id = ProductViewRoute.useParams({
        select: data => data.id,
    })
    const isEditing = ProductViewRoute.useSearch({
        select: data => data.editing,
    })
    const { data: product, isLoading, isError, isSuccess } = useQuery(queryProduct_GetOne({ id }))
    const navigate = useNavigate()

    if (isLoading) {
        return 'Loading...'
    }

    if (isError) {
        return 'Error fetching product'
    }

    if (!isSuccess) {
        return
    }

    return (
        <>
            <Flex justify='space-between' align='center'>
                <Typography.Title level={1}>{product.name}</Typography.Title>
                <Flex gap={10}>
                    <UpdateProductModal isDefaultOpen={isEditing} defaultId={id}>
                        {({ handleOpen }) => (
                            <Button type='primary' onClick={() => handleOpen(id)}>
                                Edit
                            </Button>
                        )}
                    </UpdateProductModal>
                    <DisableProductModal>
                        {({ handleOpen }) => (
                            <Button type='default' onClick={() => handleOpen(id)}>
                                Disable
                            </Button>
                        )}
                    </DisableProductModal>
                    <DeleteProductModal
                        afterDelete={() =>
                            navigate({
                                to: ProductListRoute.to,
                                search: {
                                    page: 1,
                                    tab: 'all',
                                },
                            })
                        }
                    >
                        {({ handleOpen }) => (
                            <Button type='primary' danger onClick={() => handleOpen(id)}>
                                Delete
                            </Button>
                        )}
                    </DeleteProductModal>
                </Flex>
            </Flex>
            <Tabs
                animated
                type='line'
                items={[
                    {
                        key: '1',
                        label: 'About',
                        children: <AboutProduct product={product} />,
                    },
                    {
                        key: '2',
                        label: 'Stats',
                        children: <ProductStats />,
                    },
                    {
                        key: '3',
                        label: 'Settings',
                        children: <ProductSettings />,
                    },
                ]}
            />
        </>
    )
}
