import { queryAccount_GetAll } from '@/api/account/Account_GetAll'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Account, Role } from '@/lib/types/Account'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { AccountListRoute } from '@/routes/Accounts/AccountList'
import DeleteAccountModal from '@/routes/Accounts/AccountList/modals/DeleteAccountModal'
import UpdatePasswordmodal from '@/routes/Accounts/AccountList/modals/UpdatePasswordModal'
import UpdateRoleModal from '@/routes/Accounts/AccountList/modals/UpdateRoleModal'
import { IdentificationCard, Password, ShieldStar, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { Dropdown, Table } from 'antd'
import { format } from 'date-fns'
import '../style.css'

const size = 5

export default function AllAccountsList() {
    const page = AccountListRoute.useSearch({
        select: data => data.page,
    })
    const { data: accounts, isLoading, isError } = useQuery(queryAccount_GetAll({ page, size }))
    const searchColumnProps = GetColumnSearchProps<Account>()
    const { messageApi } = useMessage()

    if (isError) {
        return <div>A fatal error has occurred.</div>
    }

    return (
        <DeleteAccountModal>
            {({ handleOpen: handleOpenDeleteAccount }) => (
                <UpdateRoleModal>
                    {({ handleOpen: handleOpenUpdateRole }) => (
                        <UpdatePasswordmodal>
                            {({ handleOpen: handleOpenUpdatePassword }) => (
                                <Table
                                    dataSource={accounts?.data ?? []}
                                    rowClassName={row => {
                                        if (row.email === AuthenticationHandler.getEmail()) {
                                            return 'my-row'
                                        }

                                        return ''
                                    }}
                                    columns={[
                                        {
                                            title: 'No.',
                                            render: (_, __, index) => {
                                                return index + 1 + (page - 1) * size
                                            },
                                        },
                                        {
                                            title: 'Email',
                                            dataIndex: 'email',
                                            key: 'email',
                                            sorter: (a, b) => a.email.localeCompare(b.email),
                                            sortDirections: ['ascend', 'descend'],
                                            ...searchColumnProps('email'),
                                        },
                                        {
                                            title: 'Created At',
                                            dataIndex: 'createdAt',
                                            key: 'createdAt',
                                            render: value => format(new Date(value), 'dd/MM/yyyy'),
                                            sorter: (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
                                            sortDirections: ['ascend', 'descend'],
                                            defaultSortOrder: 'descend',
                                        },
                                        {
                                            title: 'Updated At',
                                            dataIndex: 'updatedAt',
                                            key: 'updatedAt',
                                            render: value => format(new Date(value), 'dd/MM/yyyy'),
                                            sorter: (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime(),
                                            sortDirections: ['ascend', 'descend'],
                                        },
                                        {
                                            title: 'Role',
                                            dataIndex: 'role',
                                            key: 'role',
                                            render: value => (
                                                <span
                                                    style={{
                                                        textTransform: 'uppercase',
                                                    }}
                                                >
                                                    {value}
                                                </span>
                                            ),
                                            filters: Object.values(Role).map(role => ({
                                                text: (
                                                    <span
                                                        style={{
                                                            textTransform: 'capitalize',
                                                        }}
                                                    >
                                                        {role}
                                                    </span>
                                                ),
                                                value: role,
                                            })),
                                            onFilter: (value, record) => record.role === value,
                                        },
                                        {
                                            title: 'Action',
                                            dataIndex: 'action',
                                            key: 'action',
                                            render: (_, record) => (
                                                <Dropdown.Button
                                                    menu={{
                                                        items: [
                                                            {
                                                                label: 'Copy ID',
                                                                key: 'copy-id',
                                                                onClick: () => {
                                                                    navigator.clipboard.writeText(record.id)
                                                                    messageApi.success('ID copied to clipboard')
                                                                },
                                                                icon: <IdentificationCard />,
                                                            },
                                                            {
                                                                label: 'Change Role',
                                                                key: 'change-role-button',
                                                                icon: <ShieldStar />,
                                                                onClick: () => handleOpenUpdateRole(record),
                                                                disabled: record.email === AuthenticationHandler.getEmail(),
                                                            },
                                                            {
                                                                label: 'Change Password',
                                                                key: 'change-password-button',
                                                                icon: <Password />,
                                                                onClick: () => handleOpenUpdatePassword(record.id),
                                                            },
                                                            {
                                                                label: 'Delete',
                                                                key: 'delete-button',
                                                                icon: <Trash />,
                                                                danger: true,
                                                                onClick: () => handleOpenDeleteAccount(record.id),
                                                                disabled: record.email === AuthenticationHandler.getEmail(),
                                                            },
                                                        ],
                                                    }}
                                                    onClick={() => {
                                                        alert(`Viewing account ${record.id} with email: ${record.email}`)
                                                    }}
                                                >
                                                    View
                                                </Dropdown.Button>
                                            ),
                                        },
                                    ]}
                                    pagination={{
                                        pageSize: 8,
                                    }}
                                    loading={isLoading}
                                />
                            )}
                        </UpdatePasswordmodal>
                    )}
                </UpdateRoleModal>
            )}
        </DeleteAccountModal>
    )
}
