import {axios, axiosProtected} from "./axios.config";
import {QR} from "../types/QR";
import { Order } from "../types/Order";
import {Receipt} from "../types/Receipt";
import {Token} from "../types/Token";

export const createQR = (account:  FormDataEntryValue, redirectUrl:  FormDataEntryValue, sbpMerchantId:  FormDataEntryValue) => {
    return axiosProtected.post('/qr/create', {
        qrType: 'QRVariable',
        account,
        redirectUrl,
        sbpMerchantId
    })
}

export const addQR = (qrId:  FormDataEntryValue) => axiosProtected.get(`/qr/add_to_db/${qrId}`);

export const getQRs = (offset= 0, limit?: number) => {
    let params: Record<string, number> = { offset }
    if (typeof limit !== 'undefined') {
        params.limit = limit;
    }
    return axiosProtected.get<QR[]>('/qr', { params })
}

export const getQR = (qrId: string) => axiosProtected.get<QR>(`/qr/${qrId}`);

export const createOrder = (amount: number, id: string) => {
    return axiosProtected.post<Order>('/order/create', {
        amount,
        qr: {
            id
        }
    })
}

export const getOrders = (offset= 0, limit?: number, phone?: string) => {
    let params: Record<string, any> = { offset }
    if (typeof limit  !== 'undefined') {
        params.limit = limit;
    }
    if (typeof phone  !== 'undefined') {
        params.phone_number = phone;
    }
    return axiosProtected.get<Order[]>('/order', { params })
}

export const getReceipt = (receiptId: string) => axiosProtected.get<Receipt>(`/fiscalization/status/${receiptId}`)

export const getQrOrder = (qrId: string) => axiosProtected.get<Order>(`/qr/order/${qrId}`);

export const getOrder = (orderId: string) => axiosProtected.get<Order>(`/order/${orderId}`);
export const cancelOrder = (orderId: string) => axiosProtected.delete(`/order/${orderId}`);

export const saveReceipt = (orderId: string, receipt: Receipt) =>
    axiosProtected.post<Receipt>(`/fiscalization/save/${orderId}`, receipt);

export const register = (login: string, password: string, merchant_id: string, token: string, chat_id?: number) => {
    let params: Record<string, any> = { login, password, merchant_id, token }
    if(typeof chat_id !== 'undefined') {
        params.chat_id = chat_id
    }

    return axios.post<Token>('auth/registration', params);
}

export const addTg = (chat_id: number) => axiosProtected.post<Token>(`/auth/add_tg/${chat_id}`);

export const login = (login: string, password: string) => axios.post<Token>('auth/login', { login, password });

export const restorePassword = (bearer_token: string, new_password: string) => axios.post<Token>('auth/restore_password', { bearer_token, new_password });

