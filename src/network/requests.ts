import axios from "./axios.config";
import {QR} from "../types/QR";
import { Order } from "../types/Order";

export const createQR = (account:  FormDataEntryValue, redirectUrl:  FormDataEntryValue, sbpMerchantId:  FormDataEntryValue) => {
    return axios.post('/qr/create', {
        qrType: 'QRVariable',
        account,
        redirectUrl,
        sbpMerchantId
    })
}

export const getQRs = (offset= 0, limit: number | null = null) => {
    let params: Record<string, number> = { offset }
    if (limit) {
        params.limit = limit;
    }
    return axios.get<QR[]>('/qr', { params })
}

export const getQR = (qrId: string) => axios.get<QR>(`/qr/${qrId}`);

export const createOrder = (amount: number, id: string) => {
    return axios.post('/order/create', {
        amount,
        qr: {
            id
        }
    })
}

export const getOrders = (offset= 0, limit: number | null = null) => {
    let params: Record<string, number> = { offset }
    if (limit) {
        params.limit = limit;
    }
    return axios.get<Order[]>('/order', { params })
}

export const getQrOrder = (qrId: string) => axios.get<Order>(`/qr/order/${qrId}`);

export const getOrder = (orderId: string) => axios.get<Order>(`/order/${orderId}`);


