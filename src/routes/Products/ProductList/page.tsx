import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { ProductCreateRoute } from '@/routes/Products/ProductCreate'
import { ProductListRoute } from '@/routes/Products/ProductList'
import { tabItems, tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Button, Flex, Tabs, Typography } from 'antd'

export default function ProductListPage() {
    const navigate = useNavigate()
    const tab = ProductListRoute.useSearch({
        select: data => data.tab!,
    })

    return (
        <>
            <Head title='Products' />
            <Flex vertical gap={0}>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Product List
                    <RefreshButton isLoading={false} queryKey={tab === 'all' ? ['products'] : ['products-deleted']} />
                </Typography.Title>
                <Tabs
                    defaultActiveKey={tab}
                    activeKey={tab}
                    items={tabItems}
                    onTabClick={tab => {
                        navigate({
                            to: ProductListRoute.to,
                            search: {
                                tab: tab as tabKeys,
                            },
                        })
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
                            Add Product
                        </Button>
                    }
                />
            </Flex>
        </>
    )
}
