import { useEffect, useState } from "react";

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<any[]>([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const res = await fetch("/api/invoices", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await res.json();
            setInvoices(data);
        };

        fetchInvoices();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Invoices
            </h1>

            {invoices.map((inv) => (
                <div
                    key={inv.id}
                    className="border p-3 mb-2 flex justify-between"
                >
                    <div>
                        <p>{inv.invoice_number}</p>
                        <p>₹{inv.amount}</p>
                    </div>

                    <a
                        href={inv.file_url}
                        target="_blank"
                        className="text-blue-600"
                    >
                        Download
                    </a>
                </div>
            ))}
        </div>
    );
}