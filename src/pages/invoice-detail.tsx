import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function InvoiceDetail() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            const [invRes, userRes] = await Promise.all([
                fetch(`/api/invoices/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch("/api/me", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            const inv = await invRes.json();
            const u = await userRes.json();

            setInvoice(inv);
            setUser(u);
        };

        fetchData();
    }, [id]);

    // ❌ cancel request
    const handleCancel = async () => {
        await fetch("/api/invoice/cancel", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                invoiceId: id,
                reason: "Client requested cancellation",
            }),
        });

        alert("Cancellation request submitted");
    };

    // 🧾 credit note request
    const handleCreditNote = async () => {
        await fetch("/api/credit-note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                invoiceId: id,
                amount: invoice.amount,
                reason: "Adjustment",
            }),
        });

        alert("Credit note request submitted");
    };

    if (!invoice || !user) return <p>Loading...</p>;

    const isAdmin = user.role === "admin";

    return (
        <div className="p-6">
            <h1 className="text-lg font-bold mb-4">
                Invoice Detail
            </h1>

            <p>Status: {invoice.status}</p>

            {/* 🔐 ROLE-BASED ACTIONS */}
            <div className="mt-4 flex gap-2">

                <button
                    onClick={handleCancel}
                    className="bg-red-600 text-white px-3 py-1"
                >
                    {isAdmin ? "Cancel Invoice" : "Request Cancellation"}
                </button>

                <button
                    onClick={handleCreditNote}
                    className="bg-yellow-600 text-white px-3 py-1"
                >
                    {isAdmin ? "Create Credit Note" : "Request Credit Note"}
                </button>

            </div>
        </div>
    );
}