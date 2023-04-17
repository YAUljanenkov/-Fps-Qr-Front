import {ReceiptItem} from "./ReceiptItem";

export interface Receipt {
    receiptNumber?: string,
    receiptType?: ReceiptType,
    status?: Status,
    items: ReceiptItem[],
    date?: string
    total: number,
    client?: {
        email: string,
        name: string
    },
    payments?: [
        {
            type: string,
            amount: number
        }
    ],
}

type ReceiptType = "SELL" | "REFUND"
type Status = "NEW" | "IN_PROGRESS" | "DONE" | "FAILED" | "AWAITING"