import { useState } from "react";
import { createHearing } from "@/services/hearing-service";

type Props = {
    caseId: string;
    onClose: () => void;
    onCreated: () => void;
};

export default function AddHearingModal({
    caseId,
    onClose,
    onCreated,
}: Props) {
    const [hearingDate, setHearingDate] = useState("");
    const [stage, setStage] = useState("");
    const [status, setStatus] = useState("scheduled");
    const [notes, setNotes] = useState("");

    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!hearingDate) {
            alert("Hearing date required");
            return;
        }

        try {
            setLoading(true);

            await createHearing({
                case_id: caseId,
                hearing_date: hearingDate,
                stage,
                status,
                notes,
            });

            onCreated();
            onClose();
        } catch (err: any) {
            console.error(err);
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

            <div className="bg-white rounded-3xl w-full max-w-2xl p-8 space-y-5">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Add Hearing
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <input
                    type="date"
                    value={hearingDate}
                    onChange={(e) =>
                        setHearingDate(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                />

                <input
                    value={stage}
                    onChange={(e) =>
                        setStage(e.target.value)
                    }
                    placeholder="Case Stage"
                    className="w-full border rounded-2xl p-4"
                />

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                >
                    <option value="scheduled">
                        Scheduled
                    </option>

                    <option value="completed">
                        Completed
                    </option>

                    <option value="adjourned">
                        Adjourned
                    </option>
                </select>

                <textarea
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    placeholder="Hearing Notes"
                    className="w-full border rounded-2xl p-4 min-h-[140px]"
                />

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="border px-5 py-3 rounded-2xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={loading}
                        className="bg-[#089CCE] text-white px-6 py-3 rounded-2xl font-bold"
                    >
                        {loading
                            ? "Saving..."
                            : "Add Hearing"}
                    </button>

                </div>

            </div>

        </div>
    );
}