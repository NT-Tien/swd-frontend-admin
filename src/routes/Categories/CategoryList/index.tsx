import { Category_GetAll } from '@/api/category/Category_GetAll'
import { DashboardLayoutRoute } from '@/layouts/DashboardLayout'
import { ResponseToCategoryList } from '@/lib/types/Category'
import AddCategoryModal from '@/routes/Categories/CategoryList/components/AddCategoryModal'
import DeleteCategoryModal from '@/routes/Categories/CategoryList/components/DeleteCategoryModal'
import { Funnel, Plus, Trash } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { Button, Dropdown, Flex, Input, Table, Typography } from 'antd'
import format from 'date-fns/format'
import { Key, useState } from 'react'

const component = function CategoryListPage() {
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: Category_GetAll,
        select(data) {
            return ResponseToCategoryList(data)
        },
    })

    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])

    const onSelectChange = (newSelectedRowKeys: Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys)
    }

    return (
        <>
            <DeleteCategoryModal categories={categories ?? []}>
                {({ handleOpen }) => (
                    <Flex vertical gap={20}>
                        <Typography.Title level={2}>
                            Category List
                        </Typography.Title>
                        <Flex justify='space-between'>
                            <Flex gap={5}>
                                <Input.Search
                                    style={{
                                        maxWidth: '300px',
                                    }}
                                />
                                <Button>
                                    <Funnel size={16} weight='fill' />
                                </Button>
                                <div
                                    style={{
                                        width: '300px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: '10px',
                                    }}
                                >
                                    {selectedRowKeys.length !== 0 && (
                                        <>
                                            Selected {selectedRowKeys.length}{' '}
                                            Item
                                            {selectedRowKeys.length !== 1 &&
                                                's'}
                                        </>
                                    )}
                                </div>
                            </Flex>
                            <Flex gap={5}>
                                {selectedRowKeys.length !== 0 && (
                                    <Button
                                        danger
                                        type='primary'
                                        icon={<Trash />}
                                        onClick={() =>
                                            handleOpen(
                                                selectedRowKeys.map(s =>
                                                    s.toString(),
                                                ),
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    type='primary'
                                    icon={<Plus />}
                                    onClick={() => setIsCreateFormOpen(true)}
                                >
                                    Add Category
                                </Button>
                            </Flex>
                        </Flex>
                        <Table
                            dataSource={categories}
                            columns={[
                                {
                                    title: 'No.',
                                    render: (_, __, index) => index + 1,
                                },
                                {
                                    title: 'Name',
                                    dataIndex: 'name',
                                    key: 'name',
                                    sorter: (a, b) =>
                                        a.name.localeCompare(b.name),
                                    sortDirections: ['ascend', 'descend'],
                                },
                                {
                                    title: 'Created At',
                                    dataIndex: 'createdAt',
                                    key: 'createdAt',
                                    render: value =>
                                        format(new Date(value), 'dd/MM/yyyy'),
                                    sorter: (a, b) =>
                                        a.createdAt.getTime() -
                                        b.createdAt.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                },
                                {
                                    title: 'Updated At',
                                    dataIndex: 'updatedAt',
                                    key: 'updatedAt',
                                    render: value =>
                                        format(new Date(value), 'dd/MM/yyyy'),
                                    sorter: (a, b) =>
                                        a.updatedAt.getTime() -
                                        b.updatedAt.getTime(),
                                    sortDirections: ['ascend', 'descend'],
                                },
                                {
                                    title: 'Deleted',
                                    dataIndex: 'deletedAt',
                                    key: 'deletedAt',
                                    render: value => {
                                        if (value === null) return ''
                                        else
                                            return format(
                                                new Date(value),
                                                'dd/MM/yyyy',
                                            )
                                    },
                                    sorter: (a, b) => {
                                        if (a.deletedAt === null) return -1
                                        if (b.deletedAt === null) return 1
                                        return (
                                            a.deletedAt.getTime() -
                                            b.deletedAt.getTime()
                                        )
                                    },
                                    sortDirections: ['ascend', 'descend'],
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
                                                        label: 'Delete',
                                                        key: '1',
                                                        icon: <Trash />,
                                                        danger: true,
                                                        onClick: () => {
                                                            handleOpen(
                                                                selectedRowKeys.length ===
                                                                    0
                                                                    ? [
                                                                          record.id,
                                                                      ]
                                                                    : selectedRowKeys.map(
                                                                          s =>
                                                                              s.toString(),
                                                                      ),
                                                            )
                                                        },
                                                    },
                                                ],
                                            }}
                                            onClick={() => {
                                                alert(
                                                    `Viewing products of category ${record.id} with name: ${record.name}`,
                                                )
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
                            rowSelection={{
                                selectedRowKeys,
                                onChange: (selectedKeys: Key[]) =>
                                    onSelectChange(selectedKeys),
                            }}
                        />
                    </Flex>
                )}
            </DeleteCategoryModal>
            <AddCategoryModal
                open={isCreateFormOpen}
                setOpen={setIsCreateFormOpen}
                names={categories?.map(category => category.name) ?? []}
            />
        </>
    )
}

export const CategoryListRoute = createRoute({
    path: '/categories',
    getParentRoute: () => DashboardLayoutRoute,
    component,
})
