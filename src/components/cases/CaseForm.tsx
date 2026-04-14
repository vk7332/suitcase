import { useState, useEffect } from "react";

export default function CaseForm({ onSave, editData, clients }: any) {
    const [form, setForm] = useState({
        client_id: "",
        case_title: "",
        court_name: "",
        case_type: "",
        case_number: "",
        filing_date: "",
        next_date: "",
        status: "",
    });

    useEffect(() => {
        if (editData) setForm(editData);
    }, [editData]);

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="font-bold mb-2">Case Form</h3>

            <select name="client_id" onChange={handleChange}>
                <option value="">Select Client</option>
                {clients?.map((c: any) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            <input name="state_code" placeholder="State Code" />
            <input name="district_code" placeholder="District Code" />
            <input name="court_code" placeholder="Court Code" />
            <input name="case_number" placeholder="Case Number" />
            <input name="case_year" placeholder="Year" />
            <input name="case_title" placeholder="Case Title" onChange={handleChange} />
            <input name="court_name" placeholder="Court Name" onChange={handleChange} />
            <input name="case_type" placeholder="Case Type" onChange={handleChange} />
            <input name="case_number" placeholder="Case Number" onChange={handleChange} />
            <input name="filing_date" type="date" onChange={handleChange} />
            <input name="next_date" type="date" onChange={handleChange} />
            <input name="status" placeholder="Status" onChange={handleChange} />

            <button onClick={() => onSave(form)} className="bg-blue-500 text-white p-2 mt-2">
                Save Case
            </button>
        </div>
    );
}
