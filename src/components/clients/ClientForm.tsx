import { useState, useEffect } from "react";

export default function ClientForm({ onSave, editData }: any) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });

    useEffect(() => {
        if (editData) setForm(editData);
    }, [editData]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="font-bold mb-2">Client Form</h3>

            <input name="name" placeholder="Name" onChange={handleChange} value={form.name} />
            <input name="phone" placeholder="Phone" onChange={handleChange} value={form.phone} />
            <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
            <input name="address" placeholder="Address" onChange={handleChange} value={form.address} />
            <input name="notes" placeholder="Notes" onChange={handleChange} value={form.notes} />

            <button onClick={() => onSave(form)} className="bg-blue-500 text-white p-2 mt-2">
                Save Client
            </button>
        </div>
    );
}


