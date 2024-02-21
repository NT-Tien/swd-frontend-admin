import RefreshButton from '@/common/components/RefreshButton'
import { CategoryListRoute } from '@/routes/Categories/CategoryList'
import AddCategoryModal from '@/routes/Categories/CategoryList/modals/AddCategoryModal'
import { tabItems } from '@/routes/Categories/CategoryList/util/tabItems'
import { tabKeys } from '@/routes/Products/ProductList/util/tabItems'
import { Plus } from '@phosphor-icons/react'
import { Button, Flex, Tabs, Typography } from 'antd'
import { useState } from 'react'

export default function CategoryListPage() {
    const tab = CategoryListRoute.useSearch({
        select: data => data.tab,
    })
    const [currentTab, setCurrentTab] = useState<tabKeys>(tab)

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
                Category List
                <RefreshButton
                    queryKey={currentTab === 'all' ? ['categories'] : ['categories-deleted']}
                    isLoading={false}
                    style={{
                        marginLeft: '10px',
                    }}
                />
            </Typography.Title>
            <Tabs
                defaultActiveKey={tab}
                items={tabItems}
                onTabClick={key => {
                    setCurrentTab(key as tabKeys)
                }}
                tabBarExtraContent={
                    <Flex gap={5}>
                        <AddCategoryModal>
                            {({ handleOpen: handleOpenAddCategory }) => (
                                <Button type='primary' icon={<Plus />} onClick={handleOpenAddCategory}>
                                    Add Category
                                </Button>
                            )}
                        </AddCategoryModal>
                    </Flex>
                }
            />
        </Flex>
    )
}
