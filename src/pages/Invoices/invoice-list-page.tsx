import React, { useEffect, useState } from "react";
import { fetchInvoices } from "../../services/InvoiceService";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const InvoiceListPage: React.FC = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        setLoading(true);
        const data = await fetchInvoices();
        setInvoices(data);
        setLoading(false);
    };

    if (loading) return <DashboardLayout><p className="p-6">Loading invoices...</p></DashboardLayout>;

    return (
        <DashboardLayout>
            <div className="p-6 bg-white shadow rounded-lg">
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Invoices</h1>
                    <Link
                        to="/invoices/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Create Invoice
                    </Link>
                </div>

                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Invoice No.</th>
                            <th className="p-2 border">Client</th>
                            <th className="p-2 border">Date</th>
                            <th className="p-2 border">Type</th>
                            <th className="p-2 border">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.id}>
                                <td className="p-2 border">{inv.invoice_number}</td>
                                <td className="p-2 border">{inv.clients?.name}</td>
                                <td className="p-2 border">{inv.invoice_date}</td>
                                <td className="p-2 border">{inv.invoice_type}</td>
                                <td className="p-2 border">₹{inv.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default InvoiceListPage;


