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
    }
}
