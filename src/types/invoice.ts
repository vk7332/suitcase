export type InvoiceType = "RECEIPT" | "BILL_OF_SUPPLY" | "RCM_INVOICE";

export interface Client {
    id?: string;
    name: string;
    address: string;
    gstin?: string;
    isBusinessClient?: boolean;
    state?: string;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
}

export interface InvoiceData {
    id?: string;
    invoice_number: string;
    invoice_date: string;
    place_of_supply: string;
    client_id?: string;
    client: Client;
    items: InvoiceItem[];
    subtotal: number;
    gst_amount: number;
    total_amount: number;
    invoice_type: InvoiceType;
    notes?: string;
    created_at?: string;
}

export interface GSTSummary {
    totalInvoices: number;
    taxableAmount: number;
    gstCollected: number;
    totalRevenue: number;
}


