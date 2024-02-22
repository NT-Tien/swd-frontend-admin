import { queryCategory_GetOne } from '@/api/category/Category_GetOne'
import { CategoryViewRoute } from '@/routes/Categories/CategoryView'
import { useQuery } from '@tanstack/react-query'
import { Card, Descriptions } from 'antd'
import dayjs from 'dayjs'

export default function CategoryViewPage() {
    const id = CategoryViewRoute.useParams({ select: data => data.id })
    const { data: category, isLoading, isError, isSuccess } = useQuery(queryCategory_GetOne({ id }))

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error</div>
    }

    if (!isSuccess || !category) {
        return <div>Not found</div>
    }

    return (
        <div>
            <Card>
                <Descriptions
                    items={[
                        {
                            key: 'id',
                            label: 'ID',
                            children: category.id,
                        },
                        {
                            key: 'name',
                            label: 'Name',
                            children: category.name,
                        },
                        {
                            key: 'createdAt',
                            label: 'Created At',
                            children: dayjs(category.createdAt).format('DD-MM-YYYY'),
                        },
                        {
                            key: 'updatedAt',
                            label: 'Updated At',
                            children: dayjs(category.updatedAt).format('DD-MM-YYYY'),
                        },
                        {
                            key: 'isDeleted',
                            label: 'Deleted',
                            children: category.deletedAt ? dayjs(category.deletedAt).format('DD-MM-YYYY') : 'No',
                        },
                    ]}
                />
            </Card>
        </div>
    )
}
