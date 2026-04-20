import { useEffect, useState } from "react";
import {
    getTimeline,
    addTimeline,
    deleteTimeline,
} from "../../services/CaseTimelineService";

export default function CaseTimeline({ caseId }: any) {
    const [timeline, setTimeline] = useState<any[]>([]);
    const [form, setForm] = useState({
        hearing_date: "",
        notes: "",
        next_date: "",
        stage: "",
    });

    useEffect(() => {
        loadTimeline();
    }, []);

    const loadTimeline = async () => {
        const data = await getTimeline(caseId);
        setTimeline(data || []);
    };

    const handleAdd = async () => {
        if (!form.hearing_date) return alert("Enter hearing date");

        await addTimeline({
            ...form,
            case_id: caseId,
        });

        setForm({
            hearing_date: "",
            notes: "",
            next_date: "",
            stage: "",
        });

        loadTimeline();
    };

    const handleDelete = async (id: string) => {
        await deleteTimeline(id);
        loadTimeline();
    };

    return (
        <div className="border p-4 mt-6">

            <h3 className="font-bold mb-3">
                📖 Case Diary / Timeline
            </h3>

            {/* ➕ ADD ENTRY */}
            <div className="space-y-2 mb-4">

                <input
                    type="date"
                    className="border p-2 w-full"
                    value={form.hearing_date}
                    onChange={(e) =>
                        setForm({ ...form, hearing_date: e.target.value })
                    }
                />

                <input
                    placeholder="Stage (Evidence / Arguments)"
                    className="border p-2 w-full"
                    value={form.stage}
                    onChange={(e) =>
                        setForm({ ...form, stage: e.target.value })
                    }
                />

                <textarea
                    placeholder="Hearing Notes"
                    className="border p-2 w-full"
                    value={form.notes}
                    onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                    }
                />

                <input
                    type="date"
                    className="border p-2 w-full"
                    value={form.next_date}
                    onChange={(e) =>
                        setForm({ ...form, next_date: e.target.value })
                    }
                />

                <button
                    onClick={handleAdd}
                    className="bg-green-600 text-white p-2 w-full"
                >
                    Add Hearing Entry
                </button>
            </div>

            {/* 📋 TIMELINE LIST */}
            <div className="space-y-3">

                {timeline.map((t) => (
                    <div
                        key={t.id}
                        className="border p-3 bg-gray-50"
                    >
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(t.hearing_date).toLocaleDateString()}
                        </p>

                        <p>
                            <strong>Stage:</strong> {t.stage || "-"}
                        </p>

                        <p>
                            <strong>Notes:</strong> {t.notes || "-"}
                        </p>

                        <p>
                            <strong>Next Date:</strong>{" "}
                            {t.next_date
                                ? new Date(t.next_date).toLocaleDateString()
                                : "-"}
                        </p>

                        <button
                            onClick={() => handleDelete(t.id)}
                            className="text-red-600 mt-2"
                        >
                            Delete
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}


