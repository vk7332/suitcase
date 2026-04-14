// =====================================================
// SUITCASE - PDF Invoice Generator
// =====================================================

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePDF = (invoice) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("SUITCASE", 14, 20);

    doc.setFontSize(11);
    doc.text("A Complete Office Suite for Advocates", 14, 28);
    doc.text("VK Tax & Law Chamber®", 14, 34);

    // Invoice Info
    doc.text(`Invoice No: ${invoice.invoice_number}`, 14, 50);
    doc.text(`Date: ${invoice.invoice_date}`, 14, 56);
    doc.text(`Client: ${invoice.client_name}`, 14, 62);

    // Table
    autoTable(doc, {
        startY: 70,
        head: [["Description", "Amount (₹)"]],
        body: [
            ["Taxable Amount", invoice.taxable_amount],
            [`GST (${invoice.gst_percentage}%)`, invoice.gst_amount],
            ["Total Amount", invoice.amount],
        ],
    });

    // Footer
    doc.text("Thank you for your business!", 14, doc.lastAutoTable.finalY + 20);

    // Save
    doc.save(`Invoice_${invoice.invoice_number}.pdf`);
};