import RefreshButton from '@/common/components/RefreshButton'
import AllAccountsList from '@/routes/Accounts/AccountList/components/AllAccountsList'
import CreateAccountModal from '@/routes/Accounts/AccountList/modals/CreateAccountModal'
import { Plus } from '@phosphor-icons/react'
import { Button, Flex, Tabs, Typography } from 'antd'
import './style.css'
import AccountStats from '@/routes/Accounts/AccountList/components/AccountStats'

export default function AccountListPage() {
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
                Account List
                <RefreshButton
                    queryKey={['accounts']}
                    isLoading={false}
                    style={{
                        marginLeft: '10px',
                    }}
                />
            </Typography.Title>
            <Tabs
                type='line'
                items={[
                    {
                        key: '1',
                        label: 'Active',
                        children: <AllAccountsList />,
                    },
                    {
                        key: '2',
                        label: 'Stats',
                        children: <AccountStats />,
                    },
                ]}
                tabBarExtraContent={
                    <CreateAccountModal>
                        {({ handleOpen }) => (
                            <Button type='primary' icon={<Plus />} onClick={handleOpen}>
                                Add Account
                            </Button>
                        )}
                    </CreateAccountModal>
                }
            />
        </Flex>
    )
}
