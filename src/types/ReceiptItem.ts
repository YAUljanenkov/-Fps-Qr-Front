export interface ReceiptItem {
    name: string,
    price: string,
    quantity: string,
    amount: number,
    paymentObject?: PaymentObject,
    paymentMode?: PaymentNode,
    measurementUnit?: string,
    nomenclatureCode?: string
    vatType: VatType,
    agentType?: AgentType,
    supplierInfo?: {
        phone?: string,
        name?: string,
        inn: number
    }
}

type PaymentObject = "COMMODITY" | "EXCISE" | "JOB" | "SERVICE" | "PAYMENT" | "ANOTHER";
type PaymentNode = "FULL_PREPAYMENT" | "FULL_PAYMENT" | "ADVANCE" | "PREPAYMENT";
type VatType = "NONE" | "VAT0" | "VAT10" | "VAT110" | "VAT20" | "VAT120";
type AgentType = "BANK_PAYING_AGENT" | "BANK_PAYING_SUBAGENT" | "PAYING_AGENT" | "PAYING_SUBAGENT" | "ATTORNEY" |
    "COMMISSION_AGENT" | "ANOTHER";
