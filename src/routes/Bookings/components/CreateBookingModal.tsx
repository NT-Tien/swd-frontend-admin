import { BookingVisit_Create } from '@/api/booking-visit/Booking-Visit_Create'
import { useMessage } from '@/common/context/MessageContext/useMessage'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import { DatePicker, Form, Input, Modal } from 'antd'
import { ReactNode, useState } from 'react'

type FieldType = {
    email: string
    visit_date: Date
    phone_number: string
    customer_name: string
}

type CreateBookingModalProps = {
    children: ({ handleOpen }: { handleOpen: () => void }) => ReactNode
}

export default function CreateBookingModal({ children }: CreateBookingModalProps) {
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const { messageApi } = useMessage()

    const createBookingMutation = useMutation({
        mutationFn: BookingVisit_Create,
        onSuccess: () => {
            messageApi.success('Booking created successfully.')
            queryClient.invalidateQueries({
                queryKey: ['booking-visits'],
            })
            handleClose()
        },
        onError: () => {
            messageApi.error('Error while creating booking.')
        },
    })

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function handleOk() {
        form.submit()
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} onOk={handleOk} title='Create Booking'>
                <Form
                    form={form}
                    name='Create Booking'
                    layout='vertical'
                    onFinish={() =>
                        createBookingMutation.mutate({
                            ...form.getFieldsValue(),
                        })
                    }
                >
                    <Form.Item<FieldType>
                        name='customer_name'
                        label='Name'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter customer name',
                            },
                            {
                                min: 3,
                                message: 'Name should be at least 3 characters long',
                            },
                            {
                                max: 100,
                                message: 'Name should be at most 50 characters long',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='email'
                        label='Email'
                        rules={[
                            {
                                type: 'email',
                                message: 'Please enter a valid email',
                            },
                            {
                                max: 100,
                                message: 'Email should be at most 100 characters long',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        name='phone_number'
                        label='Phone number'
                        rules={[
                            {
                                required: true,
                                message: 'Please enter phone number',
                            },
                            {
                                pattern: /^[0-9]{10}$/,
                                message: 'Please enter a valid phone number (10 numbers)',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType> name='visit_date' label='Booking Date'>
                        <DatePicker />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}
