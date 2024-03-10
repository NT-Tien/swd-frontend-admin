import { queryKeyStaff_OrderDesigns_GetAll } from '@/api/staff/Staff_OrderDesigns_GetAll'
import { Staff_OrderDesigns_UpdatePrice } from '@/api/staff/Staff_OrderDesigns_UpdatePrice'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type SetPriceModalProps = {
    children: ({ handleOpen }: { handleOpen: (orderId: string, currentPrice: number) => void }) => ReactNode
    afterUpdate?: (setPrice: number) => void
}

type FieldType = {
    price: number
}

export default function SetPriceModal({ children, afterUpdate }: SetPriceModalProps) {
    const [orderId, setOrderId] = useState('')
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm<FieldType>()
    const queryClient = useQueryClient()
    const { messageApi } = useMessage()

    const SetPriceMutation = useMutation({
        mutationFn: Staff_OrderDesigns_UpdatePrice,
        onSettled: () => {
            messageApi.destroy('update-order-price')
        },
        onSuccess: async () => {
            setTimeout(() => {
                messageApi.success('Successfully updated order price')
            }, 250)
            queryClient.invalidateQueries({
                queryKey: queryKeyStaff_OrderDesigns_GetAll(),
            })
            afterUpdate && afterUpdate(form.getFieldsValue().price)
            handleClose()
        },
        onError(error) {
            devLog('Error updating order price: ', error.message)
            setTimeout(() => {
                messageApi.error('Something went wrong. Please try again.')
            }, 250)
        },
    })

    function handleOpen(orderId: string, currentPrice: number) {
        setOrderId(orderId)
        form.setFieldsValue({ price: currentPrice })
        setOpen(true)
    }

    function handleClose() {
        setOrderId('')
        form.resetFields()
        setOpen(false)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal
                title='Update Order price'
                open={open}
                onCancel={handleClose}
                footer={[
                    <Button onClick={handleClose}>Cancel</Button>,
                    <Button color='primary' type='primary' onClick={() => form.submit()} loading={SetPriceMutation.isPending}>
                        Submit
                    </Button>,
                ]}
            >
                <Form<FieldType>
                    name='update-order-price-form'
                    form={form}
                    onFinish={values => {
                        SetPriceMutation.mutateAsync({ id: orderId, price: values.price })
                    }}
                >
                    <Form.Item<FieldType>
                        name='price'
                        label='Price'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter the price',
                            },
                            {
                                type: 'number',
                                message: 'Please enter a valid price',
                                validator: (_, value) => {
                                    if (isNaN(value)) {
                                        return Promise.reject('Please enter a valid price')
                                    }
                                    return Promise.resolve()
                                },
                            },
                            {
                                min: 0,
                                message: 'Price must be greater than 0',
                            },
                            {
                                max: 10000000000,
                                message: 'Price must be less than 10000000000',
                            },
                        ]}
                    >
                        <Input type='number' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
