import Head from '@/common/components/Head'
import RefreshButton from '@/common/components/RefreshButton'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { VouchersRoute } from '@/routes/Vouchers'
import { VouchersBreadcrumb } from '@/routes/Vouchers/breadcrumb'
import CreateOrUpdateVoucherModal from '@/routes/Vouchers/modals/CreateOrUpdateVoucherModal'
import { tabItems, tabKeys } from '@/routes/Vouchers/util/tabItems'
import { Plus } from '@phosphor-icons/react'
import { useNavigate } from '@tanstack/react-router'
import { Breadcrumb, Button, Flex, Tabs, Typography } from 'antd'

export default function VouchersPage() {
    const tab = VouchersRoute.useSearch({
        select: data => data.tab,
    })
    const navigate = useNavigate()

    return (
        <>
            <Head title='Vouchers' />
            <Breadcrumb
                style={{
                    marginBottom: '5px',
                }}
                items={[DashboardBreadcrumb(), VouchersBreadcrumb({ isCurrent: true })]}
            />
            <Flex vertical>
                <Typography.Title
                    level={2}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    Vouchers List
                    <RefreshButton isLoading={false} queryKey={tab === 'all' ? ['vouchers'] : ['vouchers-disabled']} />
                </Typography.Title>
                <Tabs
                    defaultActiveKey={tab}
                    activeKey={tab}
                    items={tabItems}
                    onTabClick={tab => {
                        navigate({
                            to: VouchersRoute.to,
                            search: {
                                tab: tab as tabKeys,
                            },
                        })
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
