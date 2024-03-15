import AuthenticationHandler from '@/lib/AuthenticationHandler'
import { Role, isAuthorized } from '@/lib/types/Account'
import GetColumnSearchProps from '@/lib/util/getColumnSearchProps'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { ProductViewRoute } from '@/routes/Products/ProductView'
import { useNavigate } from '@tanstack/react-router'
import { Dropdown, Table } from 'antd'

export default function OrderDetails() {
    const order = OrdersViewRoute.useLoaderData({ select: data => data.order })
    const navigate = useNavigate()
    const searchColumnProps = GetColumnSearchProps<(typeof order.products)[0]>()

    const isStaff = isAuthorized(Role.STAFF, AuthenticationHandler.getCurrentRole())

    return (
        <Table
            dataSource={order.products ?? []}
            bordered
            indentSize={0}
            columns={[
                {
                    title: 'No.',
                    render: (_, __, index) => index + 1,
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                    ...searchColumnProps('name'),
                },
                {
                    title: 'Ordered Quantity',
                    dataIndex: 'quantity',
                    key: 'quantity',
                    sorter: (a, b) => a.quantity - b.quantity,
                    sortDirections: ['ascend', 'descend'],
                },
                {
                    title: 'Price',
                    dataIndex: 'price',
                    key: 'price',
                    sorter: (a, b) => a.price - b.price,
                    sortDirections: ['ascend', 'descend'],
                },
                ...(isStaff
                    ? [
                          {
                              title: 'Action',
                              dataIndex: 'action',
                              key: 'action',
                              render: (_: any, record: any) => (
                                  <Dropdown.Button
                                      menu={{
                                          items: [],
                                      }}
                                      onClick={() => {
                                          navigate({
                                              to: ProductViewRoute.to,
                                              params: {
                                                  id: record.product_id,
                                              },
                                              search: {
                                                  editing: false,
                                              },
                                          })
                                      }}
                                  >
                                      View
                                  </Dropdown.Button>
                              ),
                          },
                      ]
                    : []),
            ]}
            pagination={false}
        />
    )
}
