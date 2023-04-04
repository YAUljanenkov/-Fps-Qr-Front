import {ReceiptItem} from "./ReceiptItem";

export interface Receipt {
    receiptNumber?: string,
    receiptType?: ReceiptType,
    status?: Status,
    items: ReceiptItem[],
    date?: string
    total: number
}

type ReceiptType = "SELL" | "REFUND"
type Status = "NEW" | "IN_PROGRESS" | "DONE" | "FAILED" | "AWAITING"