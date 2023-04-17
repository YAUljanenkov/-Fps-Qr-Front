import {Receipt} from "./Receipt";

export interface Order {
    id: string,
    amount: number,
    comment: string,
    extra: {
        apiClient: string,
        apiClientVersion: string
    },
    status: {
        value: string,
        date: string
    },
    expirationDate: string,
    qr: {
        id: string,
        additionalInfo: string,
        paymentDetails: string
    },
    receiptNumber?: string,
    receipt?: Receipt
    last_time_update?: string,
    mobile_number?: string
}
