import { useEffect, useState } from "react";
import {
    fetchInvoices,
    fetchGSTSummary,
} from "../../services/invoice-service";
import { exportInvoicePDF } from "../../utils/invoice-pdf";
import { InvoiceData } from "../../types/invoice";

export default function InvoiceReportsPage() {
    const [invoices, setInvoices] = useState<InvoiceData[]>([]);
    const [summary, setSummary] = useState<any>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const invoiceData = await fetchInvoices();
        const gstSummary = await fetchGSTSummary();
        setInvoices(invoiceData);
        setSummary(gstSummary);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                📈 GST & Invoice Reports
            </h1>

            {summary && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-white shadow rounded">
                        <p>Total Invoices</p>
                        <h2 className="text-xl font-bold">
                            {summary.totalInvoices}
                        </h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <p>Taxable Amount</p>
                        <h2 className="text-xl font-bold">
                            ₹{summary.taxableAmount.toFixed(2)}
                        </h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <p>GST Collected</p>
                        <h2 className="text-xl font-bold">
                            ₹{summary.gstCollected.toFixed(2)}
                        </h2>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <p>Total Revenue</p>
                        <h2 className="text-xl font-bold">
                            ₹{summary.totalRevenue.toFixed(2)}
                        </h2>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full border bg-white shadow">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Invoice No</th>
                            <th className="p-2 border">Client</th>
                            <th className="p-2 border">Amount</th>
                            <th className="p-2 border">GST</th>
                            <th className="p-2 border">Total</th>
                            <th className="p-2 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td className="p-2 border">{inv.invoice_number}</td>
                                <td className="p-2 border">{inv.client?.name}</td>
                                <td className="p-2 border">₹{inv.subtotal}</td>
                                <td className="p-2 border">₹{inv.gst_amount}</td>
                                <td className="p-2 border">₹{inv.total_amount}</td>
                                <td className="p-2 border">
                                    <button
                                        onClick={() => exportInvoicePDF(inv)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded"
                                    >
                                        Download PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


