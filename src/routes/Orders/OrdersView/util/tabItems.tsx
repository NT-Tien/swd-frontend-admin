import OrderDetails from '@/routes/Orders/OrdersView/components/OrderDetails'
import PaymentDetails from '@/routes/Orders/OrdersView/components/PaymentDetails'
import { TabsProps } from 'antd'

export type tabKeys = 'products' | 'payment'

type Tab = NonNullable<TabsProps['items']>[number]
export const tabItems: (Tab & { key: tabKeys })[] = [
    {
        key: 'products',
        label: 'Products',
        children: <OrderDetails />,
    },
    {
        key: 'payment',
        label: 'Payments',
        children: <PaymentDetails />,
    },
]
