import { useState } from "react";
import { updateHearing } from "@/services/hearing-service";

type Props = {
    hearing: any;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditHearingModal({
    hearing,
    onClose,
    onUpdated,
}: Props) {
    const [hearingDate, setHearingDate] = useState(
        hearing?.hearing_date?.slice(0, 10) || ""
    );

    const [stage, setStage] = useState(
        hearing?.stage || ""
    );

    const [status, setStatus] = useState(
        hearing?.status || "scheduled"
    );

    const [notes, setNotes] = useState(
        hearing?.notes || ""
    );

    const [outcome, setOutcome] = useState(
    hearing?.outcome || ""
);

const [nextDate, setNextDate] = useState(
    hearing?.next_date || ""
);

    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
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

await updateHearing(hearing.id, {
    hearing_date: hearingDate,
    stage,
    notes,
    outcome,
    next_date: nextDate || null,
    status: finalStatus,
});

await updateHearing(
    hearing.id,
    {
        hearing_date: hearingDate,
        stage,
        status: finalStatus,
        notes,
        outcome,
        next_date: nextDate || null,
    }
);

            onUpdated();
            onClose();
        } catch (err: any) {
            console.error(err);

            alert(
                err.message ||
                "Failed to update hearing"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
    className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
        p-4
    "
>

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
                        Edit Hearing
                    </h2>

<button
    onClick={onClose}
    className="text-gray-500 text-xl"
>
    &times;
</button>
                </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Hearing Date
                    </label>

                    <input
                        type="date"
                        value={hearingDate}
                        onChange={(e) =>
                            setHearingDate(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-2xl p-4"
                    />
                </div>
<div>
    <label className="block mb-2 font-medium">
        Stage
    </label>

<div>
    <label className="block mb-2 font-medium">
        Stage Tamplet
    </label>

    <div className="flex flex-wrap gap-2">
        {[
            "Service",
            "Further Order",
            "Proper Order",
            "Withdrawl",
            "Reply/Written Statement",
            "Rejoinder/Replication",
            "Consideration",
            "Frame of Issues",
            "Plaintiff/Petitioner's Evidence",
            "Defendemt/Respondent's Evidence",
            "Statement",
            "Re-examination/Further Evidence",
            "Evidence Closed",
            "Aeguments",
            "Further Arguments",
            "Judgment",
            "Compromised",
            "Disposed",

        ].map((template) => (
            <button
                key={template}
                type="button"
                onClick={() =>
                    setStage(template)
                }
                className="px-3 py-2 text-sm rounded-xl border hover:bg-gray-50"
            >
                {template}
            </button>
        ))}
    </div>

    <textarea
        value={outcome}
        onChange={(e) =>
            setStage(e.target.value)
        }
        className="w-full border rounded-2xl p-4 min-h-[120px]"
    />
</div>

    </div>

                <div>
                    <label className="block mb-2 font-medium">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(
                                e.target.value
                            )
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

                        <option value="disposed">
                            Disposed
                        </option>
                    </select>
                </div>

<div>
    <label className="block mb-2 font-medium">
        Notes
    </label>

    <textarea
        value={notes}
        onChange={(e) =>
            setNotes(e.target.value)
        }
        className="w-full border rounded-2xl p-4 min-h-[120px]"
    />
</div>

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
            "Service",
            "Further Order",
            "Proper Order",
            "Suit/Pettition/Withdraw",
            "Reply/Written Statement",
            "Rejoinder/Replication",
            "Consideration",
            "Issues Framed",
            "PW Examined",
            "RW Examined",
            "Statement Recorded",
            "Statement by Affidavit",
            "Re-examination/Further Evidence",
            "Evidence Closed",
            "Oral Aeguments held",
            "Written Aeguments Filed",
            "Further Arguments",
            "Judgment Pronounced",
            "Compromised",
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
</div>

    <textarea
        value={outcome}
        onChange={(e) =>
            setOutcome(e.target.value)
        }
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
       
    );
}