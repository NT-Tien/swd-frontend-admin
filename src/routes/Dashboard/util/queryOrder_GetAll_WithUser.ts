import { queryAccount_GetById } from '@/api/account/Account_GetById'
import { Order_GetAll } from '@/api/order/Order_GetAll'
import { DeliveryStatus } from '@/lib/types/Order'
import { queryClient } from '@/main'
import { queryOptions } from '@tanstack/react-query'

type queryOrder_RecentWithUserProps = {
    limit: number
}

const gcTime = 1000 * 60
const staleTime = 1000 * 60

export const Order_RecentWithUser_DB = async ({ limit }: queryOrder_RecentWithUserProps) => {
    try {
        const orders = await queryClient.ensureQueryData({
            queryKey: ['orders'],
            queryFn: () => Order_GetAll(),
            gcTime,
            staleTime,
        })
        const recentOrders = orders.data.slice(0, limit)
        const recentOrdersWithUser = await Promise.all(
            recentOrders.map(async order => {
                return {
                    ...order,
                    user_id: await queryClient.ensureQueryData(queryAccount_GetById({ id: order.user_id })),
                }
            }),
        )

        return {
            isActive: orders.data.filter(
                order => order.status_delivery === DeliveryStatus.PENDING || order.status_delivery === DeliveryStatus.SHIPPING,
            ).length,
            total: orders.data.length,
            recent: recentOrdersWithUser,
        }
    } catch (error) {
        devLog(error)
        console.error(error)
        return {
            total: 0,
            isActive: 0,
            recent: [],
        }
    }
}

export const queryOrder_RecentWithUser_DB = (props: queryOrder_RecentWithUserProps) =>
    queryOptions({
        queryFn: () => Order_RecentWithUser_DB({ limit: props.limit }),
        queryKey: ['order', 'recent', props.limit],
    })
