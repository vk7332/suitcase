// src/pages/payments.tsx

import { useEffect, useState } from "react";

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch("/api/payments", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((r) => r.json())
            .then(setPayments);
    }, []);

    return (
        <div className="p-6">
            <h1>Payment History</h1>

            {payments.map((p: any) => (
                <div key={p.id} className="border p-2">
                    ₹{p.amount} - {p.status}
                </div>
            ))}
        </div>
    );
}
