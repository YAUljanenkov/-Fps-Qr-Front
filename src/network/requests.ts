import axios from "./axios.config";
import {QR} from "../types/QR";
import { Order } from "../types/Order";
import {Receipt} from "../types/Receipt";

export const createQR = (account:  FormDataEntryValue, redirectUrl:  FormDataEntryValue, sbpMerchantId:  FormDataEntryValue) => {
    return axios.post('/qr/create', {
        qrType: 'QRVariable',
        account,
        redirectUrl,
        sbpMerchantId
    })
}

export const addQR = (qrId:  FormDataEntryValue) => axios.get(`/qr/add_to_db/${qrId}`);

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

export const getOrders = (offset= 0, limit: number | null = null, phone: string | null = null) => {
    let params: Record<string, any> = { offset }
    if (limit) {
        params.limit = limit;
    }
    if (phone) {
        params.phone_number = phone;
    }
    return axios.get<Order[]>('/order', { params })
}

export const getReceipt = (receiptId: string) => axios.get<Receipt>(`/fiscalization/status/${receiptId}`)

export const getQrOrder = (qrId: string) => axios.get<Order>(`/qr/order/${qrId}`);

export const getOrder = (orderId: string) => axios.get<Order>(`/order/${orderId}`);
export const cancelOrder = (orderId: string) => axios.delete(`/order/${orderId}`);

export const saveReceipt = (orderId: string, receipt: Receipt) => axios.post<Receipt>(`/fiscalization/save/${orderId}`, receipt);

