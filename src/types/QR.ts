import {Order} from "./Order";

export interface QR {
    qrId: string,
    qrStatus: string,
    qrExpirationDate: string,
    payload: string,
    qrUrl: string,
    subscriptionId: string,
    order?: Order
}