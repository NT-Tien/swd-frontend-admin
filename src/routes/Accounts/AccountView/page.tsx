import { AccountViewRoute } from '@/routes/Accounts/AccountView'
import { Await } from '@tanstack/react-router'
import { Card, Descriptions, Row } from 'antd'
import dayjs from 'dayjs'
import { Suspense } from 'react'

export default function AccountView() {
    const account = AccountViewRoute.useLoaderData({
        select: data => data.account,
    })

    return (
        <div>
            <Row gutter={10}>
                <Card>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await promise={account}>
                            {({ data: account }) => (
                                <Descriptions
                                    title='Account Details'
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
                            )}
                        </Await>
                    </Suspense>
                </Card>
            </Row>
        </div>
    )
}
