import { Product_GetOne } from '@/api/product/Product_GetOne'
import { rootRoute } from '@/routeTree'
import { createRoute } from '@tanstack/react-router'

const component = function TestPage() {
    async function handleClick() {
        try {
            const data = await Product_GetOne({ id: '123' })
            console.log(data)
        } catch (err) {
            if (err instanceof Error) console.log('Error MESFDS: ' + err.message)
        }
    }

    return (
        <div>
            <button onClick={handleClick}>CLICK</button>
        </div>
    )
}

export const TestRoute = createRoute({
    path: '/test',
    getParentRoute: () => rootRoute,
    component,
})
