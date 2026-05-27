import jsPDF from "jspdf";
import { generateQRCode } from "./generate-qr-code";
import { determineInvoiceType, getGSTNote } from "./invoice-utils";
import { InvoiceData } from "../types/invoice";

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

const loadImageAsBase64 = async (url?: string): Promise<string | null> => {
    if (!url) return null;
    try {
        const response = await fetch(url);
        const blob = await response.blob();

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error("Failed to load image", e);
        return null;
    }
};

export const generateGSTInvoicePDF = async (
    branding: AdvocateBranding,
    invoice: InvoiceData
) => {
    const invoiceType = determineInvoiceType(invoice as any);
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
        default:
            documentTitle = "TAX INVOICE";
    }

    const doc = new jsPDF();
    let y = 20;

    const logo = await loadImageAsBase64(branding.logoUrl);
    const signature = await loadImageAsBase64(branding.signatureUrl);
    const qrCode = await generateQRCode(
        branding.website || "https://tools.vktax.in"
    );

    // 🔷 Header
    if (logo) {
        doc.addImage(logo, "PNG", 15, 10, 30, 30);
    }

    doc.setFont("Helvetica", "Bold");
    doc.setFontSize(14);
    doc.text(documentTitle, 105, 22, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Helvetica", "Normal");
    doc.text("GST TAX INVOICE", 105, 28, { align: "center" });

    y = 45;

    // 🔷 Advocate Details
    doc.setFontSize(10);
    doc.setFont("Helvetica", "Bold");
    doc.text(branding.chamberName || branding.name, 15, y);
    y += 5;
    doc.setFont("Helvetica", "Normal");
    if (branding.address) {
        doc.text(branding.address, 15, y);
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
    y = 45;
    doc.text(`Invoice No: ${invoice.invoice_number}`, 140, y);
    y += 5;
    doc.text(`Date: ${invoice.invoice_date}`, 140, y);
    y += 5;
    doc.text(`Place of Supply: ${invoice.place_of_supply}`, 140, y);

    // 🔷 Client Details
    y += 15;
    doc.setFont("Helvetica", "Bold");
    doc.text("Bill To:", 15, y);
    doc.setFont("Helvetica", "Normal");
    y += 5;
    doc.text(invoice.client.name, 15, y);
    y += 5;
    doc.text(invoice.client.address, 15, y);

    if (invoice.client.gstin) {
        y += 5;
        doc.text(`GSTIN: ${invoice.client.gstin}`, 15, y);
    }

    // 🔷 Table Header
    y += 15;
    doc.setFont("Helvetica", "Bold");
    doc.text("S.No", 15, y);
    doc.text("Description", 30, y);
    doc.text("Qty", 120, y);
    doc.text("Rate", 140, y);
    doc.text("Amount", 195, y, { align: "right" });

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

    doc.line(15, y + 2, 195, y + 2);

    // 🔷 Totals
    y += 10;
    doc.text("Subtotal:", 140, y);
    doc.text(subtotal.toFixed(2), 195, y, { align: "right" });

    y += 8;
    doc.text(`GST (${invoice.gst_amount}%):`, 140, y);
    doc.text(invoice.gst_amount.toFixed(2), 195, y, { align: "right" });

    y += 8;
    doc.setFont("Helvetica", "Bold");
    doc.text("Total:", 140, y);
    doc.text(invoice.total_amount.toFixed(2), 195, y, { align: "right" });

    // 🔷 Footer
    y += 20;
    doc.setFont("Helvetica", "Italic");
    doc.setFontSize(8);
    doc.text(gstNote, 15, y);

    if (qrCode) {
        doc.addImage(qrCode, "PNG", 15, y + 10, 30, 30);
    }

    if (signature) {
        doc.addImage(signature, "PNG", 150, y + 10, 40, 20);
        doc.setFont("Helvetica", "Normal");
        doc.text("Authorized Signatory", 170, y + 35, { align: "center" });
    }

    doc.save(`Invoice_${invoice.invoice_number}.pdf`);
};
