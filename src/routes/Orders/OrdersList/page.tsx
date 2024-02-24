import RefreshButton from '@/common/components/RefreshButton'
import { OrdersListRoute } from '@/routes/Orders/OrdersList'
import { tabItems, tabKeys } from '@/routes/Orders/OrdersList/util/tabItems'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Flex, Typography, Tabs, Button } from 'antd'
import { useState } from 'react'

export default function OrdersListPage() {
    const navigate = useNavigate()
    const tab = OrdersListRoute.useSearch({
        select: data => data.tab,
    })
    const [currentTab, setCurrentTab] = useState(tab)

    return (
        <Flex vertical gap={0}>
            <Typography.Title
                level={2}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                }}
            >
                Order List
                <RefreshButton isLoading={false} queryKey={currentTab === 'all' ? ['products'] : ['products-deleted']} />
            </Typography.Title>
            <Tabs
                defaultActiveKey={currentTab}
                activeKey={currentTab}
                items={tabItems}
                onTabClick={tab => {
                    setCurrentTab(tab as tabKeys)
                }}
                tabBarExtraContent={
                    <Button
                        type='primary'
                        icon={<Plus />}
                        onClick={() =>
                            navigate({
                                to: ProductCreateRoute.to,
                            })
                        }
                    >
                        Create Order
                    </Button>
                }
            />
        </Flex>
    )
}
