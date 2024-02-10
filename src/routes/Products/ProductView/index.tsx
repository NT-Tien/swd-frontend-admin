import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { ProductUpdateRoute } from '@/routes/Products/ProductUpdate'
import AboutProduct from '@/routes/Products/ProductView/components/AboutProduct'
import ProductSettings from '@/routes/Products/ProductView/components/ProductSettings'
import ProductStats from '@/routes/Products/ProductView/components/ProductStats'
import DeleteProductModal from '@/routes/Products/common/components/DeleteProductModal'
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
                <>
                    <Flex justify='space-between' align='center'>
                        <Typography.Title level={1}>{product.name} </Typography.Title>
                        <Flex gap={10}>
                            <Button
                                type='primary'
                                onClick={() =>
                                    navigate({
                                        to: ProductUpdateRoute.to,
                                        params: {
                                            id,
                                        },
                                    })
                                }
                            >
                                Edit
                            </Button>
                            <Button type='primary' danger onClick={() => handleOpenDeleteProduct(id)}>
                                Delete
                            </Button>
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
            )}
        </DeleteProductModal>
    )
}

export const ProductViewRoute = createRoute({
    path: '/products/$id',
    parseParams({ id }) {
        return {
            id: id ? String(id) : '',
        }
    },
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
