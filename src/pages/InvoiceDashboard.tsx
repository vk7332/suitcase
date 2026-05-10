import React, { useEffect, useState } from "react";
import {
    fetchInvoices,
} from "../services/InvoiceService";
import InvoiceForm from "../components/InvoiceForm";
import { initiateRazorpayPayment } from "../services/RazorpayService";
import { PdfService } from "../services/PdfService";
import { sendInvoiceEmail } from "../services/EmailService";
import { WhatsAppService } from "../services/WhatsAppService";
import { InvoiceData } from "../types/invoice";

const InvoiceDashboard = () => {
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        const data = await fetchInvoices();
        setInvoices(data || []);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            // await deleteInvoice(id);
            loadInvoices();
        }
    };

    const handleEdit = (invoice: InvoiceData) => {
        setSelectedInvoice(invoice);
        setShowForm(true);
    };

    const handleAddNew = () => {
        setSelectedInvoice(null);
        setShowForm(true);
    };

    const handleSuccess = () => {
        setShowForm(false);
        loadInvoices();
    };

    const handleGeneratePaymentLink = async (invoice: InvoiceData) => {
        // const link = await generatePaymentLink(invoice);
        // alert("Payment Link Generated:\n" + link);
        loadInvoices();
    };

    const handleDownloadPDF = (invoice: InvoiceData) => {
        // generateInvoicePDF(invoice);
    };

    const handleSendEmail = async (invoice: InvoiceData) => {
        await sendInvoiceEmail(invoice);
        alert("Email sent successfully!");
    };

    const handleSendWhatsApp = (invoice: InvoiceData) => {
        // WhatsAppService.sendWhatsAppInvoice(invoice);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🧾 Invoice Management Dashboard</h2>

            <button onClick={handleAddNew} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
                + Create Invoice
            </button>

            {showForm && (
                <InvoiceForm
                    existingInvoice={selectedInvoice as any}
                    onSuccess={handleSuccess}
                />
            )}

            <table className="w-full border shadow-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border text-left">Invoice No.</th>
                        <th className="p-2 border text-left">Client</th>
                        <th className="p-2 border text-left">Date</th>
                        <th className="p-2 border text-left">Amount (₹)</th>
                        <th className="p-2 border text-left">Status</th>
                        <th className="p-2 border text-left">Payment</th>
                        <th className="p-2 border text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="p-2 border">{invoice.invoice_number}</td>
                                <td className="p-2 border">{invoice.client?.name}</td>
                                <td className="p-2 border">{invoice.invoice_date}</td>
                                <td className="p-2 border">₹{invoice.total_amount}</td>
                                <td className="p-2 border">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                                        {invoice.invoice_type}
                                    </span>
                                </td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => handleGeneratePaymentLink(invoice)}
                                        className="text-blue-600 underline text-sm"
                                    >
                                        Payment Link
                                    </button>
                                </td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleDownloadPDF(invoice)}
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        📄
                                    </button>
                                    <button
                                        onClick={() => handleSendEmail(invoice)}
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        📧
                                    </button>
                                    <button
                                        onClick={() => handleEdit(invoice)}
                                        className="text-gray-600 hover:text-blue-600"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(invoice.id!)}
                                        className="text-gray-600 hover:text-red-600"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500">
                                No invoices found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceDashboard;
