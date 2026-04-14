import React, { useEffect, useState } from "react";
import { getInvoices } from "../services/invoiceService";
import GeneratePaymentLinkButton from "../../payments/components/GeneratePaymentLinkButton";
import SendEmailButton from "../../communications/components/SendEmailButton";
import SendWhatsAppButton from "../../communications/components/SendWhatsAppButton";

const InvoiceDashboard = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const data = await getInvoices();
        setInvoices(data);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
                Invoice Management Dashboard
            </h2>

            <table className="w-full border shadow-md rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Invoice No.</th>
                        <th className="p-2 border">Client</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">Amount</th>
                        <th className="p-2 border">Status</th>
                        <th className="p-2 border">Payment</th>
                        <th className="p-2 border">Actions</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">WhatsApp</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="text-center">
                            <td className="p-2 border">
                                {invoice.invoice_number}
                            </td>
                            <td className="p-2 border">
                                {invoice.clients?.name}
                            </td>
                            <td className="p-2 border">
                                {invoice.issue_date}
                            </td>
                            <td className="p-2 border">
                                ₹{invoice.total_amount}
                            </td>
                            <td className="p-2 border">
                                {invoice.status}
                            </td>
                            <td className="p-2 border">
                                <SendEmailButton invoice={invoice} />
                            </td>
                            <td className="p-2 border">
                                <SendWhatsAppButton invoice={invoice} />
                            </td>
                            <td className="p-2 border">
                                {invoice.razorpay_payment_link ? (
                                    <a
                                        href={invoice.razorpay_payment_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Pay Now
                                    </a>
                                ) : (
                                    <GeneratePaymentLinkButton
                                        invoice={invoice}
                                        onSuccess={fetchInvoices}
                                    />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceDashboard;
