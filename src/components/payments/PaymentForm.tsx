import { useState } from "react";

export default function PaymentForm({ caseId, onSaved }: any) {
    const [form, setForm] = useState({
        amount: "",
        payment_date: "",
        payment_mode: "",
        remarks: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSaved({
            ...form,
            case_id: caseId,
            amount: Number(form.amount),
        });

        setForm({
            amount: "",
            payment_date: "",
            payment_mode: "",
            remarks: "",
        });
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="font-bold mb-2">Add Payment</h3>

            <input
                name="amount"
                placeholder="Amount"
                value={form.amount}
                onChange={handleChange}
            />

            <input
                type="date"
                name="payment_date"
                value={form.payment_date}
                onChange={handleChange}
            />

            <input
                name="payment_mode"
                placeholder="Cash / UPI / Bank"
                value={form.payment_mode}
                onChange={handleChange}
            />

            <input
                name="remarks"
                placeholder="Remarks"
                value={form.remarks}
                onChange={handleChange}
            />

            <button
                onClick={handleSubmit}
                className="bg-green-600 text-white p-2 mt-2"
            >
                Save Payment
            </button>
        </div>
    );
}


