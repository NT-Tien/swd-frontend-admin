import { queryProduct_GetOne } from '@/api/product/Product_GetOne'
import Head from '@/common/components/Head'
import LoadingComponent from '@/common/components/LoadingComponent'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { ProductListBreadcrumb } from '@/routes/Products/ProductList/breadcrumb'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { ProductViewBreadcrumb } from '@/routes/Products/ProductView/breadcrumb'
import AboutProduct from '@/routes/Products/ProductView/components/AboutProduct'
import DisableProductModal from '@/routes/Products/common/components/DisableProductModal'
import UpdateProductModal from '@/routes/Products/common/components/UpdateProductModal'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumb, Button, Flex, Tabs, Typography } from 'antd'

export default function ProductViewPage() {
    const id = ProductViewRoute.useParams({
        select: data => data.id,
    })
    const isEditing = ProductViewRoute.useSearch({
        select: data => data.editing,
    })
    const { data: product, isLoading, isError, isSuccess } = useQuery(queryProduct_GetOne({ id }))
    const currentRole = AuthenticationHandler.getCurrentRole()

    if (isLoading) {
        return <LoadingComponent />
    }

    if (isError) {
        return 'Error fetching product'
    }

    if (!isSuccess) {
        return
    }

    return (
        <>
            <Head title={`${product.name}`} />
            <Breadcrumb
                items={[DashboardBreadcrumb(), ProductListBreadcrumb(), ProductViewBreadcrumb({ title: product.id, isCurrent: true })]}
            />
            <Flex justify='space-between' align='center'>
                <Typography.Title level={1}>{product.name}</Typography.Title>
                <Flex gap={10}>
                    {isAuthorized(Role.ADMIN, currentRole) && (
                        <>
                            <UpdateProductModal isDefaultOpen={isEditing} defaultId={id}>
                                {({ handleOpen }) => (
                                    <Button type='primary' onClick={() => handleOpen(id)}>
                                        Edit
                                    </Button>
                                )}
                            </UpdateProductModal>
                            <DisableProductModal>
                                {({ handleOpen }) => (
                                    <Button type='primary' onClick={() => handleOpen(id)} danger>
                                        Disable
                                    </Button>
                                )}
                            </DisableProductModal>
                        </>
                    )}
                    {/* <DeleteProductModal
                        afterDelete={() =>
                            navigate({
                                to: ProductListRoute.to,
                                search: {
                                    page: 1,
                                    size: 8,
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
                    </DeleteProductModal> */}
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
                    // {
                    //     key: '2',
                    //     label: 'Stats',
                    //     children: <ProductStats />,
                    // },
                    // {
                    //     key: '3',
                    //     label: 'Settings',
                    //     children: <ProductSettings />,
                    // },
                ]}
            />
        </>
    )
}
