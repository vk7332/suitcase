import React, { useEffect, useState } from "react";
import {
    getInvoices,
    deleteInvoice,
} from "../services/invoiceService";
import InvoiceForm from "../components/InvoiceForm";
import { generatePaymentLink } from "../services/razorpayService";
import { generateInvoicePDF } from "../utils/pdfGenerator";
import { sendInvoiceEmail } from "../services/emailService";
import { sendWhatsAppInvoice } from "../services/whatsappService";

const InvoiceDashboard = () => {
    const [invoices, setInvoices] = useState([]);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const data = await getInvoices();
        setInvoices(data || []);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            await deleteInvoice(id);
            fetchInvoices();
        }
    };

    const handleEdit = (invoice) => {
        setSelectedInvoice(invoice);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedInvoice(null);
        setShowForm(true);
    };

    const handleSuccess = () => {
        setShowForm(false);
        fetchInvoices();
    };

    const handleGeneratePaymentLink = async (invoice) => {
        const link = await generatePaymentLink(invoice);
        alert("Payment Link Generated:\n" + link);
        fetchInvoices();
    };

    const handleDownloadPDF = (invoice) => {
        generateInvoicePDF(invoice);
    };

    const handleSendEmail = async (invoice) => {
        await sendInvoiceEmail(invoice);
        alert("Email sent successfully!");
    };

    const handleSendWhatsApp = (invoice) => {
        sendWhatsAppInvoice(invoice);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>🧾 Invoice Management Dashboard</h2>

            <button onClick={handleAddNew} style={buttonStyle}>
                + Create Invoice
            </button>

            {showForm && (
                <InvoiceForm
                    existingInvoice={selectedInvoice}
                    onSuccess={handleSuccess}
                />
            )}

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th>Invoice No.</th>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Amount (₹)</th>
                        <th>Status</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td>{invoice.invoice_number}</td>
                                <td>{invoice.client_name}</td>
                                <td>{invoice.invoice_date}</td>
                                <td>₹{invoice.amount}</td>
                                <td>{invoice.status}</td>
                                <td>{invoice.payment_status}</td>
                                <td>
                                    <button onClick={() => handleEdit(invoice)}>Edit</button>
                                    <button onClick={() => handleDelete(invoice.id)}>
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleGeneratePaymentLink(invoice)}
                                    >
                                        Pay Link
                                    </button>
                                    <button
                                        onClick={() => handleDownloadPDF(invoice)}
                                    >
                                        PDF
                                    </button>
                                    <button onClick={() => handleSendEmail(invoice)}>
                                        Email
                                    </button>
                                    <button
                                        onClick={() => handleSendWhatsApp(invoice)}
                                    >
                                        WhatsApp
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>
                                No invoices found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

const buttonStyle = {
    marginBottom: "15px",
    padding: "10px 15px",
    backgroundColor: "#0B1F3A",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
};

export default InvoiceDashboard;