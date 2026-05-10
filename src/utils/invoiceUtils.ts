import { Client, InvoiceType, InvoiceItem } from "../types/invoice";

export const determineInvoiceType = (client: Client): InvoiceType => {
    // Business entity with GSTIN → RCM Invoice
    if (client.isBusinessClient && client.gstin) {
        return "RCM_INVOICE";
    }

    // Individual client → Receipt
    if (!client.isBusinessClient) {
        return "RECEIPT";
    }

    // Default case → Bill of Supply
    return "BILL_OF_SUPPLY";
};

export const calculateTotals = (
    items: InvoiceItem[],
    invoiceType: InvoiceType,
    gstRate: number = 18
) => {
    const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.rate,
        0
    );

    // Advocates do not charge GST directly
    const gstAmount = 0;
    // total is redundant, returning subtotal directly
    return {
        subtotal,
        gstAmount,
        total: subtotal,
        gstRate,
    };
};

export const getGSTNote = (_invoiceType: InvoiceType): string => {
    switch (_invoiceType) {
        case "RECEIPT":
            return "Note: Legal services provided by an advocate are exempt from GST under Notification No. 12/2017 – Central Tax (Rate) dated 28.06.2017.";

        case "BILL_OF_SUPPLY":
            return "Bill of Supply issued for exempted legal services under Notification No. 12/2017 – Central Tax (Rate) dated 28.06.2017.";

        case "RCM_INVOICE":
            return "Note: GST is payable by the recipient under Reverse Charge Mechanism (RCM) as per Notification No. 13/2017 – Central Tax (Rate) dated 28.06.2017.";

        default:
            return "";
    }
};


