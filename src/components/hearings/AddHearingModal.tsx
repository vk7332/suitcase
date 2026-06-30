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
    const [outcome, setOutcome] = useState("");
    const [nextDate, setNextDate] =
    useState("");

    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!hearingDate) {
            alert("Hearing date required");
            return;
        }

        try {
            setLoading(true);

let finalStatus = "scheduled";

const outcomeText = outcome.trim().toLowerCase();

const disposedKeywords = [
    "disposed",
    "decree",
    "decreed",
    "judgment",
    "judgement",
    "dismissed",
    "allowed",
    "rejected",
    "withdrawn",
    "compromised",
    "settled",
    "finally decided",
    "convicted",
    "acquitted",
];

const isDisposed = disposedKeywords.some(keyword =>
    outcomeText.includes(keyword)
);

if (isDisposed) {
    finalStatus = "disposed";
} else if (nextDate) {
    finalStatus = "adjourned";
} else if (outcomeText) {
    finalStatus = "completed";
}

await createHearing({
    case_id: caseId,
    hearing_date: hearingDate,
    stage,
    status: finalStatus,
    notes,
    outcome,
    next_date: nextDate || null,
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

            <div
    className="
        bg-white
        rounded-3xl
        w-full
        max-w-2xl
        max-h-[90vh]
        overflow-y-auto
        p-8
        space-y-5
    "
>

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Add Hearing
                    </h2>

<button
    onClick={onClose}
    className="text-gray-500 text-xl"
>
    ✕
</button>
                </div>

    <label className="block mb-2 font-medium">
        Hearing Date
    </label>
                <input
                    type="date"
                    value={hearingDate}
                    onChange={(e) =>
                        setHearingDate(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                />

    <label className="block mb-2 font-medium">
        Case Stage
    </label>

                <input
                    value={stage}
                    onChange={(e) =>
                        setStage(e.target.value)
                    }
                    placeholder="Case Stage"
                    className="w-full border rounded-2xl p-4"
                />

    <label className="block mb-2 font-medium">
        Status
    </label>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    className="w-full border rounded-2xl p-4"
                >

                </select>

    <label className="block mb-2 font-medium">
        Notes
    </label>

                <textarea
                    value={notes}
                    onChange={(e) =>
                        setNotes(e.target.value)
                    }
                    placeholder="Hearing Notes"
                    className="w-full border rounded-2xl p-4 min-h-[140px]"
                />

                <div>
    <label className="block mb-2 font-medium">
        Outcome
    </label>

<div>
    <label className="block mb-2 font-medium">
        Outcome Templates
    </label>

    <div className="flex flex-wrap gap-2">
        {[
            "PW Examined",
            "RW Examined",
            "Evidence Closed",
            "Arguments Heard",
            "Judgment Reserved",
            "Compromise Recorded",
            "Disposed",
        ].map((template) => (
            <button
                key={template}
                type="button"
                onClick={() =>
                    setOutcome(template)
                }
                className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50"
            >
                {template}
            </button>
        ))}
    </div>
</div>

    <textarea
        value={outcome}
        onChange={(e) =>
            setOutcome(e.target.value)
        }
        placeholder="Hearing Outcome"
        className="w-full border rounded-2xl p-4 min-h-[120px]"
    />
</div>

<div>
    <label className="block mb-2 font-medium">
        Next Hearing Date
    </label>

    <input
        type="date"
        value={nextDate}
        onChange={(e) =>
            setNextDate(e.target.value)
        }
        className="w-full border rounded-2xl p-4"
    />
</div>

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