import Head from '@/common/components/Head'
import LoadingComponent from '@/common/components/LoadingComponent'
import { AccountListBreadcrumb } from '@/routes/Accounts/AccountList/breadcrumb'
import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { AccountViewBreadcrumb } from '@/routes/Accounts/AccountView/breadcrumb'
import AccountOrders from '@/routes/Accounts/AccountView/components/AccountOrders'
import { getRoleTag } from '@/routes/Accounts/common/util/getRoleTag'
import { DashboardBreadcrumb } from '@/routes/Dashboard/DashboardBreadcrumb'
import { Await } from '@tanstack/react-router'
import { Breadcrumb, Card, Descriptions, Tabs, Typography } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function AccountView() {
    const account = AccountViewRoute.useLoaderData({
        select: data => data.account,
    })

    return (
        <>
            <Head title={`Account`} />
            <Suspense fallback={<LoadingComponent />}>
                <Await promise={account}>
                    {({ data: account }) => (
                        <>
                            <Head title={`${account.email}`} />
                            <Breadcrumb
                                style={{
                                    marginBottom: '5px',
                                }}
                                items={[
                                    DashboardBreadcrumb(),
                                    AccountListBreadcrumb(),
                                    AccountViewBreadcrumb({ isCurrent: true, title: account.id }),
                                ]}
                            />
                            <Typography.Title level={3}>Account Details</Typography.Title>
                            <Card>
                                <Descriptions
                                    column={3}
                                    items={[
                                        {
                                            key: 'Email',
                                            label: 'Email',
                                            children: account.email,
                                        },
                                        {
                                            key: 'Role',
                                            label: 'Role',
                                            children: getRoleTag(account.role),
                                        },
                                        {
                                            key: 'createdAt',
                                            label: 'Created',
                                            children: dayjs(account.createdAt).format('DD-MM-YYYY HH:mm:ss'),
                                        },
                                        {
                                            key: 'updatedAt',
                                            label: 'Updated',
                                            children: dayjs(account.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
                                        },
                                    ]}
                                />
                            </Card>
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
                            <Suspense fallback={<Card loading />}>
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
