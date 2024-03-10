import { BookingVisit } from '@/lib/types/BookingVisit'
import { Descriptions, Modal } from 'antd'
import dayjs from 'dayjs'
import { ReactNode, useState } from 'react'

export type ViewBookingModalProps = {
    children: ({ handleOpen }: { handleOpen: (booking: BookingVisit) => void }) => ReactNode
}

export default function ViewBookingModal({ children }: ViewBookingModalProps) {
    const [open, setOpen] = useState(false)
    const [booking, setBooking] = useState<BookingVisit | null>(null)

    function handleOpen(booking: BookingVisit) {
        setOpen(true)
        setBooking(booking)
    }

    function handleClose() {
        setOpen(false)
        setBooking(null)
    }

    return (
        <>
            {children({ handleOpen })}
            <Modal open={open} onCancel={handleClose} title='View Booking' footer={false}>
                {booking && (
                    <Descriptions
                        layout='vertical'
                        column={2}
                        items={[
                            {
                                label: 'Customer Name',
                                children: booking.customer_name,
                            },
                            {
                                label: 'Phone Number',
                                children: booking.phone_number,
                            },
                            {
                                children: booking.email,
                                label: 'Email',
                            },
                            {
                                children: dayjs(booking.visit_date).format('DD-MM-YYYY hh:mm A'),
                                label: 'Visit Date',
                            },
                        ]}
                    />
                )}
            </Modal>
        </>
    )
}
