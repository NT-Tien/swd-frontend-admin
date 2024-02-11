import { queryCategory_GetAll } from '@/api/category/Category_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import UpdateOptionalProductForm from '@/routes/Products/ProductUpdate/components/UpdateOptionalProductForm'
import UpdateProductForm from '@/routes/Products/ProductUpdate/components/UpdateProductForm'
import { createRoute, defer } from '@tanstack/react-router'
import { Tabs } from 'antd'

const component = function ProductUpdatePage() {
    const id = ProductUpdateRoute.useParams({
        select: data => data.id,
    })

    return (
        <Tabs
            animated
            type='line'
            items={[
                {
                    key: 'update-product-modal-1',
                    label: 'Product Details',
                    children: <UpdateProductForm productId={id} />,
                },
                {
                    key: 'update-product-modal-2',
                    label: 'Optional Products',
                    children: <UpdateOptionalProductForm productId={id} />,
                },
            ]}
        />
    )
}

export const ProductUpdateRoute = createRoute({
    path: '/products/$id/update',
    getParentRoute: () => DashboardLayoutRoute,
    parseParams: ({ id }) => {
        return {
            id: id ? String(id) : '',
        }
    },
    loader: async ({ context: { queryClient } }) => {
        const categories = queryClient.ensureQueryData(queryCategory_GetAll())

        return {
            categories: defer(categories),
        }
    },
    component,
})
