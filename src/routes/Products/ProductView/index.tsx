import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import { AuthDashboardLayoutRoute } from '@/layouts/AuthenticatedLayout'
import { ProductListRoute } from '@/routes/Products/ProductList'
import AboutProduct from '@/routes/Products/ProductView/components/AboutProduct'
import ProductSettings from '@/routes/Products/ProductView/components/ProductSettings'
import ProductStats from '@/routes/Products/ProductView/components/ProductStats'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
import UpdateProductModal from '@/routes/Products/common/components/UpdateProductModal'
import { useQuery } from '@tanstack/react-query'
import { createRoute, useNavigate } from '@tanstack/react-router'
import { Button, Flex, Tabs, Typography } from 'antd'

const component = function ProductViewPage() {
    const id = ProductViewRoute.useParams({
        select: data => data.id,
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
                <Typography.Title level={1}>{product.name} </Typography.Title>
                <Flex gap={10}>
                    <UpdateProductModal>
                        {({ handleOpen }) => (
                            <Button type='primary' onClick={() => handleOpen(id)}>
                                Edit
                            </Button>
                        )}
                    </UpdateProductModal>
                    <DeleteProductModal
                        afterDelete={() =>
                            navigate({
                                to: ProductListRoute.to,
                                search: {
                                    page: 1,
                                },
                            })
                        }
                    >
                        {({ handleOpen: handleOpenDeleteProduct }) => (
                            <Button type='primary' danger onClick={() => handleOpenDeleteProduct(id)}>
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

type ProductViewSearch = {
    editing?: boolean
}

export const ProductViewRoute = createRoute({
    path: '/products/$id',
    parseParams({ id }) {
        return {
            id: id ? String(id) : '',
        }
    },
    validateSearch: (search: Record<string, unknown>): ProductViewSearch => ({
        editing: search.editing ? Boolean(search.editing) : false,
    }),
    getParentRoute: () => AuthDashboardLayoutRoute,
    component,
})
