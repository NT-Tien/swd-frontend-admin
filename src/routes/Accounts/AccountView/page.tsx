import Head from '@/common/components/Head'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import AccountOrders from '@/routes/Accounts/AccountView/components/AccountOrders'
import { Await } from '@tanstack/react-router'
import { Card, Descriptions, Tabs } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function AccountView() {
    const account = AccountViewRoute.useLoaderData({
        select: data => data.account,
    })

    return (
        <>
            <Head title={`Account`} />
            <Suspense fallback={<div>Loading...</div>}>
                <Await promise={account}>
                    {({ data: account }) => (
                        <>
                            <Head title={`${account.email}`} />
                            <Descriptions
                                title='Account Details'
                                column={3}
                                items={[
                                    {
                                        key: 'id',
                                        label: 'ID',
                                        children: account.id,
                                    },
                                    {
                                        key: 'Email',
                                        label: 'Email',
                                        children: account.email,
                                    },
                                    {
                                        key: 'Role',
                                        label: 'Role',
                                        children: account.role,
                                    },
                                    {
                                        key: 'createdAt',
                                        label: 'Created',
                                        children: dayjs(account.createdAt).format('DD-MM-YYYY'),
                                    },
                                    {
                                        key: 'updatedAt',
                                        label: 'Updated',
                                        children: dayjs(account.updatedAt).format('DD-MM-YYYY'),
                                    },
                                ]}
                            />
                        </>
                    )}
                </Await>
            </Suspense>
            <Tabs
                items={[
                    {
                        key: 'orders',
                        label: 'Orders',
                        children: (
                            <Suspense fallback={<div>Loading...</div>}>
                                <Await promise={account}>
                                    {({ data: account }) => (
                                        <Card>
                                            <AccountOrders accountId={account.id} />
                                        </Card>
                                    )}
                                </Await>
                            </Suspense>
                        ),
                    },
                ]}
            />
        </>
    )
}
