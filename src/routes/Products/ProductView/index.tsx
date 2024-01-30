import { Product_GetOne } from '@/api/product/Product_GetOne'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { Await, createRoute, defer } from '@tanstack/react-router'
import { Suspense } from 'react'

const component = function ProductViewPage() {
    const id = ProductViewRoute.useParams({
        select: data => data.id,
    })
    const product = ProductViewRoute.useLoaderData({
        select: data => data.products,
    })

    return (
        <div>
            This is the product review page {id}{' '}
            <Suspense fallback={<div>Loading...</div>}>
                <Await promise={product}>
                    {data => <div>{JSON.stringify(data, null, 2)}</div>}
                </Await>
            </Suspense>
        </div>
    )
}

export const ProductViewRoute = createRoute({
    path: '/products/$id',
    getParentRoute: () => DashboardLayoutRoute,
    parseParams: (params: Record<string, unknown>) => {
        return {
            id: params.id ? String(params.id) : '',
        }
    },
    loader: async ({ params, context: { queryClient } }) => {
        const products = queryClient.ensureQueryData({
            queryKey: ['product', params.id],
            queryFn: () => Product_GetOne(params.id),
            gcTime: 0,
            staleTime: 0,
        })

        return {
            products: defer(products),
        }
    },
    component,
})
