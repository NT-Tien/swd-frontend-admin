import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { VouchersRoute } from '@/routes/Vouchers'
import CreateOrUpdateVoucherModal from '@/routes/Vouchers/modals/CreateOrUpdateVoucherModal'
import { tabItems, tabKeys } from '@/routes/Vouchers/util/tabItems'
import { Plus } from '@phosphor-icons/react'
import { Button, Flex, Tabs, Typography } from 'antd'
import { useState } from 'react'

export default function VouchersPage() {
    const tab = VouchersRoute.useSearch({
        select: data => data.tab,
    })
    const [currentTab, setCurrentTab] = useState(tab)

    return (
        <>
            <Head title='Vouchers' />
            <Flex vertical gap={0}>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Vouchers List
                    <RefreshButton isLoading={false} queryKey={currentTab === 'all' ? ['vouchers'] : ['vouchers-disabled']} />
                </Typography.Title>
                <Tabs
                    defaultActiveKey={currentTab}
                    activeKey={currentTab}
                    items={tabItems}
                    onTabClick={tab => {
                        setCurrentTab(tab as tabKeys)
                    }}
                    tabBarExtraContent={
                        <CreateOrUpdateVoucherModal>
                            {({ handleOpen }) => (
                                <Button type='primary' icon={<Plus />} onClick={() => handleOpen()}>
                                    Add Voucher
                                </Button>
                            )}
                        </CreateOrUpdateVoucherModal>
                    }
                />
            </Flex>
        </>
    )
}
