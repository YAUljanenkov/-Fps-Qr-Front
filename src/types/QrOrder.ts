export interface QrOrder {
    qrId: string,
    qrStatus: string,
    qrExpirationDate: string,
    payload: string,
    qrUrl: string,
    subscriptionId: string,
    order: {
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
    } | null
}