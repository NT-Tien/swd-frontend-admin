import { useMessage } from '@/common/context/MessageContext/useMessage'
import { DeliveryStatus } from '@/lib/types/Order'
import { OrdersViewRoute } from '@/routes/Orders/OrdersView'
import { updateOrderStatusFn } from '@/routes/Orders/OrdersView/util/UpdateOrderStatusFn'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Form, Modal, Select } from 'antd'
import { ReactNode, useState } from 'react'

type UpdateOrderStatusModalProps = {
    children: ({ handleOpen }: { handleOpen: (order: InputState) => void }) => ReactNode
}

type FieldType = {
    status: DeliveryStatus
}

type InputState = {
    orderId: string
    currentStatus: DeliveryStatus
}

export default function UpdateOrderStatusModal({ children }: UpdateOrderStatusModalProps) {
    const [order, setOrder] = useState<InputState | null>(null)
    const [form] = Form.useForm<FieldType>()
    const [open, setOpen] = useState(false)
    const { messageApi } = useMessage()
    const navigate = useNavigate()
    const refreshToken = OrdersViewRoute.useSearch({ select: data => data.refresh })

    const updateOrderStatusMutation = useMutation({
        mutationFn: updateOrderStatusFn,
        onSettled: () => {
            messageApi.destroy('update-order-status')
        },
        onSuccess: async () => {
            handleClose()
            setTimeout(() => {
                messageApi.success('Successfully updated order status')
            }, 250)
            await navigate({
                to: OrdersViewRoute.to,
                params: {
                    id: order!.orderId,
                },
                replace: true,
                search: {
                    refresh: !refreshToken,
                },
            })
        },
        onError(error) {
            devLog('Error updating order status: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
    })

    function handleOpen(order: InputState) {
        setOrder(order)
        setOpen(true)
    }

    function handleClose() {
        setOrder(null)
        form.resetFields()
        setOpen(false)
    }

    return (
        <>
            {children({ handleOpen })}
            <Form<FieldType>
                name='update-order-status-form'
                form={form}
                onFinish={async values => {
                    await updateOrderStatusMutation.mutateAsync({ id: order!.orderId, status: values.status })
                }}
            >
                <Modal
                    title='Update Order Status'
                    open={open}
                    onCancel={handleClose}
                    footer={[
                        <Button onClick={handleClose}>Cancel</Button>,
                        <Form.Item<FieldType> shouldUpdate={(prev, curr) => prev !== curr} noStyle>
                            {() => (
                                <Button
                                    form='add-category-form'
                                    htmlType='submit'
                                    color='primary'
                                    type='primary'
                                    onClick={() => form.submit()}
                                    loading={updateOrderStatusMutation.isPending}
                                    disabled={form.getFieldsValue().status === order?.currentStatus}
                                >
                                    Submit
                                </Button>
                            )}
                        </Form.Item>,
                    ]}
                >
                    <Form.Item<FieldType>
                        name='status'
                        label='Status'
                        rules={[
                            {
                                required: true,
                                message: 'Please select a status',
                            },
                        ]}
                        initialValue={order?.currentStatus}
                    >
                        <Select
                            options={Object.keys(DeliveryStatus)
                                .filter(stat => stat !== DeliveryStatus.PENDING)
                                .map(stat => ({
                                    label: <span className='capitalize'>{stat}</span>,
                                    value: stat,
                                }))}
                        />
                    </Form.Item>
                </Modal>
            </Form>
        </>
    )
}
