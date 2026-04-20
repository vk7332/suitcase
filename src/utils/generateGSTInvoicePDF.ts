import jsPDF from "jspdf";
import { generateQRCode } from "./generateQRCode";
import { determineInvoiceType, getGSTNote } from "./invoiceUtils";
import { InvoiceData } from "../types/invoice";

interface InvoiceItem {
    description: string;
    quantity: number;
    rate: number;
}

interface InvoiceData {
    invoiceNumber: string;
    invoiceDate: string;
    placeOfSupply: string;
    clientName: string;
    clientAddress: string;
    clientGSTIN?: string;
    items: InvoiceItem[];
    gstRate: number;
}

interface AdvocateBranding {
    name: string;
    chamberName?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    gstin?: string;
    logoUrl?: string;
    signatureUrl?: string;
}

const invoiceType = determineInvoiceType(invoice.client);
const gstNote = getGSTNote(invoiceType);

let documentTitle = "";

switch (invoiceType) {
    case "RECEIPT":
        documentTitle = "FEE RECEIPT";
        break;
    case "BILL_OF_SUPPLY":
        documentTitle = "BILL OF SUPPLY";
        break;
    case "RCM_INVOICE":
        documentTitle = "TAX INVOICE (RCM)";
        break;
}

const loadImageAsBase64 = async (url?: string): Promise<string | null> => {
    if (!url) return null;
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    });
};

export const generateGSTInvoicePDF = async (
    branding: AdvocateBranding,
    invoice: InvoiceData
) => {
    const doc = new jsPDF();
    let y = 20;

    const logo = await loadImageAsBase64(branding.logoUrl);
    const signature = await loadImageAsBase64(branding.signatureUrl);
    const qrCode = await generateQRCode(
        branding.website || "https://tools.vktax.in"
    );

    const pageWidth = doc.internal.pageSize.getWidth();


    // 🔷 Header
    if (logo) {
        doc.addImage(logo, "PNG", 15, 10, 30, 30);
    }

    doc.setFont("Helvetica", "Bold");
    doc.setFontSize(14);
    doc.text(documentTitle, 105, 22, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "Normal");
    doc.text("GST TAX INVOICE", 105, 22, { align: "center" });

    y = 40;

    // 🔷 Advocate Details
    doc.setFontSize(10);
    doc.text(`Name: ${branding.name}`, 15, y);
    y += 5;

    if (branding.address) {
        doc.text(`Address: ${branding.address}`, 15, y);
        y += 5;
    }

    if (branding.phone) {
        doc.text(`Phone: ${branding.phone}`, 15, y);
        y += 5;
    }

    if (branding.email) {
        doc.text(`Email: ${branding.email}`, 15, y);
        y += 5;
    }

    if (branding.gstin) {
        doc.text(`GSTIN: ${branding.gstin}`, 15, y);
        y += 5;
    }

    // 🔷 Invoice Details
    y = 40;
    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 140, y);
    y += 5;
    doc.text(`Date: ${invoice.invoiceDate}`, 140, y);
    y += 5;
    doc.text(`Place of Supply: ${invoice.placeOfSupply}`, 140, y);

    // 🔷 Client Details
    y += 15;
    doc.setFont("Helvetica", "Bold");
    doc.text("Bill To:", 15, y);
    doc.setFont("Helvetica", "Normal");
    y += 5;
    doc.text(invoice.clientName, 15, y);
    y += 5;
    doc.text(invoice.clientAddress, 15, y);

    if (invoice.clientGSTIN) {
        y += 5;
        doc.text(`GSTIN: ${invoice.clientGSTIN}`, 15, y);
    }

    // 🔷 Table Header
    y += 10;
    doc.setFont("Helvetica", "Bold");
    doc.text("S.No", 15, y);
    doc.text("Description", 30, y);
    doc.text("Qty", 120, y);
    doc.text("Rate", 140, y);
    doc.text("Amount", 165, y, { align: "right" });

    doc.line(15, y + 2, 195, y + 2);

    // 🔷 Table Content
    let subtotal = 0;
    doc.setFont("Helvetica", "Normal");

    invoice.items.forEach((item, index) => {
        y += 8;
        const amount = item.quantity * item.rate;
        subtotal += amount;

        doc.text(String(index + 1), 15, y);
        doc.text(item.description, 30, y);
        doc.text(String(item.quantity), 120, y);
        doc.text(item.rate.toFixed(2), 140, y);
        doc.text(amount.toFixed(2), 195, y, { align: "right" });
    });

    // 🔷 GST Calculation
    let gstAmount = 0;
    let total = subtotal;

    if (invoiceType === "RCM_INVOICE") {
        // No GST charged by advocate; liability on recipient
        gstAmount = 0;
    } else if (invoiceType === "BILL_OF_SUPPLY") {
        // Exempt service; no GST
        gstAmount = 0;
    } else {
        // Regular invoice; calculate GST
        gstAmount = (subtotal * invoice.gstRate) / 100;
        total += gstAmount;
    }


    // GST Disclaimer Footer
    doc.setFont("Helvetica", "Normal");
    doc.setFontSize(8);

    doc.text(gstNote, 105, 285, {
        align: "center",
        maxWidth: 180,
    });

    invoice.clientGSTIN
        ? "Note: GST is payable by the recipient under Reverse Charge Mechanism (RCM) as per Notification No. 13/2017 – Central Tax (Rate) dated 28.06.2017."
        : "Note: Legal services provided by an advocate are exempt from GST under Notification No. 12/2017 – Central Tax (Rate) dated 28.06.2017.";

    doc.text(gstNote, 105, 285, {
        align: "center",
        maxWidth: 180,
    });

    y += 10;
    doc.line(110, y, 195, y);
    y += 5;

    doc.text(`Subtotal: ₹${subtotal.toFixed(2)}`, 195, y, { align: "right" });
    y += 5;

    doc.text(
        `CGST (${invoice.gstRate / 2}%): ₹${cgst.toFixed(2)}`,
        195,
        y,
        { align: "right" }
    );
    y += 5;

    doc.text(
        `SGST (${invoice.gstRate / 2}%): ₹${sgst.toFixed(2)}`,
        195,
        y,
        { align: "right" }
    );
    y += 5;

    doc.setFont("Helvetica", "Bold");
    doc.text(`Total: ₹${total.toFixed(2)}`, 195, y, {
        align: "right",
    });

    // 🔷 QR Code
    if (qrCode) {
        doc.addImage(qrCode, "PNG", 15, y + 10, 30, 30);
        doc.setFontSize(8);
        doc.text("Scan to Verify", 15, y + 45);
    }

    // 🔷 Signature
    if (signature) {
        doc.addImage(signature, "PNG", 140, y + 15, 40, 20);
    }

    doc.setFontSize(10);
    doc.text("Authorized Signatory", 140, y + 40);

    // 🔷 Footer
    doc.setFontSize(8);
    doc.text(
        "This is a computer-generated GST invoice.",
        pageWidth / 2,
        285,
        { align: "center" }
    );

    doc.save(`GST_Invoice_${invoice.invoiceNumber}.pdf`);
};
z


