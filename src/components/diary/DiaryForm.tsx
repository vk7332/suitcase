import { useState } from "react";

export default function DiaryForm({ caseId, onSaved }: any) {
    const [form, setForm] = useState({
        hearing_date: "",
        stage: "",
        notes: "",
        next_date: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSaved({
            ...form,
            case_id: caseId,
        });

        setForm({
            hearing_date: "",
            stage: "",
            notes: "",
            next_date: "",
        });
    };

    return (
        <div className="border p-4 mb-4">
            <h3 className="font-bold mb-2">Add Hearing</h3>

            <input
                type="date"
                name="hearing_date"
                value={form.hearing_date}
                onChange={handleChange}
            />

            <input
                name="stage"
                placeholder="Stage"
                value={form.stage}
                onChange={handleChange}
            />

            <input
                name="notes"
                placeholder="Notes"
                value={form.notes}
                onChange={handleChange}
            />

            <input
                type="date"
                name="next_date"
                value={form.next_date}
                onChange={handleChange}
            />

            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white p-2 mt-2"
            >
                Save Entry
            </button>
        </div>
    );
}
