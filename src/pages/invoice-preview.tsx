import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function InvoicePreview() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState<any>(null);
    const invoiceRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            const res = await fetch(`/api/invoices/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();
            setInvoice(data);
        };

        if (id) fetchInvoice();
    }, [id]);

    // 🖨️ PRINT
    const handlePrint = () => {
        window.print();
    };

    // 📥 DOWNLOAD PDF (frontend)
    const handleDownload = () => {
        if (!invoiceRef.current) return;

        html2pdf()
            .set({
                margin: 10,
                filename: `${invoice.invoice_number}.pdf`,
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .from(invoiceRef.current)
            .save();
    };

    if (!invoice) return <p>Loading...</p>;

    const taxable = (invoice.amount / 1.18).toFixed(2);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            {/* ACTION BUTTONS */}
            <div className="mb-4 flex gap-2 print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-4 py-2"
                >
                    Print
                </button>

                <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2"
                >
                    Download PDF
                </button>
            </div>

            {/* INVOICE */}
            <div
                ref={invoiceRef}
                className="bg-white p-8 max-w-3xl mx-auto border text-sm"
            >

                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        {/* 🖼️ LOGO */}
                        {invoice.logo_url && (
                            <img
                                src={invoice.logo_url}
                                alt="logo"
                                className="h-12 mb-2"
                            />
                        )}

                        <h1 className="font-bold text-lg">
                            {invoice.chamber_name || "VK Tax & Law Chamber"}
                        </h1>

                        <p>GSTIN: {invoice.gstin || "02ABCDE1234F1Z5"}</p>
                        <p>{invoice.address || "Himachal Pradesh"}</p>
                    </div>

                    <div className="text-right">
                        <h2 className="text-xl font-bold">TAX INVOICE</h2>
                        <p>Invoice No: {invoice.invoice_number}</p>
                        <p>
                            Date:{" "}
                            {new Date(invoice.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                {/* CUSTOMER */}
                <div className="mb-6">
                    <p className="font-semibold">Bill To:</p>
                    <p>{invoice.customer_name || "Client"}</p>
                    <p>{invoice.customer_email}</p>
                </div>

                {/* TABLE */}
                <table className="w-full border mb-6">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="text-left p-2">Description</th>
                            <th className="text-right p-2">Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b">
                            <td className="p-2">Legal SaaS Subscription</td>
                            <td className="text-right p-2">
                                ₹{invoice.amount}
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* GST */}
                <div className="text-right space-y-1">
                    <p>Taxable Value: ₹{taxable}</p>
                    <p>CGST (9%): ₹{invoice.cgst}</p>
                    <p>SGST (9%): ₹{invoice.sgst}</p>

                    <p className="font-bold text-lg">
                        Total: ₹{invoice.amount}
                    </p>
                </div>

                {/* FOOTER */}
                <div className="mt-8 text-center text-gray-500 text-xs">
                    This is a computer-generated invoice.
                </div>
            </div>
        </div>
    );
}