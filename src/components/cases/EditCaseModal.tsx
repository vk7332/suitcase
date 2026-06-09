import { useState } from "react";
import { updateCase } from "@/services/case-service";

type Props = {
    caseData: any;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditCaseModal({
    caseData,
    onClose,
    onUpdated,
}: Props) {
    const [form, setForm] = useState({
        case_title: caseData.case_title || "",
        case_number: caseData.case_number || "",
        court_name: caseData.court_name || "",
        status: caseData.status || "active",
        next_hearing_date:
            caseData.next_hearing_date || "",
        case_stage: caseData.case_stage || "",
        description: caseData.description || "",
        priority: caseData.priority || "normal",
    });

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        try {
            setLoading(true);

            await updateCase(caseData.id, form);

            onUpdated();
            onClose();
        } catch (err: any) {
            console.error(err);
            alert(err.message || "Failed to update case");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 space-y-5">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Edit Case
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <input
                    value={form.case_title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            case_title: e.target.value,
                        })
                    }
                    placeholder="Case Title"
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.case_number}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            case_number: e.target.value,
                        })
                    }
                    placeholder="Case Number"
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.court_name}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            court_name: e.target.value,
                        })
                    }
                    placeholder="Court Name"
                    className="w-full border rounded-2xl p-4"
                />

                <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            status: e.target.value,
                        })
                    }
                    className="w-full border rounded-2xl p-4"
                >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="disposed">Disposed</option>
                    <option value="stay">Stay</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                </select>

                <input
                    type="date"
                    value={form.next_hearing_date}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            next_hearing_date:
                                e.target.value,
                        })
                    }
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={form.case_stage}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            case_stage: e.target.value,
                        })
                    }
                    placeholder="Case Stage"
                    className="w-full border rounded-2xl p-4"
                />

                <textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                        })
                    }
                    placeholder="Case Notes / Description"
                    className="w-full border rounded-2xl p-4 min-h-[120px]"
                />

                <select
                    value={form.priority}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            priority: e.target.value,
                        })
                    }
                    className="w-full border rounded-2xl p-4"
                >
                    <option value="low">Low Priority</option>
                    <option value="normal">Normal Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent</option>
                </select>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-2xl border"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold"
                    >
                        {loading
                            ? "Saving..."
                            : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}