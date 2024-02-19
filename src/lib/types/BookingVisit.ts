export type BookingVisit = {
    visit_date: Date
    phone_number: string
    customer_name: string
    email?: string
}

export function ResponseToBookingVisit(response: Record<string, any>): BookingVisit {
    return {
        visit_date: new Date(response.visit_date),
        phone_number: response.phone_number,
        customer_name: response.customer_name,
        email: response.email ?? undefined,
    } satisfies BookingVisit
}

export function ResponseToBookingVisitList(response: Record<string, any>[]): BookingVisit[] {
    return response.map(ResponseToBookingVisit)
}
