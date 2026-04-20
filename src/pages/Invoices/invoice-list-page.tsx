import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link } from "react-router-dom";

const InvoiceListPage: React.FC = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        const { data, error } = await supabase
            .from("invoices")
            .select(
                `
        *,
        clients(name)
      `
            )
            .order("created_at", { ascending: false });

        if (!error) {
            setInvoices(data || []);
        }
        setLoading(false);
    };

    if (loading) return <p className="p-6">Loading invoices...</p>;

    return (
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
    );
};

export default InvoiceListPage;


